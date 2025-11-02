import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import { Form, Formik } from "formik";
import type { ReactNode } from "react";
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
			<MultiStage className="w-full">
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
						<Form className="w-full flex items-center justify-center">
							<MultiStage.StageHolder className="w-19/20 max-w-300">
								<MultiStage.Stage
									className="w-full h-auto flex flex-col py-10 px-35 gap-10"
									index={0}
								>
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
												<InputHolder name="nice" text="نام خانوادگی" />
											</InputHolderWrapper>
											<InputHolderWrapper>
												<InputHolder name="nice" text="جنسیت" />
												<InputHolder name="nice" text="تاریخ تولد" />
											</InputHolderWrapper>
										</div>
										<div>
											<p className="text-lg font-bold">موقعیت مکانی</p>
										</div>
										<div className="w-full flex gap-8">
											<InputHolderWrapper>
												<InputHolder name="nice" text="نام" />
												<InputHolder name="nice" text="نام خانوادگی" />
												<InputHolder name="nice" text="نام خانوادگی" />
											</InputHolderWrapper>
											<InputHolderWrapper>
												<InputHolder name="nice" text="جنسیت" />
												<InputHolder name="nice" text="تاریخ تولد" />
												<InputHolder name="nice" text="تاریخ تولد" />
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
										<div>
											<p className="text-lg font-bold">اطلاعات تماس</p>
										</div>
										<div>
											<p className="text-lg font-bold">اطلاعات تماس</p>
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
function InputHolder({ text, name }: { text: string; name: string }) {
	return (
		<div className="flex">
			<div className="w-3/10 flex items-center justify-center">
				<p className="text-lg">{text}</p>
			</div>
			<div className="w-7/10">
				<Input name={name} classes={{ className: "h-12" }} shadow />
			</div>
		</div>
	);
}

function InputHolderWrapper({ children }: { children: ReactNode }) {
	return <div className="flex flex-col w-1/2 gap-5">{children}</div>;
}
