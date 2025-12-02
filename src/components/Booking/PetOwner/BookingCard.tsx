import { Button } from "@/components/Custom/Button/Button";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { cn } from "@/lib/utils";
import type { BookingCardProps } from "@/types/bookingCardTypes";
import { formatNumber } from "@/utils/formatNumber";
import { translateNumber } from "@/utils/translateNumber";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function BookingCard({
	cardStatus,
	commentStatus,
	side,
	title,
	services,
	cost,
	location,
	date,
	time,
}: BookingCardProps) {
	const isMobile = useMobile();
	return (
		<div
			className={cn(
				"relative w-full border-3 sm:border-1 sm:border-black/20 rounded-3xl p-3 bg-white",
				cardStatus == "rejected" ? "border-red-500" : "",
				cardStatus == "accepted" ? "border-green-500" : "",
				cardStatus == "done" ? "border-primary" : "",
				cardStatus == "pending" ? "border-yellow-500" : "",
			)}
			dir="rtl"
		>
			{isMobile && (
				<div className="absolute left-5 top-0 -translate-y-1/2 flex">
					{cardStatus == "rejected" && (
						<div className="border-0 bg-white rounded-none text-red-500 px-1">
							رد شده
						</div>
					)}
					{cardStatus == "accepted" && (
						<div className="border-0 bg-white rounded-none text-green-500 px-1">
							تایید شده
						</div>
					)}
					{cardStatus == "done" && (
						<div className="border-0 bg-white rounded-none text-primary px-1">
							انجام شده
						</div>
					)}
					{cardStatus == "pending" && (
						<div className="border-0 bg-white rounded-none text-yellow-500 px-1">
							در انتظار تایید
						</div>
					)}
				</div>
			)}
			<div className="relative w-full h-full">
				{!isMobile && (
					<div className="absolute left-0 flex">
						{cardStatus == "rejected" && (
							<div className="border-2 border-red-500 text-red-500 rounded-full px-3">
								رد شده
							</div>
						)}
						{cardStatus == "accepted" && (
							<div className="border-2 border-green-500 text-green-500 rounded-full px-3">
								تایید شده
							</div>
						)}
						{cardStatus == "done" && (
							<div className="border-2 border-primary text-primary rounded-full px-3">
								انجام شده
							</div>
						)}
						{cardStatus == "pending" && (
							<div className="border-2 border-yellow-500 text-yellow-500 rounded-full px-3">
								در انتظار تایید
							</div>
						)}
					</div>
				)}

				<div className="flex flex-col gap-2 sm:gap-0">
					<div className="flex gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-full size-20 bg-gray-500"></div>
							{isMobile && <p className="text-2xl">{title}</p>}
						</div>
						<div className="flex-1 flex flex-col gap-2">
							{!isMobile && <p className="text-2xl">{title}</p>}
							{!isMobile && <p className="text-xl">{services}</p>}
							<div className="flex flex-col items-center sm:flex-row">
								<div className="flex flex-col sm:w-full items-start sm:flex-row gap-3 sm:gap-[5%] md:gap-[10%]">
									<p className="flex text-gray-500 gap-1">
										<MapPin />
										{location}
									</p>
									<p className="flex text-gray-500 gap-1">
										<Calendar />
										{translateNumber(date)}
									</p>
									<p className="flex text-gray-500 gap-1">
										<Clock />
										{translateNumber(time)}
									</p>
								</div>
							</div>
							<p className="text-xl w-full text-left sm:text-right">
								مبلغ: {translateNumber(formatNumber(cost))} تومان
							</p>
						</div>
					</div>
					<div className="w-full flex justify-end gap-2">
						{cardStatus == "accepted" && (
							<Button shadow={false} className="shadow-none h-8 py-0">
								چت
							</Button>
						)}
						<Button
							shadow={false}
							variant={"outline"}
							className="shadow-none h-8 py-0"
						>
							مشاهده جزئیات
						</Button>
						{cardStatus == "accepted" && (
							<Button
								variant={"outline"}
								shadow={false}
								className="shadow-none h-8 py-0 text-red-500 border-red-500 hover:bg-red-500"
							>
								لغو رزرو
							</Button>
						)}
						{cardStatus == "pending" && (
							<Button
								variant={"outline"}
								shadow={false}
								className="shadow-none h-8 py-0 text-red-500 border-red-500 hover:bg-red-500"
							>
								اغو درخواست
							</Button>
						)}
						{cardStatus == "done" && !commentStatus && (
							<Button shadow={false} className="shadow-none h-8 py-0">
								ثبت نظر
							</Button>
						)}
						{cardStatus == "done" && commentStatus && (
							<>
								<div className="flex items-center gap-2">
									<p className="text-md">نظر شما:</p>
									<Rating defaultValue={commentStatus} readOnly>
										{Array.from({ length: 5 }).map((_, index) => (
											<RatingButton
												className="text-primary"
												key={index}
												size={10}
											/>
										))}
									</Rating>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
