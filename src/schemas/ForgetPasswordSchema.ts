import * as Yup from "yup";

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل نامعتبر است")
    .required("ایمیل الزامی است"),
});

export default ForgetPasswordSchema;
