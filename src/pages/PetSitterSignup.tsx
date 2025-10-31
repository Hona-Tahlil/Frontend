import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import { Form, Formik } from "formik";
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
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-4xl font-bold">ثبت نام پتیار</p>
			<MultiStage className="w-7/8">
				<MultiStage.Header>
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
						<Form className="w-full">
							<MultiStage.StageHolder className="h-150">
								<MultiStage.Stage
									className="w-9/10 h-auto flex p-8 gap-10"
									index={0}
								>
									<div className="flex flex-col gap-6">
										<p className="text-2xl font-bold">بازبینی اطلاعات</p>
										<div className="flex flex-col">
											<p className="text-gray-500">نام و نام خانوادگی</p>
											<Input
												name="name"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>
										<div className="flex flex-col">
											<p className="text-gray-500">ایمیل</p>
											<Input
												name="email"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>

										<div className="flex flex-col">
											<p className="text-gray-500">آدرس</p>
											<Input
												name="address"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>
										<Button
											type="submit"
											bold={true}
											variant={"outline"}
											shadow={false}
											isLoading={isSubmitting}
											className="mt-30 w-30 p-2 h-8 border border-[#E5E7EB] shadow-none text-black mr-15"
										>
											بازگشت
										</Button>
									</div>
									<div className="flex flex-col gap-6">
										<p className="text-2xl font-bold opacity-0">
											بازبینی اطلاعات
										</p>
										<div className="flex flex-col">
											<p className="text-gray-500">جنسیت</p>
											<Input
												name="name"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>
										<div className="flex flex-col">
											<p className="text-gray-500">تاریخ تولد</p>
											<Input
												name="email"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>

										<div className="flex flex-col">
											<p className="text-gray-500">شماره تماس</p>
											<Input
												name="address"
												classes={{
													className: "h-10 w-full m-0",
													inputClassName: "border-0 bg-[#F9FAFB] shadow-none",
												}}
												shadow={false}
											/>
										</div>
										<div className="flex flex-col items-end">
											<Button
												type="submit"
												bold={true}
												shadow={false}
												isLoading={isSubmitting}
												className="mt-30 w-30 p-2 h-8 border shadow-none relative ml-15"
											>
												بعدی
											</Button>
										</div>
									</div>
								</MultiStage.Stage>

								<MultiStage.Stage index={1}>
									<p>Profile form goes here</p>
								</MultiStage.Stage>
							</MultiStage.StageHolder>
						</Form>
					)}
				</Formik>
			</MultiStage>
		</div>
	);
};
