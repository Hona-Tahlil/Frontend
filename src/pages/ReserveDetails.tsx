import { Button } from "@/components/Custom/Button/Button";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Spinner } from "@/components/ui/spinner";
import CustomToast from "@/components/Custom/CustomToast";
import {
	createComment,
	editComment,
	getRequestInfo,
} from "@/services/reserveCreateService";
import useUserStore from "@/store/userStore/userStore";
import type { RequestInfo } from "@/types/reserveCreateTypes";
import { Form, Formik } from "formik";
import {
	Bone,
	Book,
	CalendarFold,
	CirclePercent,
	CircleUserRound,
	Clock,
	Edit,
	MapPin,
	PawPrint,
	RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReserveDetails = () => {
	const isMobile = useMobile();
	const { accessToken } = useUserStore();
	const { requestID } = useParams();
	const navigate = useNavigate();
	const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
		const safeIndex = Math.max(index, 0);
		const hour = Math.floor(safeIndex / 2) % 24;
		const minute = safeIndex % 2 === 0 ? "00" : "30";
		return `${hour}:${minute}`;
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return Number.isNaN(date.valueOf())
			? dateString
			: date.toLocaleDateString("fa-IR");
	}

	const calendarSummary = useMemo(() => {
		if (!requestInfo?.calendarSlots?.length) {
			return { startDate: "-", endDate: "-", startTime: "-", endTime: "-" };
		}
		const sortedSlots = [...requestInfo.calendarSlots].sort(
			(a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
		);
		const firstSlot = sortedSlots[0];
		const lastSlot = sortedSlots[sortedSlots.length - 1];
		const firstTimeRange = mergeRanges(firstSlot.slots ?? []);
		const lastTimeRange = mergeRanges(lastSlot.slots ?? []);
		const startTime = firstTimeRange.length
			? indexToTime(firstTimeRange[0].start - 1)
			: "-";
		const endTime = lastTimeRange.length
			? indexToTime(lastTimeRange[lastTimeRange.length - 1].end)
			: "-";

		return {
			startDate: formatDate(firstSlot.date),
			endDate: formatDate(lastSlot.date),
			startTime,
			endTime,
		};
	}, [requestInfo]);

	const hasExistingComment = Boolean(requestInfo?.comment);
	const petSitterName = requestInfo
		? `${requestInfo.petSitterFirstName} ${requestInfo.petSitterLastName}`.trim()
		: "-";
	const totalPrice =
		requestInfo?.totalPrice !== undefined
			? requestInfo.totalPrice.toLocaleString("en-US")
			: "-";
	const totalPriceText = requestInfo ? `${totalPrice} تومان` : "-";
	const addressText = requestInfo?.address
		? `${requestInfo.address.provinceName}، ${requestInfo.address.cityName}، ${requestInfo.address.streetAddress}، پلاک ${requestInfo.address.houseNumber}، واحد ${requestInfo.address.unit}`
		: "-";

	useEffect(() => {
		if (!accessToken) {
			setIsLoading(false);
			navigate("/login");
			return;
		}
		const requestIdNumber = Number(requestID);
		if (!requestID || Number.isNaN(requestIdNumber)) {
			setIsLoading(false);
			return;
		}
		let isActive = true;
		const loadRequestInfo = async () => {
			try {
				setIsLoading(true);
				const response = await getRequestInfo({
					accessToken: accessToken!,
					requestID: requestIdNumber,
				});
				if (!isActive) return;
				setRequestInfo(response.data);
			} finally {
				if (isActive) {
					setIsLoading(false);
				}
			}
		};
		loadRequestInfo();
		return () => {
			isActive = false;
		};
	}, [accessToken, navigate, requestID]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spinner className="size-8" />
			</div>
		);
	}

	return (
		<div className="flex justify-center p-5" dir="rtl">
			<div className="w-7/8 max-w-300 rounded-md bg-white drop-shadow-lg flex flex-col p-5">
				<div className="flex justify-between">
					<p className="font-bold text-lg">جزئیات رزرو</p>
					<button
						type="button"
						className="text-lg flex items-center gap-2 hover:text-primary hover:underline"
						onClick={() =>
							navigate(`/reserve-edit/${requestInfo?.requestID ?? requestID}`)
						}
					>
						ویرایش
						<Edit size={20} />
					</button>
				</div>
				<div className="w-full h-0.5 bg-black/20"></div>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-start justify-around sm:justify-around py-3">
					<div className="flex flex-1 sm:items-center justify-center gap-3">
						{isMobile && <Bone className="text-primary"></Bone>}
						<div className="flex flex-col flex-1 sm:items-center justify-center">
							<p className="text-gray-500">نوع سرویس</p>
							<p className="text-black">{requestInfo?.service?.type ?? "-"}</p>
						</div>
					</div>
					<div className="w-full sm:w-0.5 h-0.5 sm:h-full bg-black/20"></div>
					<div className="flex flex-1 sm:items-center justify-center gap-3">
						{isMobile && <PawPrint className="text-primary"></PawPrint>}
						<div className="flex flex-col flex-1 sm:items-center justify-center">
							<p className="text-gray-500">پت ها</p>
							<div className="flex w-full flex-wrap justify-center gap-2">
								{requestInfo?.pets?.length ? (
									requestInfo.pets.map((pet) => (
										<div
											key={pet.id}
											className="rounded-full bg-primary-300 px-3 py-0.2 text-white border border-primary"
										>
											{pet.name}
										</div>
									))
								) : (
									<div className="rounded-full bg-primary-300 px-3 py-0.2 text-white border border-primary">
										-
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="نام پت سیتر"
					left="قیمت"
					rightValue={petSitterName || "-"}
					leftValue={totalPriceText}
					RightIcon={CircleUserRound}
					LeftIcon={CirclePercent}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="تاریخ شروع"
					left="تاریخ پایان"
					rightValue={calendarSummary.startDate}
					leftValue={calendarSummary.endDate}
					RightIcon={CalendarFold}
					LeftIcon={CalendarFold}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="ساعت شروع"
					left="ساعت پایان"
					rightValue={calendarSummary.startTime}
					leftValue={calendarSummary.endTime}
					RightIcon={Clock}
					LeftIcon={Clock}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="وضعیت رزرو"
					left="آدرس"
					rightValue={requestInfo?.status?.name ?? "-"}
					leftValue={addressText}
					RightIcon={RefreshCw}
					LeftIcon={MapPin}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>

				<Formik
					enableReinitialize
					initialValues={{
						body: requestInfo?.comment?.text ?? "",
						rating: requestInfo?.comment?.rating ?? 1,
					}}
					onSubmit={async (values, { setSubmitting }) => {
						const requestIdNumber = Number(requestID);
						if (!accessToken || !requestID || Number.isNaN(requestIdNumber)) {
							CustomToast("اطلاعات رزرو معتبر نیست.", "warning");
							setSubmitting(false);
							return;
						}
						try {
							if (hasExistingComment) {
								const commentID =
									requestInfo?.comment?.commentID ??
									requestInfo?.comment?.id ??
									requestInfo?.comment?.commentId;
								if (commentID === undefined) {
									CustomToast("شناسه نظر پیدا نشد.", "warning");
									setSubmitting(false);
									return;
								}
								await editComment({
									accessToken,
									commentID,
									text: values.body,
									rating: values.rating,
								});
							} else {
								await createComment({
									accessToken,
									requestID: requestIdNumber,
									text: values.body,
									rating: values.rating,
								});
							}
							const response = await getRequestInfo({
								accessToken,
								requestID: requestIdNumber,
							});
							setRequestInfo(response.data);
						} finally {
							setSubmitting(false);
						}
					}}
				>
					{({ isSubmitting, setFieldValue, values }) => (
						<Form>
						<div className="w-full flex justify-start">
							<div className="flex flex-1 sm:items-center justify-start gap-3 pt-3 sm:pt-0">
								{isMobile && <Book className="text-primary"></Book>}
								<div className="w-full sm:w-1/2 flex flex-col justify-center gap-3">
									<p className="text-gray-500 sm:text-center">نظر و امتیاز</p>
									<Textarea
										name="body"
										rows={5}
										classes={{
											inputClassName: "font-normal drop-shadow-lg border-0",
										}}
										placeholder="خودتان بنویسید"
									></Textarea>

									<Rating
										value={values.rating}
										onValueChange={(value) =>
											setFieldValue("rating", value)
										}
										className="self-center"
									>
										{Array.from({ length: 5 }).map((_, index) => (
											<RatingButton
												className="text-primary"
												key={index}
												size={20}
											/>
										))}
									</Rating>
									<div className="w-full flex justify-center gap-3">
										<Button
											className="w-full"
											shadow={false}
											disabled={isSubmitting}
											type="submit"
										>
											{hasExistingComment ? "ویرایش" : "تایید"}
										</Button>
										<Button
											className="w-full"
											variant={"outline"}
											shadow={false}
											type="button"
											disabled={isSubmitting}
										>
											انصراف
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

function RowHolder({
	right,
	left,
	rightValue,
	leftValue,
	RightIcon,
	LeftIcon,
}: {
	right: string;
	left: string;
	rightValue: string;
	leftValue: string;
	RightIcon: React.ComponentType<{ size?: string; className?: string }>;
	LeftIcon: React.ComponentType<{ size?: string; className?: string }>;
}) {
	const isMobile = useMobile();
	return (
		<div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-start justify-around sm:justify-around py-3">
			<div className="flex flex-1 sm:items-center justify-center gap-3">
				{isMobile && <RightIcon className="text-primary"></RightIcon>}
				<div className="flex flex-col flex-1 sm:items-center justify-center">
					<p className="text-gray-500">{right}</p>
					<p className="text-black">{rightValue}</p>
				</div>
			</div>
			<div className="w-full sm:w-0.5 h-0.5 sm:h-full bg-black/20"></div>
			<div className="flex flex-1 sm:items-center justify-center gap-3">
				{isMobile && <LeftIcon className="text-primary"></LeftIcon>}
				<div className="flex flex-col flex-1 sm:items-center justify-center">
					<p className="text-gray-500">{left}</p>
					<p className="text-black">{leftValue}</p>
				</div>
			</div>
		</div>
	);
}
