import { Button } from "@/components/Custom/Button/Button";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import { Check, Plus } from "lucide-react";

export default function ToggleButton({
	name,
	className,
	text,
	children,
}: {
	text?: string;
	name: string;
	className?: string;
	children?: React.ReactNode;
}) {
	const [field, meta, helpers] = useField(name);
	return (
		<Button
			onClick={() => helpers.setValue(!field.value)}
			variant={"outline"}
			className={cn(
				"border hover:border-primary",
				field.value ? "!border-primary" : "border-black text-black",
				className,
			)}
			{...field}
		>
			{children}
		</Button>
	);
}
