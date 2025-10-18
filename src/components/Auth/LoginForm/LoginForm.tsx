import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد")
		.required("رمز عبور اجباری است"),
});

const initialValues = {
	email: "",
	password: "",
	rememberMe: false,
};

export default function LoginForm() {
	const navigate = useNavigate();
	function navigateToSignupPage() {
		navigate("/signup");
	}
	return (
		<div className="flex relative z-11 flex-col items-center justify-center min-h-screen text-center w-7/8 max-w-100 sm:w-100">
			<div className="h-fit bg-background sm:bg-transparent p-8 rounded-4xl w-full">
				<h1 className="text-5xl font-bold text-gray-800 font-[Alibaba]">
					ورود
				</h1>
				<p className="text-sm text-gray-600 mt-3 font-[Alibaba]">!خوش آمدید</p>
				<p className="text-sm text-gray-600 font-[Alibaba]">
					لطفا به حساب کاربری خود وارد شوید
				</p>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						console.log("Form values:", values);
					}}
				>
					{({ isSubmitting }) => (
						<Form className="mt-6 rounded flex flex-col gap-4 items-center">
							<Input
								name="email"
								placeholder="ایمیل"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<Input
								type="password"
								name="password"
								placeholder="رمز عبور"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<div className="w-full flex justify-end ">
								<Checkbox
									name="remeberMe"
									classes={{
										className: "mt-2",
										textClassName: "text-xs font-[Alibaba]",
									}}
									text="مرا بخاطر بسپار"
									size="20px"
								/>
							</div>

							<Button
								type="submit"
								size={"giant"}
								bold={true}
								isLoading={isSubmitting}
								className="font-[Alibaba] font-bold h-7 mt-4 px-5 py-6"
							>
								ورود
							</Button>
						</Form>
					)}
				</Formik>

				<div className="flex gap-2 mt-3 items-center justify-center">
					<Button
						onClick={navigateToSignupPage}
						variant={"link"}
						shadow={false}
						bold={true}
					>
						ثبت نام در سایت
					</Button>
					<div className="h-6 bg-primary w-1 rounded-xs z-12"></div>
					<Button variant={"link"} shadow={false} bold={true}>
						بازیابی رمز عبور
					</Button>
				</div>
			</div>
		</div>
	);
}
