import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function DatePicker() {
	const [open, setOpen] = React.useState(false);
	return (
		<div>
			<Select onOpenChange={setOpen}>
				<SelectTrigger
					className={cn(
						"w-[180px] flex h-13 !text-[15px] !transition-all !duration-200 delay-0 border border-[1px] rounded-[40px] border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm drop-shadow-lg",
						open ? "rounded-b-none rounded-t-2xl" : "",
					)}
				>
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent
					className="rounded-t-none rounded-b-2xl border-t-transparent"
					position="proper"
				>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
