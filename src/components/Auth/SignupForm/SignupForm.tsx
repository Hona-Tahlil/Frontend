import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { Form, Formik } from "formik";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignupSchema from "@/schemas/SignupSchema";

export default function SignupForm() {
	const navigate = useNavigate();
	function navigateToLoginPage() {
		navigate("/login");
	}
	function openTermsAndServicesPage() {
		window.open("/terms", "_blank");
	}
	return (
		<div className="flex relative z-11 flex-col items-center justify-center min-h-screen text-center w-7/8 max-w-100 sm:w-100">
			<div className="h-fit bg-background sm:bg-transparent p-8 rounded-4xl w-full">
				<h1 className="text-5xl font-bold text-gray-800 font-[Alibaba]">
					ثبت نام
				</h1>
				<Formik
					{...SignupSchema}
					onSubmit={(values) => {
						console.log("Form values:", values);
					}}
				>
					{({ isSubmitting }) => (
						<Form className="mt-6 rounded flex flex-col gap-4 items-center w-full">
							<Input
								name="username"
								placeholder="نام کاربری"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<Input
								name="email"
								placeholder="ایمیل"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<Input
								name="password"
								placeholder="رمز عبور"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
								type="password"
							/>
							<Input
								name="repeatPassword"
								placeholder="تکرار رمز عبور"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
								type="password"
							/>
							<div className="flex mt-3 items-center justify-start" dir="rtl">
								<p className="break-words text-right text-[15px] sm:text-[16px]">
									<CircleAlert className="text-primary inline ml-1" />
									ثبت نام شما به معنای پذیرش
									<a
										onClick={openTermsAndServicesPage}
										className="text-primary hover:underline hover:decoration-1 hover:underline-offset-5 cursor-pointer active:text-primary-press active:underline"
									>
										{" "}
										قوانین و مقررات{" "}
									</a>
									این سایت است.
								</p>
							</div>

							<Button
								type="submit"
								size={"giant"}
								bold={true}
								isLoading={isSubmitting}
								className="font-[Alibaba] font-bold h-7 mt-4 px-5 py-6"
							>
								ثبت نام
							</Button>
						</Form>
					)}
				</Formik>

				<div className="flex gap-2 mt-3 items-center justify-center w-full">
					<Button
						onClick={navigateToLoginPage}
						variant={"link"}
						shadow={false}
						bold={true}
					>
						ورود به سایت
					</Button>
				</div>
			</div>
		</div>
	);
}
