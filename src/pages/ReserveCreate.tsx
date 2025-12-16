import { Button } from "@/components/Custom/Button/Button";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Form, Formik } from "formik";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import customStyles from "./ReserveCreate.module.css";
import { CircleX, Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useDesktop, useMobile } from "@/hooks/ResponsiveHooks";
import {
	createRequest,
	getCreateRequestInfo,
} from "@/services/reserveCreateService";
import useUserStore from "@/store/userStore/userStore";
import { useParams } from "react-router-dom";
import type {
	AddressInfo,
	AddressInfoWithId,
	CalenderSlot,
	Days,
	Pet,
	Service,
} from "@/types/reserveCreateTypes";
import Toggle from "@/components/Custom/Toggle/Toggle";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import * as Yup from "yup";

export default function ReserveCreate() {
	const [dayCount, setDayCount] = useState(0);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [addressIsChecked, setIsChecked] = useState(false);

	const [pets, setPets] = useState([] as Pet[]);
	const [services, setServices] = useState([] as Service[]);
	const [addresses, setAddresses] = useState<AddressInfoWithId[]>([]);

	const [currentDay, setCurrentDay] = useState<number>(0);
	const [dayRanges, setDayRanges] = useState<Map<number, number[]>>(new Map());

	const { accessToken } = useUserStore();
	const { petSitterUserID } = useParams();

	const validationSchema = Yup.object({
		days: Yup.object({
			day0: Yup.string().required("روز اجباریست"),
		}),
	});

	function openDialogForDay(dayIndex: number) {
		setCurrentDay(dayIndex);
		setDialogOpen(true);
	}
	function closeDialog() {
		setDialogOpen(false);
	}

	function addDay() {
		setDayCount(dayCount + 1);
	}
	function removeDay() {
		if (dayCount > 0) {
			setDayCount(dayCount - 1);
		}
	}

	const isDesktop = useDesktop();
	const isMobile = useMobile();

	function loadRequestInfo() {
		getCreateRequestInfo({
			accessToken: accessToken!,
			petSitterUserID: petSitterUserID as unknown as number,
		}).then((response) => {
			setPets(response.pets);
			setServices(response.services);
			setAddresses(response.addresses);
		});
	}

	function convertToCalenderSlots(
		days: Days,
		dayRanges: Map<number, number[]>,
	): CalenderSlot[] {
		const calenderSlots: CalenderSlot[] = [];

		const dayKeys = Object.keys(days);

		dayRanges.forEach((slots: number[], dayIndex: number) => {
			const dayKey = dayKeys[dayIndex];

			if (dayKey === undefined) {
				console.warn(
					`Warning: dayRanges key '${dayIndex}' does not correspond to a valid key in the 'days' object.`,
				);
				return; // Skip this iteration
			}

			const dateString = days[dayKey];

			const newSlot: CalenderSlot = {
				date: dateString,
				slots: slots,
			};

			calenderSlots.push(newSlot);
		});

		return calenderSlots;
	}

	useEffect(() => {
		loadRequestInfo();
		console.log("id:", petSitterUserID);
	}, [petSitterUserID]);
	return (
		<div className="p-0 sm:p-4" dir={!isDesktop ? "rtl" : "ltr"}>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					requestType: "monthly",
					serviceID: [] as string[],
					petID: [] as string[],
					notes: "",
					addressID: "",
					days: {},
					Province: "",
					City: "",
					Address: "",
					Vahed: "",
					Pelak: "",
				}}
				onSubmit={(values) => {
					console.log(values);
					console.log({
						petSitterUserID: petSitterUserID as unknown as number,
						calendarSlots: convertToCalenderSlots(values.days, dayRanges),
						petIDs: values.petID.map((id) => parseInt(id)),
						notes: values.notes,
						addressInfo: {
							provinceName: values.Province,
							cityName: values.City,
							streetAddress: values.Address,
							houseNumber: values.Pelak,
							unit: values.Vahed,
						},
						addressID: parseInt(values.addressID),
						serviceID: parseInt(values.serviceID![0]),
						accessToken: accessToken!,
					});
					createRequest({
						petSitterUserID: petSitterUserID as unknown as number,
						calendarSlots: convertToCalenderSlots(values.days, dayRanges),
						petIDs: values.petID.map((id) => parseInt(id)),
						notes: values.notes,
						addressInfo: {
							provinceName: values.Province,
							cityName: values.City,
							streetAddress: values.Address,
							houseNumber: values.Pelak,
							unit: values.Vahed,
						},
						addressID: parseInt(values.addressID),
						serviceID: parseInt(values.serviceID![0]),
						accessToken: accessToken!,
					});
				}}
			>
				{({ values, errors }) => (
					<Form>
						<div className="w-full flex flex-col lg:flex-row gap-6 py-12 px-3 sm:p-12 justify-center">
							<div
								className="flex flex-col gap-5 rounded-xl drop-shadow-lg bg-white p-6 flex-1 lg:max-w-200"
								dir="rtl"
							>
								<p className="text-xl font-bold">
									اطلاعات رزرو خود را وارد کنید
								</p>
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										نوع سرویس
									</p>
									<ServiceToggleGroup
										name="serviceID"
										type="single"
										classes={{
											textClassName: "text-xl",
										}}
										values={services.map((service) => service.id.toString())}
										titles={services.map((service) => service.type)}
									/>
								</div>
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										پت ها
									</p>
									<PetToggleGroup
										classes={{
											className: "gap-3 flex-1",
											toggleClassName: "py-5 px-3",
											textClassName: "text-xl",
										}}
										values={pets.map((pet) => pet.id.toString())}
										titles={pets.map((pet) => pet.name)}
									/>
								</div>
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										تاریخ
									</p>
									<div className="flex-1">
										<DatePicker
											className="h-10 border-0 drop-shadow-lg"
											name="days.day0"
										></DatePicker>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row justify-between">
									<div className="flex flex-col flex-wrap sm:flex-row gap-3">
										<p className="font-bold leading-10">بازه های انتخاب شده</p>
										{dayRanges.get(0) ? (
											dayRanges.get(0)!.map((rangeIndex) => (
												<div key={rangeIndex} className="font-bold leading-10">
													{Math.floor((rangeIndex - 1) / 2)}:
													{rangeIndex % 2 === 0 ? "30" : "00"}
													{" - "}
													{Math.floor(rangeIndex / 2)}:
													{(rangeIndex + 1) % 2 === 0 ? "30" : "00"}
												</div>
											))
										) : (
											<></>
										)}
									</div>
									<Button
										shadow
										type="button"
										onClick={() => openDialogForDay(0)}
									>
										ویرایش
									</Button>
								</div>
								<div className="flex flex-col sm:flex-row justify-between">
									{errors.days?.day0 && (
										<p className="text-red-500">{errors.days.day0}</p>
									)}
								</div>
								<div className="flex flex-col sm:flex-row justify-between">
									{dayRanges.get(0) === undefined && (
										<p className="text-red-500">حداقل یک بازه انتخاب کنید</p>
									)}
								</div>
								{Array.from({ length: dayCount }).map((_, index) => (
									<>
										<div className="w-full h-0.5 border-0 bg-black/40"></div>
										<div className="flex justify-start">
											<p className="w-50 font-bold leading-10">تاریخ</p>
											<div className="flex-1">
												<DatePicker
													className="h-10 border-0 drop-shadow-lg"
													name={`days.day${index + 1}`}
												></DatePicker>
											</div>
										</div>
										<div className="flex justify-between">
											<div className="flex flex-col flex-wrap sm:flex-row gap-3">
												<p className="font-bold leading-10">
													بازه های انتخاب شده
												</p>
												{dayRanges.get(index + 1) ? (
													dayRanges.get(index + 1)!.map((rangeIndex) => (
														<div
															key={rangeIndex}
															className="font-bold leading-10"
														>
															{Math.floor((rangeIndex - 1) / 2)}:
															{rangeIndex % 2 === 0 ? "30" : "00"}
															{" - "}
															{Math.floor(rangeIndex / 2)}:
															{(rangeIndex + 1) % 2 === 0 ? "30" : "00"}
														</div>
													))
												) : (
													<></>
												)}
											</div>
											<Button
												shadow
												type="button"
												onClick={() => openDialogForDay(index + 1)}
											>
												ویرایش
											</Button>
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
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										نوع رزرو
									</p>
									<Select name="requestType">
										<SelectTrigger className="flex-1 h-10 border-0">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value={"monthly"}>ماهانه</SelectItem>
												<SelectItem value={"weekly"}>هفتگی</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										توضیحات
									</p>
									<Textarea
										className="flex-1"
										name="note"
										rows={5}
										classes={{
											className: "flex-1",
											inputClassName: "flex-1 border-0 drop-shadow-lg",
										}}
									/>
								</div>
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										آدرس
									</p>
									<div dir="ltr" className="flex-1 flex justify-end">
										<Toggle
											className="!w-full !h-10 mb-10 "
											text="استفاده از آدرس قبلی"
											checked={addressIsChecked}
											onCheckedChange={() =>
												setIsChecked((checked) => !checked)
											}
										/>
									</div>
								</div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 text-transparent sm:w-30 lg:w-50 font-bold leading-10">
										آدرس
									</p>

									{addressIsChecked && (
										<>
											<Select name="addressID">
												<SelectTrigger className="flex-1 h-10 border-0">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{addresses.map((address) => (
															<SelectItem
																value={address.id}
															>{`${address.provinceName},${address.cityName},${address.streetAddress.substring(0, 5)}...`}</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</>
									)}
									{!addressIsChecked && (
										<Address
											className="flex-1"
											classes={{
												inputClassName: "border-0",
												className: "border-0",
											}}
										/>
									)}
								</div>
							</div>
							{!isMobile && (
								<div
									className="flex flex-col h-fit gap-3 w-full lg:w-100 rounded-xl drop-shadow-lg bg-white p-6"
									dir="rtl"
								>
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
							)}
						</div>
						{isMobile && (
							<div
								className="flex flex-col h-fit gap-3 w-full lg:w-100 rounded-xl drop-shadow-lg bg-white p-6"
								dir="rtl"
							>
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
						)}
					</Form>
				)}
			</Formik>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="flex flex-col items-center">
					<Formik
						initialValues={{
							range1: [] as string[],
							range2: [] as string[],
						}}
						onSubmit={(values) => {
							const allRanges = [values.range1, values.range2]
								.flat()
								.filter((range) => range !== undefined);
							dayRanges.set(
								currentDay,
								allRanges.map((r) => parseInt(r)),
							);
							console.log(
								"Selected ranges for day",
								currentDay,
								":",
								allRanges,
							);
							console.log(dayRanges);
							closeDialog();
						}}
					>
						<Form className="flex flex-col items-center">
							<p className="font-bold">بازه های مورد نظر خود را انتخاب کنید</p>
							<div className="h-52 overflow-y-auto">
								<div className="flex gap-4">
									<ServiceToggleGroup
										name="range1"
										classes={{
											textClassName: "text-xl",
										}}
										values={Array.from({ length: 24 }).map((_, index) =>
											(index * 2 + 1).toString(),
										)}
										titles={Array.from({ length: 24 }).map(
											(_, index) => `${index}:00 - ${index}:30`,
										)}
									/>
									<ServiceToggleGroup
										name="range2"
										classes={{
											textClassName: "text-xl",
										}}
										values={Array.from({ length: 24 }).map((_, index) =>
											(index * 2 + 2).toString(),
										)}
										titles={Array.from({ length: 24 }).map(
											(_, index) => `${index}:30 - ${(index + 1) % 24}:00`,
										)}
									/>
								</div>
							</div>
							<div className="flex gap-4 mt-4">
								<Button type="submit">ثبت</Button>
								<Button variant={"outline"} type="button" onClick={closeDialog}>
									انصراف
								</Button>
							</div>
						</Form>
					</Formik>
				</DialogContent>
			</Dialog>
		</div>
	);
}
