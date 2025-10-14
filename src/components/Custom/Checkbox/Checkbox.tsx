import * as React from "react";
import { cn } from "@/lib/utils";

import customStyles from "./Checkbox.module.css";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	text?: string;
	checkboxSize?: string;
	textClassName?: string;
	backGroundClassName?: string;
	checkboxClassName?: string;
	size?: string;
}
function Checkbox({
	className,
	size,
	textClassName,
	backGroundClassName,
	checkboxClassName,
	text,
	...props
}: InputProps) {
	return (
		<div className={cn("flex gap-1 items-center", className)}>
			<label className={cn("font-[Alibaba] h-auto", textClassName)}>
				{text}
			</label>
			<label className={cn(customStyles["ios-checkbox"], customStyles.red)}>
				<input type="checkbox" data-slot="input" {...props} />
				<div
					className={cn(customStyles["checkbox-wrapper"], checkboxClassName)}
					style={{ width: size, height: size }}
				>
					<div
						className={cn(customStyles["checkbox-bg"], backGroundClassName)}
					></div>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						className={customStyles["checkbox-icon"]}
					>
						<path
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="3"
							stroke="currentColor"
							d="M4 12L10 18L20 6"
							className={customStyles["check-path"]}
						></path>
					</svg>
				</div>
			</label>
		</div>
	);
}

export { Checkbox };
