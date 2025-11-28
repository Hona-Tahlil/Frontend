import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import { useState } from "react";
import { City, LocationSelector, Province } from "../Province/Province";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";

export default function Address({ name }: { name?: string }) {
	const [open, setOpen] = useState(false);
	function openDiaglog() {
		setOpen(true);
	}
	return (
		<>
			<div>
				<Button onClick={openDiaglog} type="button">
					nice
				</Button>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent dir="rtl">
					<DialogTitle className="mt-5">انتخاب آدرس</DialogTitle>
					<div className="flex flex-col gap-4">
						<div className="flex w-full">
							<LocationSelector>
								<div className="flex w-1/4"></div>
								<div className="flex w-3/4 gap-2">
									<Province className="w-full" />
									<City className="w-full" />
								</div>
							</LocationSelector>
						</div>
						<div className="flex items-center w-full text-xl gap-4">
							<div className="flex w-full items-center">
								<div className="flex w-1/4">
									<p>پلاک</p>
								</div>
								<div className="flex w-3/4">
									<Input
										name="nice"
										shadow
										classes={{
											className: "w-full",
											inputClassName: "h-13 border-0",
										}}
									></Input>
								</div>
							</div>
						</div>
						<div className="flex items-center w-full text-xl gap-4">
							<div className="flex w-full items-center">
								<div className="flex w-1/4">
									<p>آدرس</p>
								</div>
								<div className="flex w-3/4">
									<Textarea
										name="nice"
										rows={5}
										className="drop-shadow-lg border-0"
									/>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
