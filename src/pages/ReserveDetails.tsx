import { Button } from "@/components/Custom/Button/Button";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import { Form, Formik } from "formik";
import { Edit } from "lucide-react";
import type { ReactNode } from "react";

export const ReserveDetails = (props: {}) => {
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
				<div className="flex justify-around py-3">
					<div className="flex flex-col flex-1 items-center">
						<p className="text-gray-500">نوع سرویس</p>
						<p className="text-black">نوع سرویس</p>
					</div>
					<div className="w-0.5 h-full bg-black/20"></div>
					<div className="flex flex-col flex-1 items-center">
						<p className="text-gray-500">پت ها</p>
						<div className="flex w-full justify-center gap-2">
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
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="نام پت سیتر"
					left="قیمت"
					rightValue="تست"
					leftValue="تست"
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="تاریخ شروع"
					left="تاریخ پایان"
					rightValue="تست"
					leftValue="تست"
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="ساعت شروع"
					left="ساعت پایان"
					rightValue="تست"
					leftValue="تست"
				/>
				<div className="w-full h-0.5 bg-black/20"></div>
				<RowHolder
					right="نوع رزور"
					left="آدرس"
					rightValue="تست"
					leftValue="تست"
				/>
				<div className="w-full h-0.5 bg-black/20"></div>

				<Formik
					initialValues={{ body: "" }}
					onSubmit={(values) => console.log(values)}
				>
					<Form>
						<div className="w-full flex justify-start">
							<div className="w-1/2 flex flex-col justify-center gap-3">
								<p className="text-gray-500 text-center">نظر و امتیاز</p>
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
									<Button className="w-full" variant={"outline"} shadow={false}>
										انصراف
									</Button>
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
}: {
	right: string;
	left: string;
	rightValue: string;
	leftValue: string;
}) {
	return (
		<div className="flex justify-around py-3">
			<div className="flex flex-col flex-1 items-center">
				<p className="text-gray-500">{right}</p>
				<p className="text-black">{rightValue}</p>
			</div>
			<div className="w-0.5 h-full bg-black/20"></div>
			<div className="flex flex-col flex-1 items-center">
				<p className="text-gray-500">{left}</p>
				<p className="text-black">{leftValue}</p>
			</div>
		</div>
	);
}
