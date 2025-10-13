import AuthBackground from "@/components/Auth/Background/AuthBackground";
import { Input } from "@/components/Custom/Input/Input";
import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";

import React from "react";

export default function Login() {
  return (
    <div className="relative w-screen h-screen bg-background overflow-hidden justify-center  flex">
      {/* Fixed SVGs */}
      <AuthBackground></AuthBackground>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center w-fit">
        <h1 className="text-5xl font-bold text-gray-800 font-[Alibaba]">
          ورود
        </h1>
        <p className="text-sm text-gray-600 mt-3 font-[Alibaba]">!خوش آمدید</p>
        <p className="text-sm text-gray-600 font-[Alibaba]">
          لطفا به حساب کاربری خود وارد شوید
        </p>

        <Input
          placeholder="ایمیل"
          className="h-10 mt-5 w-full"
          shadow={true}
        ></Input>
        <Input
          placeholder="رمز عبور"
          className="h-10 mt-3"
          shadow={true}
        ></Input>
        <div className="w-full flex justify-end ">
          <Checkbox className="mt-5" text="مرا بخاطر بسپار"></Checkbox>
        </div>

        <Button
          className="font-[Alibaba] font-bold h-7 mt-4 px-5 py-6"
          size="giant"
        >
          ورود
        </Button>

        <div className="flex gap-4 mt-3 items-center">
          <Button variant={"link"} shadow={false} bold={true}>
            فراموشی رمز عبور
          </Button>
          <div className="h-[60%] bg-primary w-1 rounded-xs">
          </div>
          <Button variant={"link"} shadow={false} bold={true}>
            ثبت نام در سایت
          </Button>
        </div>
      </div>
    </div>
  );
}
