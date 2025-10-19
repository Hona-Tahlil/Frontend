import * as Yup from "yup";

const validationSchema = Yup.object({
	username: Yup.string()
		.min(5, "پسورد باید حداقل 5 کاراکتر باشد")
		.required("نام کاربری اجباری است"),
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
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const LoginSchema = {
	initialValues,
	validationSchema,
};

export default LoginSchema;
