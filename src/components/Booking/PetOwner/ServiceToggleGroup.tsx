import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

interface ServiceToggleGroupProps {
	name?: string;
	values?: string[];
	titles?: string[];
	dir?: "ltr" | "rtl";
	classes?: ServiceToggleGroupClasses;
}
interface ServiceToggleGroupClasses {
	className?: string;
	toggleClassName?: string;
	textClassName?: string;
}

export default function ServiceToggleGroup({
	name,
	values,
	titles,
	dir = "rtl",
	classes,
}: ServiceToggleGroupProps) {
	const [, , helpers] = useField<string[]>(name || "");
	const [, setSelectedValues] = useState<string[]>([]);

	return (
		<div>
			<ToggleGroup
				dir={dir}
				type="multiple"
				variant="outline"
				size="sm"
				className={cn("flex flex-col items-start", classes?.className)}
			>
				{values?.map((value, index) => {
					return (
						<ToggleGroupItem
							value={value}
							aria-label="Toggle star"
							onClick={() => {
								setSelectedValues((prevSelected) => {
									if (!prevSelected.includes(value)) {
										const newValues = [...prevSelected, value];
										helpers.setValue(newValues);
										return newValues;
									} else {
										const newValues = prevSelected.filter((v) => v !== value);
										helpers.setValue(newValues);
										return newValues;
									}
								});
							}}
							className={cn(
								"group bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-primary hover:data-[state=on]:bg-transparent hover:data-[state=on]:text-primary hover:bg-transparent rounded-[27px] text-gray-600 border-0 hover:text-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground cursor-pointer gap-1 shadow-none",
								classes?.toggleClassName,
							)}
						>
							<CircleCheck size={"auto"} />
							<p
								className={cn(
									"text-gray-600 transition-all duration-100 group-hover:text-primary",
									classes?.textClassName,
								)}
							>
								{titles?.[index] || ""}
							</p>
						</ToggleGroupItem>
					);
				})}
			</ToggleGroup>
		</div>
	);
}
