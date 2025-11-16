import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { NonFormikInput } from "@/components/Custom/Input/NonFormikInput";
import Stepper, { Step } from "@/components/Custom/PetRegister/PetMultiStage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Custom/Select/Select";
import { Avatar } from "@/components/ui/avatar";
import { Form, Formik, type FormikHelpers, type FormikValues } from "formik";
import { Redo2 } from "lucide-react";
import React, { useEffect } from "react";

export default function RegisterPetMobile() {
  useEffect(() => {
    const htmlPrev = document.documentElement.style.overflow;
    const bodyPrev = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlPrev;
      document.body.style.overflow = bodyPrev;
    };
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div
        className="relative flex flex-col items-center w-full pb-6 "
      >
        <div className="p-2 absolute top-6 right-4 text-lg font-semibold flex items-center gap-2 text-gray-800">
          <span>
            <Redo2 />
          </span>
        </div>
        <div className="bg-white aspect-square rounded-full w-[200%] mt-[35%] flex-col flex  items-center drop-shadow-2xl">
          <Formik
            initialValues={{
              akhoond: "2",
            }}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="">
                <Stepper
                  initialStep={1}
                  onStepChange={(step) => {
                    console.log(step);
                  }}
                  onFinalStepCompleted={() =>
                    console.log("All steps completed!")
                  }
                  backButtonText="مرحله قبل"
                  nextButtonText="مرحله بعد"
                  className="relative h-full"
                  backButtonProps={{ className: "" }}
                  stepContainerClassName="hidden"
                  contentClassName="w-screen h-screen"
                >
                  <Step>
                    <div className="flex justify-center flex-col items-center pb-[20vh]">
                      <p className="font-bold text-md mt-10">
                        نام و عکس پت خود رو وارد کنید
                      </p>
                      <Avatar className="w-24 h-24 border-2 mt-4"></Avatar>
                      <div>
                        <p className="text-lg mb-1">نام</p>
                        <NonFormikInput
                          classes={{ className: "text-lg" }}
                        ></NonFormikInput>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center flex-col items-center pb-[20vh]">
                      <p className="font-bold text-md mt-10">
                        نام و عکس پت خود رو وارد کنید
                      </p>
                      <Avatar className="w-24 h-24 border-2 mt-4"></Avatar>
                      <div>
                        <p className="text-lg mb-1">نام</p>
                        <NonFormikInput
                          classes={{ className: "text-lg" }}
                        ></NonFormikInput>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center flex-col items-center pb-[20vh]">
                      <p className="font-bold text-md mt-10">
                        نام و عکس پت خود رو وارد کنید
                      </p>
                      <Avatar className="w-24 h-24 border-2 mt-4"></Avatar>
                      <div>
                        <p className="text-lg mb-1">نام</p>
                        <NonFormikInput
                          classes={{ className: "text-lg" }}
                        ></NonFormikInput>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex justify-center flex-col items-center pb-[20vh]">
                      <p className="font-bold text-md mt-10">
                        نام و عکس پت خود رو وارد کنید
                      </p>
                      <Avatar className="w-24 h-24 border-2 mt-4"></Avatar>
                      <div>
                        <p className="text-lg mb-1">نژاد</p>
                        {/* <Select name="akhoond">
                          <SelectTrigger className="w-30">
                            <SelectValue placeholder="روز" />
                          </SelectTrigger>
                          <SelectContent className="">
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
                        </Select> */}
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </Form>
            )}
          </Formik>

          {/* <p className="font-bold text-md mt-10">
            نام و عکس پت خود رو وارد کنید
          </p>
          <Avatar className="w-24 h-24 border-2 mt-3"></Avatar>

          <Input></Input>
          <div className="flex justify-center gap-5 mt-20">
            <Button>مرحله بعد</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
