import { Button } from "@/components/Custom/Button/Button";
import { Check } from "lucide-react";

export default function PetSitterSignupComplete() {
	return (
		<div className="w-full flex justify-center mt-20" dir="rtl">
			<div className="w-7/8 max-w-200 bg-white flex flex-col items-center p-10 rounded-4xl mb-10">
				<div className="size-50 bg-secondary-500 rounded-full flex items-center justify-center p-10 mt-5">
					<Check className="text-white" size={"auto"}></Check>
				</div>
				<p className="text-xl mt-15 text-center">
					درخواست شما ثبت شد و پس از بررسی کارشناسان فعال میشود.{" "}
				</p>
				<p className="text-md mt-10 text-center">
					شناسه درخواست: PR-45821 — در صورت نیاز، از طریق پشتیبانی با شما تماس
					میگیریم.{" "}
				</p>
				<div className="flex w-full justify-center gap-4 mt-10 flex-wrap">
					<Button
						shadow={false}
						className="rounded-xl text-black hover:text-white border-1 border-black/20 hover:border-primary-hover bg-white shadow-none"
					>
						بازگشت به خانه
					</Button>
					<Button shadow={false} className="rounded-xl">
						مشاهده وضعیت پروفایل
					</Button>
				</div>
			</div>
		</div>
	);
}
