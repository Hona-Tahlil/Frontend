import { Button } from "@/components/Custom/Button/Button";
import type { CalenderSlot } from "@/types/reserveCreateTypes";
import { CircleCheck } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function ReserveSuccess() {
	const location = useLocation();
	const state = location.state as {
		petSitterName?: string;
		serviceType?: string;
		calendarSlots?: CalenderSlot[];
		addressText?: string;
		totalPrice?: number;
	} | null;

	function mergeRanges(indices: number[]) {
		const result: Array<{ start: number; end: number }> = [];
		if (indices.length === 0) return result;

		const sorted = [...indices].sort((a, b) => a - b);

		let start = sorted[0];
		let prev = sorted[0];

		for (let i = 1; i < sorted.length; i++) {
			if (sorted[i] === prev + 1) {
				prev = sorted[i];
			} else {
				result.push({ start, end: prev });
				start = sorted[i];
				prev = sorted[i];
			}
		}

		result.push({ start, end: prev });
		return result;
	}

	function indexToTime(index: number) {
		const hour = Math.floor(index / 2);
		const minute = index % 2 === 0 ? "00" : "30";
		return `${hour}:${minute}`;
	}

	const calendarSummary = useMemo(() => {
		if (!state?.calendarSlots?.length) {
			return { dateText: "-", timeText: "-" };
		}
		const dateText = state.calendarSlots
			.map((slot) => {
				const date = new Date(slot.date);
				return Number.isNaN(date.valueOf())
					? slot.date
					: date.toLocaleDateString("fa-IR");
			})
			.join("، ");
		const firstSlot = state.calendarSlots[0];
		const timeText = mergeRanges(firstSlot.slots ?? [])
			.map(({ start, end }) => `${indexToTime(start)} - ${indexToTime(end + 1)}`)
			.join("، ");
		return { dateText, timeText: timeText || "-" };
	}, [state]);

	const petSitterName = state?.petSitterName ?? "-";
	const serviceType = state?.serviceType ?? "-";
	const addressText = state?.addressText ?? "-";
	const totalPrice =
		state?.totalPrice !== undefined
			? state.totalPrice.toLocaleString("en-US")
			: "-";

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
					<p className="text-lg">پتیار: {petSitterName}</p>
					<p className="text-lg">نوع سرویس: {serviceType}</p>
					<p className="text-lg">تاریخ: {calendarSummary.dateText}</p>
					<p className="text-lg">ساعت: {calendarSummary.timeText}</p>
					<p className="text-lg">آدرس: {addressText}</p>
					<p className="text-lg">مبلغ قابل پرداخت: {totalPrice} تومان</p>
				</div>
				<Button variant={"outline"} className="w-full mt-5" shadow={false}>
					رفتن به رزور های من
				</Button>
			</div>
		</div>
	);
}
