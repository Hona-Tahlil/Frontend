import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ToggleGroupFieldProps } from "@/types/toggleGroupFieldTypes";
import { useField } from "formik";
import { CircleCheck } from "lucide-react";

export default function ToggleGroupField({
	name,
	values,
	titles,
	dir = "rtl",
	classes,
	type = "multiple",
	variant = "pet",
}: ToggleGroupFieldProps) {
	const [field, , helpers] = useField<string[] | string>(name || "");
	const selectedValues = Array.isArray(field.value)
		? field.value
		: field.value
			? [field.value]
			: [];
	const isSingle = type === "single";
	const currentValue = isSingle ? selectedValues[0] : selectedValues;

	const isPet = variant === "pet";

	const containerClassName = isPet
		? "flex flex-wrap justify-start"
		: "flex flex-col items-start";

	const toggleClassName = isPet
		? "bg-transparent data-[state=on]:bg-transparent data-[state=on]:border-primary data-[state=on]:text-primary hover:data-[state=on]:bg-primary hover:data-[state=on]:text-white rounded-[27px] text-gray-600 hover:text-white hover:border-primary border-1 border-gray-600 hover:bg-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground active:bg-primary-press active:border-transparent cursor-pointer gap-1"
		: "group bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-primary hover:data-[state=on]:bg-transparent hover:data-[state=on]:text-primary hover:bg-transparent rounded-[27px] text-gray-600 border-0 hover:text-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground cursor-pointer gap-1 shadow-none";

	const textClassName = !isPet
		? "text-gray-600 transition-all duration-100 group-hover:text-primary"
		: "";

	return (
		<ToggleGroup
			dir={dir}
			type={type}
			variant="outline"
			className={cn(containerClassName, classes?.className)}
			value={currentValue}
			onValueChange={(nextValue) => {
				if (isSingle) {
					helpers.setValue(nextValue ? [nextValue] : []);
				} else {
					helpers.setValue(
						Array.isArray(nextValue) ? nextValue : nextValue ? [nextValue] : [],
					);
				}
			}}
		>
			{values?.map((value, index) => (
				<ToggleGroupItem
					key={value}
					value={value}
					aria-label="Toggle star"
					className={cn(toggleClassName, classes?.toggleClassName)}
				>
					<CircleCheck className="size-auto" />
					<p className={cn(textClassName, classes?.textClassName)}>
						{titles?.[index] || ""}
					</p>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
