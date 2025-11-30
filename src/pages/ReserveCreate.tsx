import { Button } from "@/components/Custom/Button/Button";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Form, Formik } from "formik";

import customStyles from "./ReserveCreate.module.css";
import { CircleX, Cross, Plus } from "lucide-react";
import { useState } from "react";

export default function ReserveCreate() {
	const [dayCount, setDayCount] = useState(1);
	return (
		<div className="p-4" dir="rtl">
			<Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
				<Form>
					<div className="w-full flex gap-6 p-12">
						<div className="flex flex-col gap-3 w-100 rounded-xl drop-shadow-lg bg-white p-6">
							<p className="text-xl font-bold">خلاصه پرداخت</p>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-between">
								<div className="text-gray-500">هزینه نگهداری</div>
								<div>12 تومن</div>
							</div>
							<div className="flex justify-between">
								<div className="text-gray-500">هزینه نگهداری</div>
								<div>12 تومن</div>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-between">
								<div className="font-bold">مبلغ نهایی</div>
								<div className="font-bold text-primary">12 تومن</div>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<Button className="mx-5" shadow>
								تایید و ادامه
							</Button>
							<p className="text-center">
								با کلیلک بر روی تایید شما با{" "}
								<a className="text-primary underline underline-offset-4 hover:text-primary-hover hover:cursor-pointer">
									قوانین و مقررات
								</a>{" "}
								موافقت می کنید.
							</p>
						</div>
						<div className="flex flex-col gap-5 rounded-xl drop-shadow-lg bg-white p-6 flex-1 ">
							<p className="text-xl font-bold">اطلاعات رزرو خود را وارد کنید</p>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">نوع سرویس</p>
								{/*component*/}
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">پت ها</p>
								{/*component*/}
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">تاریخ شروع</p>
								<DatePicker className="h-10" name="nice"></DatePicker>
							</div>
							<div className="flex justify-between">
								<div className="flex gap-3">
									<p className="font-bold leading-10">بازه های انتخاب شده</p>
									<p className="font-bold leading-10">12:00 - 15:00</p>
								</div>
								<Button shadow>ویرایش</Button>
							</div>
							{Array.from({ length: dayCount }).map((_, index) => (
								<>
									<div className="w-full h-0.5 border-0 bg-black/40"></div>
									<div className="flex justify-start">
										<p className="w-50 font-bold leading-10">تاریخ شروع</p>
										<DatePicker className="h-10" name="nice"></DatePicker>
									</div>
									<div className="flex justify-between">
										<div className="flex gap-3">
											<p className="font-bold leading-10">
												بازه های انتخاب شده
											</p>
											<p className="font-bold leading-10">12:00 - 15:00</p>
										</div>
										<Button shadow>ویرایش</Button>
									</div>
									<div className="flex justify-center">
										<Button shadow className="bg-red-500">
											حذف روز
											<CircleX />
										</Button>
									</div>
								</>
							))}
							<div className="flex justify-center">
								<Button
									shadow
									className={`
										flex items-center gap-2 
										px-6 py-4 
										border-4 border-dashed 
										border-primary 
										bg-primary-100 
										text-primary-600 
										text-xl font-semibold
										rounded-xl
									`}
								>
									اضافه کردن روز
									<Plus className="font-bold" size="auto" />
								</Button>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
