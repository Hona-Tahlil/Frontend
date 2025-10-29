import { useEffect, useRef, useState } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	animate,
	useAnimationFrame,
	useTransform,
} from "framer-motion";

const DatePicker = ({
	min = 0,
	max = 59,
	value,
	onChange,
}: {
	min?: number;
	max?: number;
	value: number;
	onChange: (v: number) => void;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [cHeight, setCHeight] = useState(0);
	const [step, setStep] = useState(40);

	useEffect(() => {
		console.log("This worlds is a wasteland , please let me go");
		const el = ref.current;
		console.log(el);
		if (!el) return;
		const height = el.clientHeight;
		setCHeight(height);
		setStep(height / 3);
		console.log(height);
	}, []);

	const y = useMotionValue(0);
	return (
		<div
			ref={ref}
			className="relative h-50 w-40 bg-red-400 overflow-hidden text-center select-none"
		>
			<motion.div
				drag="y"
				//dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
				dragElastic={0.2} // optional, controls how "stretchy" the drag feels
				dragMomentum={false}
				style={{
					y,
					//width: 100,
					//height: 100,
					//backgroundColor: "skyblue",
					//borderRadius: 10,
				}}
				onDragEnd={() => {
					// Snap y to nearest multiple of `step`
					const currentY = y.get();
					const snappedY = Math.round(currentY / step) * step;
					animate(y, snappedY, {
						type: "spring",
						stiffness: 300,
						damping: 30,
					});
				}}
			>
				{Array.from({ length: 40 }, (_, i) => (
					<Number key={i} index={i} />
				))}
			</motion.div>
		</div>
	);
};

export const Number = ({ index }: { index: number }) => {
	const ref = useRef<HTMLDivElement>(null);
	const yRelative = useMotionValue(0);
	const [grandParentHeight, setGrandParentHeight] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el || !el.parentElement || !el.parentElement.parentElement) return;
		const height = el.parentElement.parentElement.clientHeight;
		setGrandParentHeight(height);
	}, []);

	useAnimationFrame(() => {
		const el = ref.current;
		if (!el || !el.parentElement || !el.parentElement.parentElement) return;

		const grandParentRect =
			el.parentElement.parentElement.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		yRelative.set(rect.top - grandParentRect.top);
	});

	const scale = useTransform(
		yRelative,
		[0, grandParentHeight / 2, grandParentHeight], // Y positions
		[0.5, 1, 0.5], // scale at those positions
	);

	return (
		<motion.div
			ref={ref}
			style={{
				scale,
				originY: 0.5,
			}}
			className="m-2 p-4 bg-white rounded shadow text-center"
		>
			{index}
		</motion.div>
	);
};

export default DatePicker;
