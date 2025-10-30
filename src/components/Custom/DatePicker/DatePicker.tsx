interface DatePickerProps {
	classes?: {
		className?: string;
		numberRollerClassName?: string;
		textClassName?: string;
		containerClassName?: string;
	};
	from: number;
	to: number;
	relative: boolean;
}
export function DatePicker({
	classes,
	from = 10,
	to = 8,
	relative = true,
}: DatePickerProps) {
	const currentPersianYear = parseInt(
		new Intl.DateTimeFormat("fa-IR", {
			year: "numeric",
			numberingSystem: "latn",
		}).format(new Date()),
	);
	const [year, setYear] = useState(currentPersianYear);
	const [month, setMonth] = useState(1);
	const [day, setDay] = useState(2);
	return (
		<div className={cn("flex gap-4", classes?.className)} dir="rtl">
			<div
				className={cn(
					"flex flex-col items-center justify-center",
					classes?.containerClassName,
				)}
			>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>روز</p>
				</div>
				<NumberRoller
					value={day}
					onChange={setDay}
					className={classes?.numberRollerClassName}
					min={1}
					max={month > 6 ? 30 : 31}
				/>
			</div>
			<div className={cn("flex flex-col items-center justify-center")}>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>ماه</p>
				</div>
				<NumberRoller
					value={month}
					onChange={setMonth}
					className={classes?.numberRollerClassName}
					min={1}
					max={12}
				/>
			</div>
			<div
				className={cn(
					"flex flex-col items-center justify-center",
					classes?.containerClassName,
				)}
			>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>سال</p>
				</div>
				<NumberRoller
					value={year}
					onChange={setYear}
					className={classes?.numberRollerClassName}
					min={relative ? currentPersianYear - from : from}
					max={relative ? currentPersianYear + to : to}
					repeat={1}
					circular={false}
					startFromMiddle={true}
				/>
			</div>
		</div>
	);
}
import { cn } from "@/lib/utils";
import { NumberRoller } from "./NumberRoller";
import { useState } from "react";
