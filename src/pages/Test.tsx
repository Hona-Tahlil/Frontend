import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import { useDesktop, useMobile, useTablet } from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Custom/Select/Select";
import { PetDatePicker } from "@/components/Custom/DatePicker/PetDatePicker";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
		.required("رمز عبور اجباری است"),
});

function Test() {
	const isDesktop = useDesktop();
	const isMobile = useMobile();
	const isTablet = useTablet();
	return (
		<div className="flex flex-col items-center">
			<Formik
				initialValues={{
					email: "",
					password: "",
					password2: "",
					love: false,
					akhoond: "",
				}}
				//validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log("Form values:", values);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="mt-6 border rounded flex flex-col gap-4 items-center w-200">
						<div className="mt-5 w-50">
							<Input
								name="email"
								shadow={true}
								classes={{
									className: "h-10",
									errorClassName: "px-5",
								}}
								type="email"
								placeholder="ایمیل"
							/>
						</div>
						<DatePicker />

						<div className="mt-5 w-50">
							<Input
								name="password"
								shadow={true}
								classes={{
									className: "h-10",
									errorClassName: "px-5",
								}}
								onChangeWrappers={[adjustInputDirection]}
								type="password"
								placeholder="ایمیل"
							/>
						</div>
						<PetDatePicker
							from={10}
							to={8}
							relative={true}
							name="niceone"
							smallFontSize="20px"
							bigFontSize="30px"
						/>

						<Checkbox
							name="love"
							classes={{ textClassName: "text-[17px]" }}
							text={"آقا عشق"}
						/>

						<Checkbox
							name="love2"
							classes={{ textClassName: "text-[17px]" }}
							text={"آقا عشق"}
						/>
						<Checkbox
							name="love3"
							classes={{
								className: "mt-5",
								backGroundClassName: "!border-5",
								textClassName: "text-[17px]",
							}}
							size="30px"
							text={"آقا عشق"}
						/>
						<Checkbox
							name="love4"
							classes={{
								className: "mt-5 bg-red-500",
								backGroundClassName: "!border-5",
								textClassName: "text-[17px] font-bold",
							}}
							size="15px"
							text={"آقا عشق"}
						/>

						<Select name="akhoond">
							<SelectTrigger className="w-45">
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

						<Button
							type="submit"
							size={"giant"}
							bold={true}
							isLoading={isSubmitting}
						>
							ورود
						</Button>
					</Form>
				)}
			</Formik>
			{isDesktop && <p> desktop mode</p>}
			{isMobile && <p> mobile mode</p>}
			{isTablet && <p> tablet mode</p>}

			<Button shadow={true} size={"giant"} bold={true}>
				ورود
			</Button>
			<br />
			<br />
			<Button isLoading={true} shadow={true} size={"giant"} bold={true}>
				ورود
			</Button>
			<br />
			<br />
			<Button
				isLoading={true}
				loadingClassName="!size-8"
				shadow={true}
				size={"giant"}
				bold={true}
			>
				ورود
			</Button>
			<br />
			<br />
			<br />
			<br />
			<Button variant={"link"} shadow={false} bold={true}>
				فراموشی رمز عبور
			</Button>
		</div>
	);
}

export default Test;
