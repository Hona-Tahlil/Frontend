import { Button } from "@/components/Custom/Button/Button";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import { useMobile } from "@/hooks/ResponsiveHooks";
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
import type { ReactNode } from "react";

export const ReserveDetails = (props: {}) => {
	const isMobile = useMobile();
	return (
		<div className="flex justify-center p-5" dir="rtl">
			<div className="w-7/8 max-w-300 rounded-md bg-white drop-shadow-lg flex flex-col p-5">
				<div className="flex justify-between">
					<p className="font-bold text-lg">جزئیات رزرو</p>
					<p className="text-lg flex items-center gap-2">
						ویرایش
						<Edit size={20} />
					</p>
				</div>
				<div className="w-full h-0.5 bg-black/20"></div>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-start justify-around sm:justify-around py-3">
					<div className="flex flex-1 sm:items-center justify-center gap-3">
						{isMobile && <Bone className="text-primary"></Bone>}
						<div className="flex flex-col flex-1 sm:items-center justify-center">
							<p className="text-gray-500">نوع سرویس</p>
							<p className="text-black">نوع سرویس</p>
						</div>
					</div>
					<div className="w-full sm:w-0.5 h-0.5 sm:h-full bg-black/20"></div>
					<div className="flex flex-1 sm:items-center justify-center gap-3">
						{isMobile && <PawPrint className="text-primary"></PawPrint>}
						<div className="flex flex-col flex-1 sm:items-center justify-center">
							<p className="text-gray-500">پت ها</p>
							<div className="flex w-full flex-wrap justify-center gap-2">
								<div className="rounded-full bg-primary-300 px-3 py-0.2 text-white border border-primary">
									فندق
								</div>
								<div className="rounded-full bg-primary-300 px-3 py-0.2 text-white border border-primary">
									فندق
								</div>
								<div className="rounded-full bg-primary-300 px-3 py-0.2 text-white border border-primary">
									فندق
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="نام پت سیتر"
					left="قیمت"
					rightValue="تست"
					leftValue="تست"
					RightIcon={CircleUserRound}
					LeftIcon={CirclePercent}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="تاریخ شروع"
					left="تاریخ پایان"
					rightValue="تست"
					leftValue="تست"
					RightIcon={CalendarFold}
					LeftIcon={CalendarFold}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="ساعت شروع"
					left="ساعت پایان"
					rightValue="تست"
					leftValue="تست"
					RightIcon={Clock}
					LeftIcon={Clock}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="نوع رزور"
					left="آدرس"
					rightValue="تست"
					leftValue="تست"
					RightIcon={RefreshCw}
					LeftIcon={MapPin}
				/>
				<div className="w-full h-0.5 bg-black/20"></div>

				<Formik
					initialValues={{ body: "" }}
					onSubmit={(values) => console.log(values)}
				>
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

									<Rating defaultValue={1} className="self-center">
										{Array.from({ length: 5 }).map((_, index) => (
											<RatingButton
												className="text-primary"
												key={index}
												size={20}
											/>
										))}
									</Rating>
									<div className="w-full flex justify-center gap-3">
										<Button className="w-full" shadow={false}>
											تایید
										</Button>
										<Button
											className="w-full"
											variant={"outline"}
											shadow={false}
										>
											انصراف
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Form>
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
