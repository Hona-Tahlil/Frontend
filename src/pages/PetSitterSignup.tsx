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

	function goNext() {
		setAnimationDir(-1);
		setCurrentStage((prev) => prev + 1);
	}
	function goBack() {
		setAnimationDir(1);
		setCurrentStage((prev) => prev - 1);
	}
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-4xl font-bold">ثبت نام پتیار</p>
			<MultiStage
				className="w-full"
				currentStage={currentStage}
				setCurrentStage={setCurrentStage}
				animationDir={animationDir}
				setAnimationDir={setAnimationDir}
			>
				<MultiStage.Header className="w-19/20 max-w-300">
					<MultiStage.StageHeader index={0}>
						بررسی اطلاعات
					</MultiStage.StageHeader>
					<MultiStage.StageHeader index={1}>مدارک</MultiStage.StageHeader>
					<MultiStage.StageHeader index={2}>بیوگرافی</MultiStage.StageHeader>
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
												<img className="bg-gray-500 w-30 h-30 rounded-full" />
												<p>ویرایش عکس پروفایل</p>
											</div>
											<div className="flex flex-col gap-5 px-10">
												<div className="w-full flex gap-8">
													<InputHolderWrapper>
														<InputHolder name="nice" text="نام" />
														<SelectHolder name="nice" text="جنسیت" />
													</InputHolderWrapper>
													<InputHolderWrapper>
														<InputHolder name="nice" text="نام خانوادگی" />
														<DateHolder name="nice" text="تاریخ تولد" />
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
														<InputHolder name="nice" text="شماره تماس" />
													</InputHolderWrapper>
													<InputHolderWrapper>
														<InputHolder name="nice" text="ایمیل" />
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
												<InputHolder name="nice" text="نام" />
												<InputHolder name="nice" text="نام خانوادگی" />
												<SelectHolder name="nice" text="جنسیت" />
												<DateHolder name="nice" text="تاریخ تولد" />
												<div>
													<p className="text-lg font-bold">موقعیت مکانی</p>
												</div>
												<DoubleInputHolder />
												<InputHolder name="nice" text="پلاک" />
												<InputHolder name="nice" text="واحد" />
												<TextareaHolder text="آدرس" name="address" />
												<InputHolder name="nice" text="کد پستی" />
												<div>
													<p className="text-lg font-bold">اطلاعات تماس</p>
												</div>
												<InputHolder name="nice" text="شماره تماس" />
												<InputHolder name="nice" text="ایمیل" />
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
											className="h-30 drop-shadow-lg"
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
											<IconToggleButton name="walk" text="پیاده روی" />
											<IconToggleButton name="train" text="آموزش" />
											<IconToggleButton name="hold" text="نگهداری" />
											<IconToggleButton
												name="medical"
												text="مراقبت های پزشکی"
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
											<ToggleButton name="dog">
												<Dog></Dog>
												سگ ها
											</ToggleButton>
											<ToggleButton name="cat">
												<Cat></Cat>
												گربه ها
											</ToggleButton>
											<ToggleButton name="bird">
												<Bird></Bird>
												پرندگان
											</ToggleButton>
											<ToggleButton name="javandegan">
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
				<Input name={name} classes={{ className: "h-12" }} shadow />
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
				<DatePicker name={name} className="h-12" shadow />
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
				<Select name="akhoond">
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="">
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
				<Textarea className="h-30 drop-shadow-lg" name={name} />
			</div>
		</div>
	);
}

function DoubleInputHolder() {
	return (
		<div className="flex">
			<div className="w-0 sm:w-4/10 lg:w-3/10 flex items-center justify-center">
				<p className="text-lg"></p>
			</div>
			<div className="flex gap-5 lg:w-7/10 sm:w-6/10 w-full">
				<Select name="akhoond">
					<SelectTrigger className="w-full">
						<SelectValue placeholder="استان" />
					</SelectTrigger>
					<SelectContent className="">
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
				<Select name="akhoond">
					<SelectTrigger className="w-full">
						<SelectValue placeholder="شهر" />
					</SelectTrigger>
					<SelectContent className="">
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
		</div>
	);
}

function InputHolderWrapper({ children }: { children: ReactNode }) {
	return <div className="flex flex-col w-1/2 gap-5">{children}</div>;
}
