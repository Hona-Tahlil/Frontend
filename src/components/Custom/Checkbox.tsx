import * as React from "react";
import { cn } from "@/lib/utils";

import customStyles from "./Checkbox.module.css";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	text?: String;
}
function Checkbox({ className, text, ...props }: InputProps) {
	return (
		<div className="flex gap-1">
			<label className="font-[Alibaba] h-auto">{text}</label>
			<label className={cn(customStyles["ios-checkbox"], customStyles.red)}>
				<input
					type="checkbox"
					data-slot="input"
					className={cn(className)}
					{...props}
				/>
				<div className={customStyles["checkbox-wrapper"]}>
					<div className={customStyles["checkbox-bg"]}></div>
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
