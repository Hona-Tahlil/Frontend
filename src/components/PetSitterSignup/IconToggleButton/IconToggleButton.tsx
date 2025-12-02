import { Button } from "@/components/Custom/Button/Button";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import { Check, Plus } from "lucide-react";

export default function IconToggleButton({
	name,
	className,
	text,
}: {
	text?: string;
	name: string;
	className?: string;
	icon?: React.ReactNode;
}) {
	const [field, meta, helpers] = useField(name);
	return (
		<Button
			onClick={() => helpers.setValue(!field.value)}
			type="button"
			variant={"outline"}
			className={cn(
				"border hover:border-primary",
				field.value ? "!border-primary" : "border-black text-black",
				className,
			)}
			{...field}
		>
			{field.value && <Check />}
			{!field.value && <Plus />}
			{text}
		</Button>
	);
}
