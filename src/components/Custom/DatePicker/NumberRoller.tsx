import { useEffect, useRef, useState } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	animate,
	useAnimationFrame,
	useTransform,
} from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesktop } from "@/hooks/ResponsiveHooks";

export const NumberRoller = ({
	min = 0,
	max = 59,
	repeat = 5,
	smallFontSize = "15px",
	bigFontSize = "30px",
	smallFontWeight = 300,
	bigFontWeight = 900,
	className,
	startFromMiddle = false,
	onChange,
	value,
	circular = true,
}: {
	min?: number;
	max?: number;
	repeat?: number;
	smallFontSize?: string;
	bigFontSize?: string;
	smallFontWeight?: number;
	bigFontWeight?: number;
	startFromMiddle?: boolean;
	circular?: boolean;
	className?: string;
	onChange?: (v: number) => void;
	value?: number;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [cHeight, setCHeight] = useState(0);
	const [step, setStep] = useState(0);

	const isDesktop = useDesktop();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const height = el.clientHeight;
		setCHeight(height);
		setStep(height / 3);
	}, []);
	const itemCount = max - min + 1;
	const topConstraint = -(
		itemCount * (repeat - 1) * step +
		(itemCount - 2) * step
	);
	const bottomConstraint = step;

	useEffect(() => {
		const middleRepeat = Math.floor(repeat / 2);
		if (value === undefined) {
			if (startFromMiddle) {
				//console.log(
				//	"Current value " + (min + 1 + Math.floor((itemCount * repeat) / 2)),
				//);
				onChange?.(min + 1 + Math.floor((itemCount * repeat) / 2));
				y.set(-(Math.floor((itemCount * repeat) / 2) * step));
			} else {
				console.log("Current value " + min);
				onChange?.(min);
				y.set(-((itemCount * middleRepeat - 1) * step));
			}
		} else {
			console.log("Your thing : " + (value - min));
			console.log(min);
			console.log(value);
			y.set(-((itemCount * middleRepeat - 1 + (value - min)) * step));
		}
	}, [step]);
	const y = useMotionValue(0);
	function goUp() {
		const currentY = y.get() + step;
		const snappedY = Math.round(currentY / step) * step;
		if (snappedY > bottomConstraint) {
			animate(y, bottomConstraint, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		} else {
			animate(y, snappedY, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		}
	}
	function goDown() {
		const currentY = y.get() - step;
		const snappedY = Math.round(currentY / step) * step;
		if (snappedY < topConstraint) {
			animate(y, topConstraint, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		} else {
			animate(y, snappedY, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		}
	}
	return (
		<div className="flex flex-col items-center">
			{isDesktop && (
				<ChevronUp
					className="text-gray-500 cursor-pointer"
					size={35}
					onClick={goUp}
				/>
			)}
			<div
				ref={ref}
				className={cn(
					"relative h-60 w-40 bg-transparent overflow-hidden text-center select-none",
					className,
				)}
			>
				<div className="absolute w-full h-full pointer-events-none flex flex-col justify-between">
					<div className="w-full h-[3px] bg-transparent"></div>
					<div className="w-full h-[3px] bg-black/49"></div>
					<div className="w-full h-[3px] bg-black/49"></div>
					<div className="w-full h-[3px] bg-transparent"></div>
				</div>
				<motion.div
					drag="y"
					dragConstraints={{ top: topConstraint, bottom: bottomConstraint }}
					dragElastic={0.2} // optional, controls how "stretchy" the drag feels
					dragMomentum={false}
					style={{
						y,
					}}
					onDragEnd={() => {
						const currentY = y.get();
						const snappedY =
							currentY > bottomConstraint || currentY < topConstraint
								? currentY > bottomConstraint
									? bottomConstraint
									: topConstraint
								: Math.round(currentY / step) * step;
						const testvalue = min + ((-(snappedY / step) + 1) % itemCount);
						onChange?.(testvalue);

						//console.log(testvalue);

						animate(y, snappedY, {
							type: "spring",
							stiffness: 300,
							damping: 30,
						}).then(() => {
							if (circular) {
								const middleRepeat = Math.floor(repeat / 2);
								y.set(
									-((itemCount * middleRepeat - 1 + (testvalue - min)) * step),
								);
							}
						});
					}}
					className="flex flex-col items-center"
				>
					{Array.from({ length: itemCount * repeat }, (_, i) => (
						<Number
							key={i}
							index={min + (i % itemCount)}
							grandParentHeight={cHeight}
							smallFontSize={smallFontSize}
							bigFontSize={bigFontSize}
							smallFontWeight={smallFontWeight}
							bigFontWeight={bigFontWeight}
						/>
					))}
				</motion.div>
			</div>
			{isDesktop && (
				<ChevronDown
					className="text-gray-500 cursor-pointer"
					size={35}
					onClick={goDown}
				/>
			)}
		</div>
	);
};

export const Number = ({
	index,
	grandParentHeight,
	smallFontSize,
	bigFontSize,
	smallFontWeight,
	bigFontWeight,
}: {
	index: number;
	grandParentHeight: number;
	smallFontSize: string;
	bigFontSize: string;
	smallFontWeight: number;
	bigFontWeight: number;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const yRelative = useMotionValue(0);
	//const [grandParentHeight, setGrandParentHeight] = useState(0);
	const [selfHeight, setSelfHeight] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el || !el.parentElement || !el.parentElement.parentElement) return;
		const height = el.parentElement.parentElement.clientHeight;
		//setGrandParentHeight(height);
		requestAnimationFrame(() => {
			setSelfHeight(el.clientHeight);
		});
	}, []);

	useAnimationFrame(() => {
		const el = ref.current;
		if (!el || !el.parentElement || !el.parentElement.parentElement) return;

		const grandParentRect =
			el.parentElement.parentElement.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		yRelative.set(rect.top - grandParentRect.top);
	});

	const fontWeight = useTransform(
		yRelative,
		[0, grandParentHeight / 2 - grandParentHeight / 6, grandParentHeight / 2],
		[smallFontWeight, bigFontWeight, smallFontWeight],
	);
	const fontSize = useTransform(
		yRelative,
		[0, grandParentHeight / 2 - grandParentHeight / 6, grandParentHeight / 2],
		[smallFontSize, bigFontSize, smallFontSize],
	);

	return (
		<motion.div
			ref={ref}
			style={{
				height: grandParentHeight / 3,
				fontWeight,
				fontSize,
				originY: 0.5,
			}}
			className="w-fit bg-transparent text-center flex justify-center items-center"
		>
			{index}
		</motion.div>
	);
};
