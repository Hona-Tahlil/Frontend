import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export default function FaqItem({
	text,
	answer,
	open,
	onToggle,
}: {
	open: boolean;
	onToggle: () => void;
	text: string;
	answer: string;
}) {
	return (
		<div
			onClick={onToggle}
			className="flex flex-col w-full lg:w-100 h-min bg-white/80 p-2 rounded-2xl cursor-pointer"
		>
			<div className="flex items-center gap-2">
				{open ? <Minus /> : <Plus />}
				<span>{text}</span>
			</div>

			<motion.div
				animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
				initial={{ height: 0, opacity: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				className="overflow-hidden"
			>
				<p className="mt-2">{answer}</p>
			</motion.div>
		</div>
	);
}
