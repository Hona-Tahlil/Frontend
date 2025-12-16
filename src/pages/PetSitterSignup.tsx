import { Button } from "@/components/Custom/Button/Button";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Input } from "@/components/Custom/Input/Input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Custom/Select/Select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import IconToggleButton from "@/components/PetSitterSignup/IconToggleButton/IconToggleButton";
import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import ToggleButton from "@/components/PetSitterSignup/ToggleButton/ToggleButton";
import UploadDropZone from "@/components/PetSitterSignup/UploadDropZone/UploadDropZone";
import { useDesktop } from "@/hooks/ResponsiveHooks";
import {
	createPetSitterData,
	getDocuments,
	getPersonalInfo,
	getStatus,
	submitPersonalInfo,
	submitSkills,
	uploadDocuments,
} from "@/services/petSitterSignupService";
import useUserStore from "@/store/userStore/userStore";
import {
	GenderString,
	PetSitterStatus,
	StringToGender,
} from "@/types/petSitterSignupApiTypes";
import { iranProvincesFa } from "@/utils/provinces";
import { Form, Formik } from "formik";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchemas = [
	Yup.object({
		Email: Yup.string()
			.email("ایمیل معتبر نمی باشد")
			.required("ایمیل اجباری است"),
		FirstName: Yup.string()
			.min(5, "نام باید حداقل 5 کاراکتر باشد")
			.required("نام اجباری است"),
		LastName: Yup.string()
			.min(5, "نام باید حداقل 5 کاراکتر باشد")
			.required("نام اجباری است"),
		BirthDate: Yup.string().required("تاریخ تولد اجباری است"),
		PhoneNumber: Yup.string().required("شماره تماس اجباری است"),
		Address: Yup.string().required("آدرس اجباری است"),
		Vahed: Yup.string().required("واحد اجباری است"),
		Pelak: Yup.string().required("پلاک اجباری است"),
		Gender: Yup.string().required("پلاک اجباری است"),
		Province: Yup.string().required("پلاک اجباری است"),
		City: Yup.string().required("پلاک اجباری است"),
	}),
];

export const PetSitterSignup = () => {
	const isDesktop = useDesktop();
	const [animationDir, setAnimationDir] = useState(1);
	const [currentStage, setCurrentStage] = useState(0);
	const [completedStage, setCompletedStage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [editProfileOpen, setEditProfileOpen] = useState(false);
	const { accessToken } = useUserStore();
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const url = URL.createObjectURL(file); // preview URL
		setImageUrl(url);
		closeEditProfileDialog();
	}

	const defaultValues = {
		Email: "",
		FirstName: "",
		LastName: "",
		Gender: "",
		BirthDate: "",
		PhoneNumber: "",
		Address: "",
		Pelak: "",
		Vahed: "",
		PostalCode: "",
		City: "",
		Province: "",
		Files: [] as File[],
		ExistingFiles: [] as string[],
		CertificateFiles: [] as File[],
		ExistingCertificateFiles: [] as string[],
		Bio: "",
		Dog: false,
		Cat: false,
		Bird: false,
		Rabbit: false,
		Walking: false,
		Watching: false,
		Traning: false,
		Medical: false,
	};

	const [initialValues, setInitialValues] = useState(defaultValues);

	function openEditProfileDialog() {
		setEditProfileOpen(true);
	}
	function closeEditProfileDialog() {
		setEditProfileOpen(false);
	}

	async function setInitialFormValues(stage: PetSitterStatus) {
		const res = await getPersonalInfo({ accessToken: accessToken! });
		setInitialValues({
			...initialValues,
			Email: res.Email || "",
			FirstName: res.FirstName || "",
			LastName: res.LastName || "",
			Gender: GenderString[res.Gender],
			BirthDate: res.BirthDate || "",
			PhoneNumber: res.PhoneNumber || "",
			Address: res.Address || "",
			Pelak: res.Pelak || "",
			Vahed: res.Vahed || "",
			PostalCode: res.PostalCode || "",
		});
		if (stage === PetSitterStatus.Review) {
			setCurrentFormikStage(stage);
			return;
		}
		const res2 = await getDocuments({ accessToken: accessToken! });
		setInitialValues({
			...initialValues,
			ExistingFiles: res2.File || [],
			ExistingCertificateFiles: res2.CertificateFile || [],
		});
		setCurrentFormikStage(stage);
	}
	async function setCurrentFormikStage(stage: PetSitterStatus) {
		if (stage == PetSitterStatus.Review) {
			setIsLoading(false);
			setCurrentStage(0);
			setCompletedStage(0);
		} else if (stage == PetSitterStatus.Documents) {
			setIsLoading(false);
			setCurrentStage(1);
			setCompletedStage(1);
		} else if (stage == PetSitterStatus.Skills) {
			setIsLoading(false);
			setCurrentStage(2);
			setCompletedStage(2);
		} else {
			navigate("/complete");
		}
	}
	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
			return;
		}
		getStatus({ accessToken })
			.then((res) => {
				setInitialFormValues(res.Status);
			})
			.catch((error) => {
				if (error.status === 500) {
					createPetSitterData({ accessToken: accessToken! }).then(() => {
						getStatus({ accessToken }).then((res) => {
							setInitialFormValues(res.Status);
						});
					});
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentStage]);

	function goNext() {
		setAnimationDir(-1);
		if (currentStage + 1 > completedStage) {
			setCompletedStage(completedStage + 1);
		}
		setCurrentStage((prev) => prev + 1);
	}
	function goBack() {
		setAnimationDir(1);
		setCurrentStage((prev) => prev - 1);
	}
	return (
		<>
			<div className="flex flex-col items-center gap-4 mt-20 mb-20">
				<p className="text-4xl font-bold">ثبت نام پتیار</p>
				<MultiStage
					className="w-full"
					currentStage={currentStage}
					setCurrentStage={setCurrentStage}
					animationDir={animationDir}
					setAnimationDir={setAnimationDir}
				>
					<MultiStage.Header className="w-19/20 max-w-300">
						<MultiStage.StageHeader
							clickable={completedStage > 0}
							complete={completedStage > 0}
							index={0}
						>
							بررسی اطلاعات
						</MultiStage.StageHeader>
						<MultiStage.StageHeader
							clickable={completedStage > 1}
							complete={completedStage > 1}
							index={1}
						>
							مدارک
						</MultiStage.StageHeader>
						<MultiStage.StageHeader
							clickable={completedStage > 2}
							complete={completedStage > 2}
							index={2}
						>
							بیوگرافی
						</MultiStage.StageHeader>
					</MultiStage.Header>

					<Formik
						enableReinitialize
						initialValues={initialValues}
						validationSchema={validationSchemas[currentStage]}
						onSubmit={(values, { setSubmitting }) => {
							console.log("Form values:", values);
							if (currentStage === 0) {
								submitPersonalInfo({
									FirstName: values.FirstName,
									LastName: values.LastName,
									Email: values.Email,
									Gender: StringToGender[values.Gender],
									BirthDate: values.BirthDate,
									PhoneNumber: values.PhoneNumber,
									Province: values.Province,
									City: values.City,
									Address: values.Address,
									Pelak: values.Pelak,
									Vahed: values.Vahed,
									PostalCode: values.PostalCode,
									accessToken: accessToken!,
								})
									.then(() => {
										setSubmitting(false);
										goNext();
									})
									.catch((error) => {
										setSubmitting(false);
									})
									.finally(() => {
										setSubmitting(false);
										goNext();
									});
							} else if (currentStage === 1) {
								uploadDocuments({
									CertificateFile: values.CertificateFiles,
									File: values.Files,
									accessToken: accessToken!,
								})
									.then(() => {
										setSubmitting(false);
										goNext();
									})
									.catch((error) => {
										setSubmitting(false);
									})
									.finally(() => {
										setSubmitting(false);
										goNext();
									});
							} else if (currentStage === 2) {
								const petKinds = [
									values.Dog ? 1 : null,
									values.Cat ? 2 : null,
									values.Bird ? 4 : null,
									values.Rabbit ? 3 : null,
								].filter(Boolean) as number[];
								const services = [
									values.Walking ? 1 : null,
									values.Watching ? 2 : null,
								].filter(Boolean) as number[];
								submitSkills({
									Bio: values.Bio,
									Petkinds: petKinds,
									Services: services,
									accessToken: accessToken!,
								})
									.then(() => {
										setSubmitting(false);
										goNext();
									})
									.catch((error) => {
										setSubmitting(false);
									})
									.finally(() => {
										setSubmitting(false);
										goNext();
									});
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full flex items-center justify-center">
								<MultiStage.StageHolder className="w-19/20 max-w-300">
									<MultiStage.Stage
										className="w-full h-auto flex flex-col py-10 px-5 sm:px-15 xl:px-35 gap-10"
										index={0}
									>
										{isDesktop && (
											<>
												<div>
													<p className="text-2xl font-bold">بازیبینی اطلاعات</p>
												</div>
												<div className="flex items-center gap-10 px-10">
													<img
														src={imageUrl ? imageUrl : ""}
														className="bg-gray-500/30 w-30 h-30 rounded-full"
													/>
													<p onClick={openEditProfileDialog}>
														ویرایش عکس پروفایل
													</p>
												</div>
												<div className="flex flex-col gap-5 px-10">
													<div className="w-full flex gap-8">
														<InputHolderWrapper>
															<InputHolder name="FirstName" text="نام" />
															<SelectHolder name="Gender" text="جنسیت" />
														</InputHolderWrapper>
														<InputHolderWrapper>
															<InputHolder
																name="LastName"
																text="نام خانوادگی"
															/>
															<DateHolder name="BirthDate" text="تاریخ تولد" />
														</InputHolderWrapper>
													</div>
													<div>
														<p className="text-lg font-bold">موقعیت مکانی</p>
													</div>
													<div className="w-full flex gap-8">
														<InputHolderWrapper>
															<DoubleInputHolder />
															<InputHolder name="Pelak" text="پلاک" />
															<InputHolder name="Vahed" text="واحد" />
														</InputHolderWrapper>
														<InputHolderWrapper>
															<TextareaHolder text="آدرس" name="Address" />
															<InputHolder name="PostalCode" text="کد پستی" />
														</InputHolderWrapper>
													</div>
													<div>
														<p className="text-lg font-bold">اطلاعات تماس</p>
													</div>
													<div className="w-full flex gap-8">
														<InputHolderWrapper>
															<InputHolder
																name="PhoneNumber"
																text="شماره تماس"
															/>
														</InputHolderWrapper>
														<InputHolderWrapper>
															<InputHolder name="Email" text="ایمیل" />
														</InputHolderWrapper>
													</div>
													<div className="flex w-full justify-end">
														<Button
															isLoading={isSubmitting}
															shadow={false}
															className="ml-10 mt-20"
															type="submit"
														>
															برو مرحله بعد
														</Button>
													</div>
												</div>
											</>
										)}
										{!isDesktop && (
											<>
												<div>
													<p className="text-2xl font-bold">بازیبینی اطلاعات</p>
												</div>
												<div className="flex items-center gap-3 sm:gap-10 px-3 sm:px-10">
													<img className="bg-gray-500 w-30 h-30 rounded-full" />
													<p>ویرایش عکس پروفایل</p>
												</div>
												<div className="flex flex-col gap-5 px-3 sm:px-10">
													<InputHolder name="FirstName" text="نام" />
													<InputHolder name="LastName" text="نام خانوادگی" />
													<SelectHolder name="Gender" text="جنسیت" />
													<DateHolder name="BirthDate" text="تاریخ تولد" />
													<div>
														<p className="text-lg font-bold">موقعیت مکانی</p>
													</div>
													<DoubleInputHolder />
													<InputHolder name="Pelak" text="پلاک" />
													<InputHolder name="Vahed" text="واحد" />
													<TextareaHolder text="آدرس" name="Address" />
													<InputHolder name="Postalcode" text="کد پستی" />
													<div>
														<p className="text-lg font-bold">اطلاعات تماس</p>
													</div>
													<InputHolder name="Phone" text="شماره تماس" />
													<InputHolder name="Email" text="ایمیل" />
													<div className="flex w-full justify-end">
														<Button
															isLoading={isSubmitting}
															type="submit"
															shadow={false}
															className="ml-10 mt-20"
														>
															برو مرحله بعد
														</Button>
													</div>
												</div>
											</>
										)}
									</MultiStage.Stage>

									<MultiStage.Stage
										index={1}
										className="w-full h-auto flex flex-col py-10 px-5 sm:px-15 xl:px-35 gap-10"
									>
										<div>
											<p className="text-2xl font-bold">مدارک شناسایی</p>
										</div>
										<div>
											<div className="flex items-center gap-3">
												<div className="w-full flex flex-col">
													<UploadDropZone name="File" />
												</div>
											</div>
										</div>
										<div>
											<p className="text-2xl font-bold">
												مدارک حوزه پت(اختیاری)
											</p>
										</div>
										<div>
											<div className="flex items-center gap-3">
												<div className="w-full flex flex-col">
													<UploadDropZone name="CertificateFile" />
												</div>
											</div>
										</div>
										<div className="flex w-full justify-between">
											<Button
												onClick={goBack}
												shadow={false}
												variant={"outline"}
												className="mr-10 mt-20 border border-black/20 shadow-none text-black"
											>
												برگشت
											</Button>
											<Button
												type="submit"
												shadow={false}
												className="ml-10 mt-20"
											>
												برو مرحله بعد
											</Button>
										</div>
									</MultiStage.Stage>
									<MultiStage.Stage
										index={2}
										className="w-full h-auto flex flex-col py-10 px-5 sm:px-15 xl:px-35 gap-10"
									>
										<div>
											<p className="text-2xl font-bold">
												بیگورافی / معرفی مختصر (حداقل 20 کاراکتر)
											</p>
										</div>
										<div className="flex flex-col items-center gap-3"></div>

										<div className="w-full">
											<Textarea
												classes={{
													className: "h-30 drop-shadow-lg border-black/20",
												}}
												name="Bio"
											/>
										</div>
										<div>
											<p className="text-2xl font-bold">
												مهارت ها/ خدماتی که ارائه می دهید
											</p>
										</div>
										<div>
											<div className="flex flex-wrap items-center gap-4 sm:gap-1 lg:gap-4">
												<IconToggleButton
													name="Walking"
													text="پیاده روی"
													className="border-1 border-gray-400/50"
												/>
												<IconToggleButton
													name="Training"
													text="آموزش"
													className="border-1 border-gray-400/50"
												/>
												<IconToggleButton
													name="Watching"
													text="نگهداری"
													className="border-1 border-gray-400/50"
												/>
												<IconToggleButton
													name="Medical"
													text="مراقبت های پزشکی"
													className="border-1 border-gray-400/50"
												/>
											</div>
										</div>
										<div>
											<p className="text-2xl font-bold">
												حیواناتی که ارائه خدمات دارید
											</p>
										</div>
										<div>
											<div className="flex flex-wrap items-start sm:items-center gap-4 sm:gap-1 lg:gap-4">
												<ToggleButton
													className="border-1 border-gray-400/50"
													name="Dog"
												>
													<Dog></Dog>
													سگ ها
												</ToggleButton>
												<ToggleButton
													name="Cat"
													className="border-1 border-gray-400/50"
												>
													<Cat></Cat>
													گربه ها
												</ToggleButton>
												<ToggleButton
													name="Bird"
													className="border-1 border-gray-400/50"
												>
													<Bird></Bird>
													پرندگان
												</ToggleButton>
												<ToggleButton
													name="Rabbit"
													className="border-1 border-gray-400/50"
												>
													<Rabbit></Rabbit>
													جوندگان
												</ToggleButton>
											</div>
										</div>
										<div className="flex w-full justify-between">
											<Button
												onClick={goBack}
												shadow={false}
												variant={"outline"}
												className="mr-10 mt-20 border border-black/20 shadow-none trext-black"
											>
												برگشت
											</Button>
											<Button
												type="submit"
												shadow={false}
												className="ml-10 mt-20"
											>
												برو مرحله بعد
											</Button>
										</div>
									</MultiStage.Stage>
								</MultiStage.StageHolder>
							</Form>
						)}
					</Formik>
				</MultiStage>
			</div>
			<Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
				<DialogContent className="flex flex-col gap-4 items-center">
					<p className="text-xl">انتخاب عکس پروفایل</p>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
					<Button
						onClick={() => {
							fileInputRef.current?.click(); // ← opens file picker
						}}
					>
						تغییر
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
};
function InputHolder({ text, name }: { text: string; name: string }) {
	return (
		<div className="flex">
			<div className="w-4/10 lg:w-3/10 flex items-center justify-center">
				<p className="text-lg">{text}</p>
			</div>
			<div className="w-6/10 lg:w-7/10">
				<Input
					name={name}
					classes={{
						className: "h-12",
						inputClassName: "border-1 border-gray-400/20",
					}}
					shadow
				/>
			</div>
		</div>
	);
}
function DateHolder({ text, name }: { text: string; name: string }) {
	return (
		<div className="flex">
			<div className="w-4/10 lg:w-3/10 flex items-center justify-center">
				<p className="text-lg">{text}</p>
			</div>
			<div className="w-6/10 lg:w-7/10">
				<DatePicker
					name={name}
					className="h-12 border-1 border-gray-400/20"
					shadow
				/>
			</div>
		</div>
	);
}
function SelectHolder({ text, name }: { text: string; name: string }) {
	return (
		<div className="flex">
			<div className="w-4/10 lg:w-3/10 flex items-center justify-center">
				<p className="text-lg">{text}</p>
			</div>
			<div className="w-6/10 lg:w-7/10">
				<Select name={name}>
					<SelectTrigger className="w-full border-1 border-gray-400/20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="">
						<SelectGroup>
							<SelectItem value={"Male"}>مرد</SelectItem>
							<SelectItem value={"Female"}>زن</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

function TextareaHolder({ text, name }: { text: string; name: string }) {
	return (
		<div className="flex">
			<div className="w-4/10 lg:w-3/10 flex items-start justify-center">
				<p className="text-lg mt-3">{text}</p>
			</div>
			<div className="w-6/10 lg:w-7/10">
				<Textarea
					classes={{
						inputClassName: "h-30 drop-shadow-lg border-1 border-gray-400/20",
					}}
					name={name}
				/>
			</div>
		</div>
	);
}

function DoubleInputHolder() {
	const [province, setProvince] = useState("");
	return (
		<div className="flex">
			<div className="w-0 sm:w-4/10 lg:w-3/10 flex items-center justify-center">
				<p className="text-lg"></p>
			</div>
			<div className="flex justify-between lg:w-7/10 sm:w-6/10 w-full">
				<div className="w-19/40">
					<Select name="Province" onValueChange={setProvince}>
						<SelectTrigger className="w-full border-1 border-gray-400/20">
							<SelectValue
								placeholder="استان"
								style={{ fontSize: 15 - province.length / 3 }}
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Array.from(Object.keys(iranProvincesFa)).map((province) => {
									return (
										<SelectItem
											style={{ fontSize: 15 - province.length / 3 }}
											value={province}
										>
											{province}
										</SelectItem>
									);
								})}
								<SelectItem className="text-sm" value="asdf">
									بهترین ها
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="w-19/40">
					<Select name="City">
						<SelectTrigger className="w-full border-1 border-gray-400/20">
							<SelectValue placeholder="شهر" />
						</SelectTrigger>
						<SelectContent className="">
							<SelectGroup>
								{province &&
									Array.from(iranProvincesFa[province]).map((province) => {
										return (
											<SelectItem
												className="text-[8px]"
												style={{ fontSize: 15 - province.length / 3 }}
												value={province}
											>
												{province}
											</SelectItem>
										);
									})}
								<SelectItem className="text-[8px]" value={"nothing"}>
									استان را انتخاب کنید
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}

function InputHolderWrapper({ children }: { children: ReactNode }) {
	return <div className="flex flex-col w-1/2 gap-5">{children}</div>;
}
