import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.string().required("نام اجباری است"),
	email: Yup.string()
		.email("ایمیل معتبر نمی باشد")
		.required("ایمیل اجباری است"),
	password: Yup.string()
		.min(6, "پسورد باید حداقل 6 کاراکتر باشد")
		.required("رمز عبور اجباری است"),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref("password")], "رمز عبور مطابقت ندارد")
		.required("تکرار رمز عبور اجباری است"),
});

const initialValues = {
	name: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const SignupSchema = {
	initialValues,
	validationSchema,
};

export default SignupSchema;
