import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Input as ShadCnInput } from "@/components/ui/input";
import customStyles from "./Input.module.css";
import { OctagonAlert } from "lucide-react";
import { useField, type FieldInputProps, type FieldMetaProps } from "formik";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ResponsiveProvider from "@/providers/ResponsiveProvider";

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
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
	width?: number;
	errorClassName?: string;
}

function Input({
	className,
	errorClassName,
	width,
	value,
	name,
	shadow,
	...props
}: InputProps) {
	let field: FieldInputProps<string> | null,
		meta: FieldMetaProps<string> | null;
	let hasError: boolean;
	let formikvalue: string;
	if (name) {
		[field, meta] = useField(name);
		hasError = Boolean(meta.touched && meta.error);
		formikvalue = field.value || "";
	}
	hasError = false;
	return (
		<div className="relative flex gap-3 flex-col items-center justify-center w-fit">
			<div className="relative flex gap-3 flex-col items-center justify-center w-fit">
				<ShadCnInput
					{...field}
					dir="rtl"
					id={name}
					name={name}
					value={formikvalue}
					className={cn(
						inputVariants({ shadow, className }),
						customStyles.input,
						hasError
							? "lg:pl-10.5 border-red-500 text-red-500 drop-shadow-red-500"
							: "",
					)}
					{...props}
				/>

				{hasError && (
					<>
						<TooltipProvider delayDuration={0} skipDelayDuration={0}>
							<Tooltip>
								<TooltipTrigger asChild>
									<OctagonAlert className="absolute left-3.5 text-red-500" />
								</TooltipTrigger>
								<TooltipContent className="bg-red-500 font-[Alibaba]">
									<p>{"شما زیادی برا این سایت احمقید"}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</>
				)}
			</div>
			{hasError && (
				<p
					dir="rtl"
					className={cn(
						"font-[Alibaba] w-full text-red-500 break-words",
						errorClassName,
					)}
				>
					{"sdfsadf sfas sdf ssada dfasdfdfsafa asf asf sf sadfasfsdaf"}
				</p>
			)}
		</div>
	);
}

export { Input };
