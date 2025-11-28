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

export default function Address({ name }: { name?: string }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div>
				<Button>nice</Button>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>انتخاب آدرس</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
