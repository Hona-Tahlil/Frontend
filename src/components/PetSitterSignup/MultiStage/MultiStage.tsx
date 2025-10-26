import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type MultiStageContextType = {
	currentStage: number;
	animationDir: number;
	setCurrentStage: (i: number) => void;
	setAnimationDir: (i: number) => void;
};

const MultiStageContext = createContext<MultiStageContextType | null>(null);

function useMultiStage() {
	const ctx = useContext(MultiStageContext);
	if (!ctx) throw new Error("useMultiStage must be used inside <MultiStage>");
	return ctx;
}

export function MultiStage({ children }: { children: ReactNode }) {
	const [currentStage, setCurrentStage] = useState(0);
	const [animationDir, setAnimationDir] = useState(1);

	return (
		<MultiStageContext.Provider
			value={{ currentStage, setCurrentStage, animationDir, setAnimationDir }}
		>
			<div dir="rtl" className="w-full px-2 py-2">
				{children}
			</div>
		</MultiStageContext.Provider>
	);
}

function Dot() {
	return <div className="flex-1 h-[2px] bg-gray-400 mx-2" />;
}

function Header({ children }: { children: ReactNode }) {
	const childrenArray = React.Children.toArray(children);
	return (
		<div className="flex w-full gap-2 justify-center items-center">
			{childrenArray.flatMap((child, index) => {
				return (
					<>
						{child}
						{index != childrenArray.length - 1 && <Dot />}
					</>
				);
			})}
		</div>
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

	function setCurrentAsActive() {
		setAnimationDir(currentStage - index);
		setCurrentStage(index);
	}

	return (
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
	);
}

// 🔹 Stage content
function Stage({ index, children }: { index: number; children: ReactNode }) {
	const { currentStage, animationDir } = useMultiStage();

	const [stageDir, setStageDir] = useState(0);
	const prevStageRef = useRef(currentStage);

	useEffect(() => {
		//if (currentStage !== prevStageRef.current) {
		//	setStageDir(animationDir); // freeze direction for this transition
		//	prevStageRef.current = currentStage;
		//}
		//setStageDir(animationDir); // freeze direction for this transition
		console.log("stage " + index + " " + animationDir);
		setStageDir(animationDir); // freeze direction for this transition
	}, [animationDir]);
	useEffect(() => {
		//if (currentStage !== prevStageRef.current) {
		//	setStageDir(animationDir); // freeze direction for this transition
		//	prevStageRef.current = currentStage;
		//}
		//console.log("stage " + index + " " + (currentStage - prevStageRef.current));
		//setStageDir(currentStage - prevStageRef.current); // freeze direction for this transition
	}, [currentStage]);

	const variants = {
		enter: (dir: number) => ({
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
		<AnimatePresence mode="wait">
			{currentStage === index && (
				<motion.div
					key={index} // important for exit animations
					custom={stageDir}
					variants={variants}
					initial="initial"
					animate="enter"
					exit="exit"
					//initial={{ opacity: 0, x: animationDir < 0 ? "-100%" : "100%" }}
					//animate={{ opacity: 1, x: 0 }}
					//exit={{ opacity: 0, x: animationDir < 0 ? "100%" : "-100%" }}
					transition={{ duration: 1 }}
					className="w-full h-70 absolute bg-white drop-shadow-lg border border-stage-body-border rounded-2xl mt-4"
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function StageHolder({ children }: { children: ReactNode }) {
	return <div className="w-full h-120 relative">{children}</div>;
}

// attach subcomponents
MultiStage.Header = Header;
MultiStage.StageHeader = StageHeader;
MultiStage.Stage = Stage;
MultiStage.StageHolder = StageHolder;
