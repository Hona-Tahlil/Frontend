import AuthBackground from "@/components/Auth/Background/AuthBackground";

import SignupForm from "@/components/Auth/SignupForm/SignupForm";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function Signup() {
	return (
		<div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
			<AuthBackground />

			<SignupForm />
		</div>
	);
}
