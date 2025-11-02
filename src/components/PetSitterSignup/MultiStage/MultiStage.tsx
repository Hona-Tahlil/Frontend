import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MultiStageContextType } from "@/types/multiStageComponentTypes";
import { useMobile } from "@/hooks/ResponsiveHooks";

const MultiStageContext = createContext<MultiStageContextType | null>(null);

function useMultiStage() {
	const ctx = useContext(MultiStageContext);
	if (!ctx) throw new Error("useMultiStage must be used inside <MultiStage>");
	return ctx;
}

export function MultiStage({
	children,
	className,
	currentStage,
	setCurrentStage,
	animationDir,
	setAnimationDir,
}: {
	children: ReactNode;
	className?: string;
	currentStage?: number;
	setCurrentStage?: React.Dispatch<React.SetStateAction<number>>;
	animationDir?: number;
	setAnimationDir?: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [selfCurrentStage, setSelfCurrentStage] = useState(0);
	const [selfAnimationDir, setSelfAnimationDir] = useState(1);

	return (
		<MultiStageContext.Provider
			value={{
				currentStage: currentStage ?? selfCurrentStage,
				setCurrentStage: setCurrentStage ?? setSelfCurrentStage,
				animationDir: animationDir ?? selfAnimationDir,
				setAnimationDir: setAnimationDir ?? setSelfAnimationDir,
			}}
		>
			<div
				dir="rtl"
				className={cn("w-full flex flex-col items-center px-2 py-2", className)}
			>
				{children}
			</div>
		</MultiStageContext.Provider>
	);
}

function Dot() {
	return <div className="flex-1 h-[2px] bg-gray-400 mx-2" />;
}

function Header({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const childrenArray = React.Children.toArray(children);
	const isMobile = useMobile();
	return (
		<>
			<div
				className={cn(
					"flex w-full gap-0 lg:gap-2 justify-center items-center",
					className,
				)}
			>
				{childrenArray.flatMap((child, index) => {
					return (
						<>
							{child}
							{index != childrenArray.length - 1 && <Dot />}
						</>
					);
				})}
			</div>
		</>
	);
}

function StageHeader({
	index,
	children,
}: {
	index: number;
	children: ReactNode;
}) {
	const { currentStage, setCurrentStage, setAnimationDir } = useMultiStage();
	const isActive = currentStage === index;
	const isMobile = useMobile();

	function setCurrentAsActive() {
		setAnimationDir(currentStage - index);
		setCurrentStage(index);
	}

	return (
		<>
			{!isMobile && (
				<div
					className="flex items-center justify-center gap-2 cursor-pointer"
					onClick={setCurrentAsActive}
				>
					<div
						className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors duration-200 ${isActive ? "border-3 border-primary text-primary bg-white" : "border border-stage-header-inactive-border bg-stage-header-inactive-background text-stage-header-inactive-foreground"}`}
					>
						{index + 1}
					</div>
					<div
						className={`font-bold transition-all duration-200 ${isActive ? "text-black" : "text-stage-header-inactive-foreground"}`}
					>
						{children}
					</div>
				</div>
			)}
			{isMobile && (
				<div
					className="flex items-center justify-center gap-2 cursor-pointer"
					onClick={setCurrentAsActive}
				>
					<div
						className={`flex items-center justify-center w-7 h-7 rounded-full font-bold transition-colors duration-200 ${isActive ? "border-3 border-primary text-primary bg-white" : "border border-stage-header-inactive-border bg-stage-header-inactive-background text-stage-header-inactive-foreground"}`}
					>
						{index + 1}
					</div>
					<div
						className={`font-bold transition-all duration-200 text-sm ${isActive ? "text-black" : "text-stage-header-inactive-foreground"}`}
					>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
interface StageProps {
	index: number;
	children: ReactNode;
	className?: string;
}

function Stage({ index, children, className }: StageProps) {
	const { currentStage, animationDir } = useMultiStage();

	const [stageDir, setStageDir] = useState(0);

	useEffect(() => {
		setStageDir(animationDir);
	}, [animationDir]);

	const variants = {
		enter: () => ({
			opacity: 1,
			x: 0,
			transition: { duration: 1 },
		}),
		initial: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? "-100%" : "100%",
		}),
		exit: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? "100%" : "-100%",
			transition: { duration: 1 },
		}),
	};
	return (
		<>
			<AnimatePresence mode="wait">
				{currentStage === index && (
					<motion.div
						key={index}
						custom={stageDir}
						variants={variants}
						initial="initial"
						animate="enter"
						exit="exit"
						transition={{ duration: 1 }}
						className={cn(
							"w-full h-70 absolute bg-white drop-shadow-lg border border-stage-body-border rounded-2xl right-1/2 translate-x-[50%]",
							className,
						)}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
interface StageHolderProps {
	children: ReactNode;
	className?: string;
}

function StageHolder({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [maxHeight, setMaxHeight] = useState<number>(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const getMaxHeight = () => {
			const childElements = Array.from(container.children) as HTMLElement[];
			let max = 0;
			for (const el of childElements) {
				const h = el.scrollHeight;
				if (h > max) max = h;
			}
			setMaxHeight(max);
		};

		getMaxHeight(); // Initial measurement

		// Observe each stage for height changes
		const observer = new ResizeObserver(() => getMaxHeight());
		const childElements = Array.from(container.children) as HTMLElement[];
		childElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [children]);

	return (
		<div
			ref={containerRef}
			className={cn("w-full relative mt-4", className)}
			style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
		>
			{children}
		</div>
	);
}

MultiStage.Header = Header;
MultiStage.StageHeader = StageHeader;
MultiStage.Stage = Stage;
MultiStage.StageHolder = StageHolder;
