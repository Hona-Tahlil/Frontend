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

export const ReserveEdit = (props: {}) => {
	const [dayCount, setDayCount] = useState(1);

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
						<div className="flex flex-col gap-5 rounded-xl drop-shadow-lg bg-white p-6 flex-1 max-w-200">
							<p className="text-xl font-bold">اطلاعات رزرو خود را وارد کنید</p>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">نوع سرویس</p>
								<ServiceToggleGroup
									name="services"
									values={["1", "2", "3", "4"]}
									titles={["نگهداری", "پیاده روی", "آرایشگاه", "درمان"]}
								/>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">پت ها</p>
								<PetToggleGroup
									values={["1", "2", "3", "4"]}
									titles={["نگهداری", "پیاده روی", "آرایشگاه", "درمان"]}
									classes={{ className: "justify-start" }}
								/>
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
										rounded-xl
									`}
								>
									اضافه کردن روز
									<Plus className="font-bold" size="auto" />
								</Button>
							</div>
							<div className="w-full h-0.5 border-0 bg-black/40"></div>
							<div className="flex justify-start">
								<p className="w-50 font-bold leading-10">نوع رزرو</p>
								<Select name="akhoond">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="روز" />
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
								<Address />
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
};
