import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useField } from "formik";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

interface ServiceToggleGroupProps {
	name?: string;
	values?: string[];
	titles?: string[];
	dir?: "ltr" | "rtl";
}

export default function ServiceToggleGroup({
	name,
	values,
	titles,
	dir = "rtl",
}: ServiceToggleGroupProps) {
	const [, , helpers] = useField<string[]>(name || "");
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	return (
		<div>
			<ToggleGroup
				dir={dir}
				type="multiple"
				variant="outline"
				size="sm"
				className="flex flex-col items-start"
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
							className="group bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-primary hover:data-[state=on]:bg-transparent hover:data-[state=on]:text-primary hover:bg-transparent rounded-[27px] text-gray-600 border-0 hover:text-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground cursor-pointer gap-1 shadow-none"
						>
							<CircleCheck size={"auto"} />
							<p className="text-gray-600 transition-all duration-100 group-hover:text-primary">
								{titles?.[index] || ""}
							</p>
						</ToggleGroupItem>
					);
				})}
			</ToggleGroup>
		</div>
	);
}
