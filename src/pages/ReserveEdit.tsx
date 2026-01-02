import { Button } from "@/components/Custom/Button/Button";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Form, Formik } from "formik";

import jalaali from "jalaali-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { CircleX, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
	editRequest,
	getCreateRequestInfo,
	getRequestInfo,
} from "@/services/reserveCreateService";
import {
	fetchCitiesService,
	fetchProvincesService,
} from "@/services/provinceService";
import useUserStore from "@/store/userStore/userStore";
import { useNavigate, useParams } from "react-router-dom";
import type {
	AddressInfoWithId,
	CalenderSlot,
	Days,
	Pet,
	RequestInfo,
	Service,
} from "@/types/reserveCreateTypes";
import Toggle from "@/components/Custom/Toggle/Toggle";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import * as Yup from "yup";
import { toTehranISOString } from "@/utils/toTehranISOString";
import { Spinner } from "@/components/ui/spinner";

export default function ReserveEdit() {
	const [dayCount, setDayCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [addressIsChecked, setIsChecked] = useState(false);

	const [pets, setPets] = useState([] as Pet[]);
	const [services, setServices] = useState([] as Service[]);
	const [addresses, setAddresses] = useState<AddressInfoWithId[]>([]);
	const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);
	const [initialDays, setInitialDays] = useState<Days>({});
	const [selectedPetIds, setSelectedPetIds] = useState([] as string[]);
	const [selectedServiceIds, setSelectedServiceIds] = useState([] as string[]);
	const [addressFormValues, setAddressFormValues] = useState({
		Province: "",
		City: "",
		Address: "",
		Vahed: "",
		Pelak: "",
	});

	const [currentDay, setCurrentDay] = useState<number>(0);
	const [dayRanges, setDayRanges] = useState<Map<number, number[]>>(new Map());

	const { accessToken } = useUserStore();
	const { requestID } = useParams();

	const validationSchema = Yup.object({
		serviceID: Yup.array()
			.of(Yup.string())
			.min(1, "انتخاب سرویس الزامی است"),
		petID: Yup.array().of(Yup.string()).min(1, "انتخاب پت الزامی است"),
		days: Yup.object({
			day0: Yup.string().required("روز اجباریست"),
		}),
	});

	const initialValues = useMemo(
		() => ({
			requestType: "monthly",
			serviceID: selectedServiceIds,
			petID: selectedPetIds,
			note: requestInfo?.notes ?? "",
			notes: requestInfo?.notes ?? "",
			addressID: requestInfo?.address?.id
				? requestInfo.address.id.toString()
				: "",
			addressSelection: "",
			days: initialDays,
			Province: addressFormValues.Province,
			City: addressFormValues.City,
			Address: addressFormValues.Address,
			Vahed: addressFormValues.Vahed,
			Pelak: addressFormValues.Pelak,
			calendarSlot: "",
		}),
		[
			addressFormValues,
			initialDays,
			requestInfo,
			selectedPetIds,
			selectedServiceIds,
		],
	);

	function calculateTotalPrice(
		petLength: number,
		serviceID: number,
		requestType: string = "monthly",
		days: Days = {},
	) {
		if (!services) return 0;

		const service = services.find((s) => s?.id === serviceID);
		if (!service) return 0;

		let totalSlots = 0;

		if (requestType === "weekly") {
			const dayKeys = Object.keys(days);
			dayKeys.forEach((dayKey, dayIndex) => {
				if (dayIndex > dayCount) return;
				const daySlots = dayRanges.get(dayIndex);
				if (!daySlots || daySlots.length === 0) return;

				const dateString = days[dayKey];
				if (!dateString) return;

				const startDate = new Date(dateString);
				const { jy, jm, jd } = jalaali.toJalaali(startDate);
				const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);

				let count = 0;
				for (let d = jd; d <= daysInMonth; d += 7) {
					count++;
				}
				totalSlots += daySlots.length * count;
			});
		} else {
			for (let i = 0; i <= dayCount; i++) {
				const slots = dayRanges.get(i);
				if (slots) {
					totalSlots += slots.length;
				}
			}
		}

		if (totalSlots === 0) return 0;
		return petLength * service.price * totalSlots;
	}

	function openDialogForDay(dayIndex: number) {
		setCurrentDay(dayIndex);
		setDialogOpen(true);
	}
	function closeDialog() {
		setDialogOpen(false);
	}
	function updateDayRanges(dayIndex: number, ranges: number[]) {
		setDayRanges((prev) => {
			const next = new Map(prev);
			next.set(dayIndex, ranges);
			return next;
		});
	}
	function splitRanges(ranges: number[] = []) {
		const range1: string[] = [];
		const range2: string[] = [];
		ranges.forEach((range) => {
			if (range % 2 === 0) {
				range2.push(range.toString());
			} else {
				range1.push(range.toString());
			}
		});
		return { range1, range2 };
	}

	function addDay() {
		setDayCount(dayCount + 1);
	}
function removeDay(setFieldValue?: (field: string, value: string) => void) {
	if (dayCount > 0) {
		const removedIndex = dayCount;
		setDayCount(dayCount - 1);
		setDayRanges((prev) => {
			const next = new Map(prev);
			next.delete(removedIndex);
			return next;
		});
		if (setFieldValue) {
			setFieldValue(`days.day${removedIndex}`, "");
		}
	}
}

	const isDesktop = useDesktop();
	const isMobile = useMobile();
	const navigate = useNavigate();

	function convertToCalenderSlots(
		days: Days,
		dayRanges: Map<number, number[]>,
		weekly: boolean = false,
	): CalenderSlot[] {
		const calenderSlots: CalenderSlot[] = [];
		const dayKeys = Object.keys(days);

		const processSlot = (dateString: string, slots: number[]) => {
			calenderSlots.push({ date: dateString, slots });
		};

		if (!weekly) {
			dayRanges.forEach((slots: number[], dayIndex: number) => {
				if (dayIndex > dayCount) return;
				const dayKey = dayKeys[dayIndex];
				if (!dayKey) {
					console.warn(
						`Warning: dayRanges key '${dayIndex}' does not correspond to a valid key in the 'days' object.`,
					);
					return;
				}
				processSlot(days[dayKey], slots);
			});
		} else {
			dayRanges.forEach((slots: number[], dayIndex: number) => {
				if (dayIndex > dayCount) return;
				const dayKey = dayKeys[dayIndex];
				if (!dayKey) return;

				const startDate = new Date(days[dayKey]);
				const { jy, jm, jd } = jalaali.toJalaali(startDate);
				const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);

				for (let d = jd; d <= daysInMonth; d += 7) {
					const { gy, gm, gd } = jalaali.toGregorian(jy, jm, d);
					const date = new Date(gy, gm - 1, gd);
					const dateString = toTehranISOString(date);
					processSlot(dateString, slots);
				}
			});
		}

		return calenderSlots;
	}
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
				const request = response.data;
				setRequestInfo(request);
				setIsChecked(false);
				const nextDayRanges = new Map<number, number[]>();
				const days: Days = {};
				request.calendarSlots?.forEach((slot, index) => {
					days[`day${index}`] = slot.date;
					nextDayRanges.set(index, slot.slots ?? []);
				});
				setInitialDays(days);
				setDayRanges(nextDayRanges);
				setDayCount(Math.max((request.calendarSlots?.length ?? 1) - 1, 0));
				const nextAddressFormValues = {
					Province: "",
					City: "",
					Address: request.address?.streetAddress ?? "",
					Vahed: request.address?.unit?.toString() ?? "",
					Pelak: request.address?.houseNumber?.toString() ?? "",
				};
				if (request.address?.provinceName) {
					try {
						const provinceResponse = await fetchProvincesService();
						const province = provinceResponse.data.find(
							(item) => item.name === request.address?.provinceName,
						);
						if (province) {
							nextAddressFormValues.Province = province.num.toString();
							const cityResponse = await fetchCitiesService(province.num);
							const city = cityResponse.data.find(
								(item) => item.name === request.address?.cityName,
							);
							if (city) {
								nextAddressFormValues.City = city.num.toString();
							}
						}
					} catch {
						// Keep address fields without province/city when lookup fails.
					}
				}
				setAddressFormValues(nextAddressFormValues);
				const createInfo = await getCreateRequestInfo({
					accessToken: accessToken!,
					petSitterUserID: request.petSitterUserID,
				});
				if (!isActive) return;
				setPets(createInfo.data.pets ?? []);
				setServices(createInfo.data.services ?? []);
				setAddresses(createInfo.data.addresses ?? []);
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
	useEffect(() => {
		if (!requestInfo || pets.length === 0) {
			return;
		}
		const requestPetNames = new Set(
			requestInfo.pets.map((pet) => pet.name.trim()),
		);
		const matchedIds = pets
			.filter((pet) => requestPetNames.has(pet.name.trim()))
			.map((pet) => pet.id.toString());
		setSelectedPetIds(matchedIds);
	}, [pets, requestInfo]);
	useEffect(() => {
		if (!requestInfo || services.length === 0) {
			return;
		}
		const requestServiceType = requestInfo.service?.type.trim() ?? "";
		const requestServiceDescription =
			requestInfo.service?.description?.trim() ?? "";
		const matchedService = services.find(
			(service) =>
				service.type.trim() === requestServiceType &&
				(service.description?.trim() ?? "") === requestServiceDescription,
		);
		setSelectedServiceIds(matchedService ? [matchedService.id.toString()] : []);
	}, [requestInfo, services]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spinner className="size-8" />
			</div>
		);
	}
	return (
		<div className="p-0 sm:p-4" dir={!isDesktop ? "rtl" : "ltr"}>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={async (values, { setErrors, setFieldError }) => {
					const day0Ranges = dayRanges.get(0) ?? [];
					if (dayRanges.get(0) === undefined) {
						updateDayRanges(0, []);
					}
					if (day0Ranges.length === 0) {
						return;
					}
					const needsPreviousAddress = addressIsChecked && !values.addressID;
					const needsNewAddress =
						!addressIsChecked &&
						(!values.Province ||
							!values.City ||
							!values.Address ||
							!values.Pelak ||
							!values.Vahed);
					if (needsPreviousAddress || needsNewAddress) {
						setFieldError(
							"addressSelection",
							addressIsChecked
								? "انتخاب آدرس قبلی الزامی است"
								: "تکمیل آدرس جدید الزامی است",
						);
						return;
					}
					setFieldError("addressSelection", "");
					try {
						const response = await editRequest({
							requestID: requestInfo?.requestID ?? Number(requestID),
							calendarSlots: convertToCalenderSlots(
								values.days,
								dayRanges,
								values.requestType === "weekly",
							),
							petIDs: values.petID.map((id) => parseInt(id)),
							notes: values.note,
							addressInfo: addressIsChecked
								? undefined
								: {
										provinceName: parseInt(values.Province),
										cityName: parseInt(values.City),
										streetAddress: values.Address,
										houseNumber: parseInt(values.Pelak),
										unit: parseInt(values.Vahed),
									},
							addressID: addressIsChecked
								? parseInt(values.addressID)
								: undefined,
							serviceID: parseInt(values.serviceID![0]),
							accessToken: accessToken!,
						});
						if (response.statusCode === 200) {
							const selectedServiceId = parseInt(values.serviceID[0]);
							const selectedService = services.find(
								(service) => service.id === selectedServiceId,
							);
							const calendarSlots = convertToCalenderSlots(
								values.days,
								dayRanges,
								values.requestType === "weekly",
							);
							const totalPrice = Math.round(
								1.1 *
									calculateTotalPrice(
										values.petID.length,
										selectedServiceId,
										values.requestType,
										values.days,
									),
							);
							const selectedAddress = addresses.find(
								(address) => address.id === values.addressID,
							);
							const addressText = addressIsChecked
								? selectedAddress
									? `${selectedAddress.provinceName}، ${selectedAddress.cityName}، ${selectedAddress.streetAddress}، پلاک ${selectedAddress.houseNumber}، واحد ${selectedAddress.unit}`
									: "-"
								: `${values.Province}، ${values.City}، ${values.Address}، پلاک ${values.Pelak}، واحد ${values.Vahed}`;
							const petSitterName = requestInfo
								? `${requestInfo.petSitterFirstName} ${requestInfo.petSitterLastName}`.trim()
								: "-";
							navigate("/Reserve-Success", {
								state: {
									petSitterName: petSitterName || "-",
									serviceType: selectedService?.type ?? "-",
									calendarSlots,
									addressText,
									totalPrice,
								},
							});
						}
					} catch (error: any) {
						if (error.response?.data?.messages) {
							setErrors(error.response.data.messages);
						}
					}
				}}
			>
				{({ values, errors, isSubmitting, setFieldValue }) => (
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
								{errors.serviceID && (
									<p className="text-red-500">{errors.serviceID}</p>
								)}
								<div className="w-full h-0.5 border-0 bg-black/40"></div>
								<div className="flex justify-start">
									<p className="w-auto pl-3 sm:w-30 lg:w-50 font-bold leading-10">
										پت ها
									</p>
									<PetToggleGroup
										name="petID"
										classes={{
											className: "gap-3 flex-1",
											toggleClassName: "py-5 px-3",
											textClassName: "text-xl",
										}}
										values={pets.map((pet) => pet.id.toString())}
										titles={pets.map((pet) => pet.name)}
									/>
								</div>
								{errors.petID && <p className="text-red-500">{errors.petID}</p>}
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
										{dayRanges.get(0) &&
											mergeRanges(dayRanges.get(0)!).map(
												({ start, end }, i) => (
													<div key={i} className="font-bold leading-10">
														{indexToTime(start - 1)} - {indexToTime(end)}
													</div>
												),
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
									{dayRanges.get(0) !== undefined &&
										dayRanges.get(0)?.length == 0 && (
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
												{dayRanges.get(index + 1) &&
													mergeRanges(dayRanges.get(index + 1)!).map(
														({ start, end }, i) => (
															<div key={i} className="font-bold leading-10">
																{indexToTime(start - 1)} - {indexToTime(end)}
															</div>
														),
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
										<Button
											type="button"
											onClick={() => removeDay(setFieldValue)}
											shadow
											className="bg-red-500"
										>
											حذف روز
											<CircleX />
										</Button>
									</div>
								)}
								<div className="flex justify-center">
									<Button
										type="button"
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
								<div className="flex flex-col sm:flex-row justify-between">
									{errors.calendarSlot && (
										<p className="text-red-500">{errors.calendarSlot}</p>
									)}
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
								<div className="flex flex-col sm:flex-row justify-between">
									{errors.addressSelection && (
										<p className="text-red-500">{errors.addressSelection}</p>
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
										<div className="text-gray-500">هزینه سرویس</div>
										<div>
											{calculateTotalPrice(
												values.petID.length,
												parseInt(values.serviceID[0]),
												values.requestType,
												values.days,
											)}{" "}
											تومن
										</div>
									</div>
									<div className="flex justify-between">
										<div className="text-gray-500">مالیات</div>
										<div>
											{0.1 *
												calculateTotalPrice(
													values.petID.length,
													parseInt(values.serviceID[0]),
													values.requestType,
													values.days,
												)}{" "}
											تومن
										</div>
									</div>
									<div className="w-full h-0.5 border-0 bg-black/40"></div>
									<div className="flex justify-between">
										<div className="font-bold">مبلغ نهایی</div>
										<div className="font-bold text-primary">
											{Math.round(
												1.1 *
													calculateTotalPrice(
														values.petID.length,
														parseInt(values.serviceID[0]),
														values.requestType,
														values.days,
													),
											)}{" "}
											تومن
										</div>
									</div>
									<div className="w-full h-0.5 border-0 bg-black/40"></div>
									<Button className="mx-5" isLoading={isSubmitting} shadow>
										ذخیره تغییرات
									</Button>
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
								<Button className="mx-5" isLoading={isSubmitting} shadow>
									ذخیره تغییرات
								</Button>
							</div>
						)}
					</Form>
				)}
			</Formik>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="flex flex-col items-center">
					<Formik
						enableReinitialize
						initialValues={{
							...splitRanges(dayRanges.get(currentDay)),
						}}
						onSubmit={(values) => {
							const allRanges = [values.range1, values.range2]
								.flat()
								.filter((range) => range !== undefined);
							updateDayRanges(
								currentDay,
								allRanges.map((r) => parseInt(r)),
							);
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
