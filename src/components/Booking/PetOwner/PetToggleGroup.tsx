import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useField } from "formik";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

interface PetToggleGroupProps {
	name?: string;
	values?: string[];
	titles?: string[];
	dir?: "ltr" | "rtl";
}

export default function PetToggleGroup({
	name,
	values,
	titles,
	dir = "rtl",
}: PetToggleGroupProps) {
	const [, , helpers] = useField<string[]>(name || "");
	const [, setSelectedValues] = useState<string[]>([]);

	return (
		<div>
			<ToggleGroup
				dir={dir}
				type="multiple"
				variant="outline"
				size="sm"
				className="flex flex-wrap"
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
							className="bg-transparent data-[state=on]:bg-transparent data-[state=on]:border-primary data-[state=on]:text-primary hover:data-[state=on]:bg-primary hover:data-[state=on]:text-white rounded-[27px] text-gray-600 hover:text-white hover:border-primary border-1 border-gray-600 hover:bg-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground active:bg-primary-press active:border-transparent cursor-pointer gap-1"
						>
							<CircleCheck size={"auto"} />
							{titles?.[index] || ""}
						</ToggleGroupItem>
					);
				})}
			</ToggleGroup>
		</div>
	);
}
