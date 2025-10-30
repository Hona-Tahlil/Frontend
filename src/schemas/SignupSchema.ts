import * as Yup from "yup";

const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;

const validationSchema = Yup.object({
	name: Yup.string()
		.trim()
		.matches(nameRegex, "نام معتبر نیست")
		.min(2, "نام معتبر نیست.")
		.max(50, "نام معتبر نیست")
		.required("نام اجباری است"),
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
