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
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import IconToggleButton from "@/components/PetSitterSignup/IconToggleButton/IconToggleButton";
import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import ToggleButton from "@/components/PetSitterSignup/ToggleButton/ToggleButton";
import UploadDropZone from "@/components/PetSitterSignup/UploadDropZone/UploadDropZone";
import { useDesktop, useTabletMobile } from "@/hooks/ResponsiveHooks";
import { iranProvincesFa } from "@/utils/provinces";
import { Form, Formik } from "formik";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";
import { useState, type ReactNode } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
		.required("رمز عبور اجباری است"),
});

export const PetSitterSignup = () => {
	const isDesktop = useDesktop();
	const [animationDir, setAnimationDir] = useState(1);
	const [currentStage, setCurrentStage] = useState(0);
	const [completedStage, setCompletedStage] = useState(0);

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
					<MultiStage.StageHeader complete={completedStage > 0} index={0}>
						بررسی اطلاعات
					</MultiStage.StageHeader>
					<MultiStage.StageHeader complete={completedStage > 1} index={1}>
						مدارک
					</MultiStage.StageHeader>
					<MultiStage.StageHeader complete={completedStage > 2} index={2}>
						بیوگرافی
					</MultiStage.StageHeader>
				</MultiStage.Header>

				<Formik
					initialValues={{ email: "", password: "niceone", love: false }}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log("Form values:", values);
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
												<img className="bg-gray-500/30 w-30 h-30 rounded-full" />
												<p>ویرایش عکس پروفایل</p>
											</div>
											<div className="flex flex-col gap-5 px-10">
												<div className="w-full flex gap-8">
													<InputHolderWrapper>
														<InputHolder name="firstname" text="نام" />
														<SelectHolder name="gender" text="جنسیت" />
													</InputHolderWrapper>
													<InputHolderWrapper>
														<InputHolder name="lastname" text="نام خانوادگی" />
														<DateHolder name="birthdate" text="تاریخ تولد" />
													</InputHolderWrapper>
												</div>
												<div>
													<p className="text-lg font-bold">موقعیت مکانی</p>
												</div>
												<div className="w-full flex gap-8">
													<InputHolderWrapper>
														<DoubleInputHolder />
														<InputHolder name="nice" text="پلاک" />
														<InputHolder name="nice" text="واحد" />
													</InputHolderWrapper>
													<InputHolderWrapper>
														<TextareaHolder text="آدرس" name="address" />
														<InputHolder name="nice" text="کد پستی" />
													</InputHolderWrapper>
												</div>
												<div>
													<p className="text-lg font-bold">اطلاعات تماس</p>
												</div>
												<div className="w-full flex gap-8">
													<InputHolderWrapper>
														<InputHolder name="phone" text="شماره تماس" />
													</InputHolderWrapper>
													<InputHolderWrapper>
														<InputHolder name="email" text="ایمیل" />
													</InputHolderWrapper>
												</div>
												<div className="flex w-full justify-end">
													<Button
														onClick={goNext}
														shadow={false}
														className="ml-10 mt-20"
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
												<InputHolder name="firstname" text="نام" />
												<InputHolder name="lastname" text="نام خانوادگی" />
												<SelectHolder name="gender" text="جنسیت" />
												<DateHolder name="birthdate" text="تاریخ تولد" />
												<div>
													<p className="text-lg font-bold">موقعیت مکانی</p>
												</div>
												<DoubleInputHolder />
												<InputHolder name="pelak" text="پلاک" />
												<InputHolder name="vahed" text="واحد" />
												<TextareaHolder text="آدرس" name="address" />
												<InputHolder name="postalcode" text="کد پستی" />
												<div>
													<p className="text-lg font-bold">اطلاعات تماس</p>
												</div>
												<InputHolder name="phone" text="شماره تماس" />
												<InputHolder name="email" text="ایمیل" />
												<div className="flex w-full justify-end">
													<Button
														onClick={goNext}
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
									<div className="flex flex-col sm:flex-row items-center gap-3">
										<div className="w-full sm:w-1/2 flex flex-col">
											<p className="px-5 font-bold">شناسنامه</p>
											<UploadDropZone />
										</div>
										<div className="w-full sm:w-1/2 flex flex-col">
											<p className="px-5 font-bold">کارت ملی</p>
											<UploadDropZone />
										</div>
									</div>
									<div>
										<p className="text-2xl font-bold">مدارک حوزه پت(اختیاری)</p>
									</div>
									<div>
										<div className="flex items-center gap-3">
											<div className="w-full flex flex-col">
												<UploadDropZone />
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
											onClick={goNext}
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
											className="h-30 drop-shadow-lg border-black/20"
											name="biography"
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
												name="walk"
												text="پیاده روی"
												className="border-1 border-gray-400/50"
											/>
											<IconToggleButton
												name="train"
												text="آموزش"
												className="border-1 border-gray-400/50"
											/>
											<IconToggleButton
												name="hold"
												text="نگهداری"
												className="border-1 border-gray-400/50"
											/>
											<IconToggleButton
												name="medical"
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
												name="dog"
											>
												<Dog></Dog>
												سگ ها
											</ToggleButton>
											<ToggleButton
												name="cat"
												className="border-1 border-gray-400/50"
											>
												<Cat></Cat>
												گربه ها
											</ToggleButton>
											<ToggleButton
												name="bird"
												className="border-1 border-gray-400/50"
											>
												<Bird></Bird>
												پرندگان
											</ToggleButton>
											<ToggleButton
												name="javandegan"
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
											onClick={goNext}
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
							<SelectItem value={"male"}>مرد</SelectItem>
							<SelectItem value={"female"}>زن</SelectItem>
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
					className="h-30 drop-shadow-lg border-1 border-gray-400/20"
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
					<Select name="province" onValueChange={setProvince}>
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
					<Select name="city">
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
