import { Button } from "@/components/Custom/Button/Button";
import { CircleCheck } from "lucide-react";

export default function ReserveSuccess() {
	return (
		<div className="flex justify-center mt-10 mb-10" dir="rtl">
			<div className="w-7/8 max-w-150 bg-white rounded-xl drop-shadow-lg flex flex-col items-center p-6 gap-3">
				<p className="font-bold text-2xl text-center">
					درخواست شما با موفقیت ثبت شد!
				</p>
				<div className="mt-4 w-20 text-secondary-500">
					<CircleCheck
						size={"auto"}
						className="bg-secondary-200 rounded-full border-4 border-secondary-200"
					/>
				</div>
				<p className="text-center text-xl">
					میتوانید از بخش «رزروهای من» وضعیت را پیگیری کنید یا از طریق چت با
					پتیار در تماس باشید.
				</p>
				<div className="flex flex-col items-start bg-primary-200 w-full rounded-xl p-5 mt-6">
					<p className="font-bold text-lg">جزئیات رزرو</p>
					<p className="text-lg">پتیار</p>
					<p className="text-lg">نوع سرویس</p>
					<p className="text-lg">تاریخ</p>
					<p className="text-lg">ساعت</p>
					<p className="text-lg">آدرس</p>
					<p className="text-lg">مبلغ قابل پرداخت</p>
				</div>
				<Button variant={"outline"} className="w-full mt-5" shadow={false}>
					رفتن به رزور های من
				</Button>
			</div>
		</div>
	);
}
