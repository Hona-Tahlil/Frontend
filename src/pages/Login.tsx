import AuthBackground from "@/components/Auth/Background/AuthBackground";
import { Input } from "@/components/Custom/Input/Input";
import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";

import React from "react";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Form, Formik, type FormikHelpers, type FormikValues } from "formik";
import * as Yup from "yup";
import LoginForm from "@/components/Auth/LoginForm/LoginForm";




const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر نمی باشد")
    .required("ایمیل اجباری است"),
  password: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد")
    .required("رمز عبور اجباری است"),
});

export default function Login() {
  const isMobile = useMobile();
  return (
    <div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
      {/* Fixed SVGs */}
      <AuthBackground></AuthBackground>

      {/* Main content */}

      <LoginForm></LoginForm>
      
    </div>
  );
}
