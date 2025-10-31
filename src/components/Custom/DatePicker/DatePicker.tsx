import MultiDatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { cva, type VariantProps } from "class-variance-authority";
import "./DatePicker.css";

const inputVariants = cva(
	"flex h-13 w-full !text-[15px] rounded-full border border-[1px] border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			shadow: {
				false: "shadow-sm",
				true: "drop-shadow-lg",
			},
		},
		defaultVariants: {
			shadow: false,
		},
	},
);
export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
}
export default function DatePicker({ shadow, ...props }: InputProps) {
	return (
		<div>
			<MultiDatePicker
				calendar={persian}
				locale={persian_fa}
				inputClass={inputVariants({ shadow })}
				mapDays={({ date, today }: MapDaysArgs): Partial<DayValue> => {
					const props: Partial<DayValue> = {};

					if (date.weekDay.index === 6) {
						props.className = "text-primary";
					}

					return props;
				}}
			/>
		</div>
	);
}
