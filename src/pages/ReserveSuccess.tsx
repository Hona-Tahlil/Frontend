import { Button } from "@/components/Custom/Button/Button";
import { getRequestInfo } from "@/services/reserveCreateService";
import useUserStore from "@/store/userStore/userStore";
import type { RequestInfo } from "@/types/reserveCreateTypes";
import { CircleCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ReserveSuccess() {
	const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);
	const { accessToken } = useUserStore();
	const { requestID } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
			return;
		}
		const requestIdNumber = Number(requestID);
		if (!requestID || Number.isNaN(requestIdNumber)) {
			return;
		}
		let isActive = true;
		const loadRequestInfo = async () => {
			const response = await getRequestInfo({
				accessToken: accessToken!,
				requestID: requestIdNumber,
			});
			if (!isActive) return;
			setRequestInfo(response.data);
		};
		loadRequestInfo();
		return () => {
			isActive = false;
		};
	}, [accessToken, navigate, requestID]);

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
		if (!requestInfo?.calendarSlots?.length) {
			return { dateText: "-", timeText: "-" };
		}
		const dateText = requestInfo.calendarSlots
			.map((slot) => {
				const date = new Date(slot.date);
				return Number.isNaN(date.valueOf())
					? slot.date
					: date.toLocaleDateString("fa-IR");
			})
			.join("، ");
		const firstSlot = requestInfo.calendarSlots[0];
		const timeText = mergeRanges(firstSlot.slots ?? [])
			.map(({ start, end }) => `${indexToTime(start)} - ${indexToTime(end + 1)}`)
			.join("، ");
		return { dateText, timeText: timeText || "-" };
	}, [requestInfo]);

	const addressText = useMemo(() => {
		if (!requestInfo?.address) return "-";
		const { provinceName, cityName, streetAddress, houseNumber, unit } =
			requestInfo.address;
		return `${provinceName}، ${cityName}، ${streetAddress}، پلاک ${houseNumber}، واحد ${unit}`;
	}, [requestInfo]);

	const petSitterName = requestInfo
		? `${requestInfo.petSitterFirstName} ${requestInfo.petSitterLastName}`
		: "-";

	const serviceType = requestInfo?.service?.type ?? "-";
	const totalPrice =
		requestInfo?.totalPrice !== undefined
			? requestInfo.totalPrice.toLocaleString("en-US")
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
