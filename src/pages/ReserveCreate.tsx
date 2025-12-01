import { Button } from "@/components/Custom/Button/Button";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Form, Formik } from "formik";

import customStyles from "./ReserveCreate.module.css";
import { CircleX, Plus } from "lucide-react";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Custom/Select/Select";
import ServiceToggleGroup from "@/components/Booking/PetOwner/ServiceToggleGroup";
import PetToggleGroup from "@/components/Booking/PetOwner/PetToggleGroup";
import Address from "@/components/Custom/Address/Address";

export default function ReserveCreate() {
	const [dayCount, setDayCount] = useState(0);

	function addDay() {
		setDayCount(dayCount + 1);
	}
	function removeDay() {
		if (dayCount > 0) {
			setDayCount(dayCount - 1);
		}
	}
	return (
		<div className="p-4" dir="rtl">
			<Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
				<Form>
					<div className="w-full flex gap-6 p-12 justify-center">
						<div className="flex flex-col h-fit gap-3 w-100 rounded-xl drop-shadow-lg bg-white p-6">
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
						<div className="flex flex-col gap-5 rounded-xl drop-shadow-lg bg-white p-6 flex-1 max-w-200">
							<p className="text-xl font-bold">اطلاعات رزرو خود را وارد کنید</p>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">نوع سرویس</p>
								<ServiceToggleGroup
									name="services"
									classes={{
										textClassName: "text-xl",
									}}
									values={["1", "2", "3", "4"]}
									titles={["نگهداری", "پیاده روی", "آرایشگاه", "درمان"]}
								/>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">پت ها</p>
								<PetToggleGroup
									classes={{
										className: "gap-3",
										toggleClassName: "py-5 px-3",
										textClassName: "text-xl",
									}}
									values={["1", "2", "3", "4"]}
									titles={["نگهداری", "پیاده روی", "آرایشگاه", "درمان"]}
								/>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">تاریخ</p>
								<div className="flex-1">
									<DatePicker
										className="h-10 border-0 drop-shadow-lg"
										name="nice"
									></DatePicker>
								</div>
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
										<p className="w-50 font-bold leading-10">تاریخ</p>
										<div className="flex-1">
											<DatePicker
												className="h-10 border-0 drop-shadow-lg"
												name="nice"
											></DatePicker>
										</div>
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
								</>
							))}
							{dayCount > 0 && (
								<div className="flex justify-center">
									<Button onClick={removeDay} shadow className="bg-red-500">
										حذف روز
										<CircleX />
									</Button>
								</div>
							)}
							<div className="flex justify-center">
								<Button
									onClick={addDay}
									shadow
									className={`
										flex items-center gap-2 
										px-6 py-4 
										border-4 border-dashed 
										border-primary 
										bg-primary-100 
										text-primary-600 
										text-xl font-semibold
										rounded-md
										font-normal
									`}
								>
									<Plus className="" size="auto" />
									اضافه کردن روز
								</Button>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">نوع رزرو</p>
								<Select name="akhoond">
									<SelectTrigger className="flex-1 h-10 border-0">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value={"1"}>1</SelectItem>
											<SelectItem value={"2"}>2</SelectItem>
											<SelectItem value={"3"}>3</SelectItem>
											<SelectItem value={"4"}>4</SelectItem>
											<SelectItem value={"5"}>5</SelectItem>
											<SelectItem value={"6"}>6</SelectItem>
											<SelectItem value={"7"}>7</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">آدرس</p>
								<Address
									className="flex-1"
									classes={{
										inputClassName: "border-0",
										className: "border-0",
									}}
								/>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
