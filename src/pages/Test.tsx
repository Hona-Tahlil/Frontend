import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import Navbar from "@/components/Navbar/Navbar";
import {
  useDesktop,
  useDesktopTablet,
  useMobile,
  useTablet,
} from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";
import leftInputDirection from "@/utils/leftInputDirection";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر نمی باشد")
    .required("ایم�ل اجباری است"),
  password: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد")
    .required("رمز عبور اجباری است"),
});

function Test() {
  const isDesktop = useDesktop();
  const isMobile = useMobile();
  const isTablet = useTablet();
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center">
        <Formik
          initialValues={{ email: "", password: "", password2: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values:", values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 border rounded flex flex-col gap-4 items-center w-200">
              <Input
                name="email"
                shadow={true}
                className="w-full"
                onChangeWrapper={adjustInputDirection}
                errorClassName="w-80 px-5"
                type="email"
                placeholder="ایمیل"
              />
              <Input
                name="password"
                shadow={true}
                className="w-80"
                errorClassName="w-80 px-5"
                type="password"
                placeholder="رمز"
              />

              <Input
                name="password2"
                shadow={true}
                className="w-80"
                onChangeWrapper={leftInputDirection}
                errorClassName="w-80 px-5"
                type="password"
                placeholder="رمز"
              />
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
        <Checkbox textClassName="text-[17px]" size="25px" text={"آقا عشق"} />
        <Checkbox
          className="mt-5"
          backGroundClassName="!border-5"
          textClassName="text-[17px]"
          size="30px"
          text={"آقا عشق"}
        />
        <Checkbox
          className="mt-5 bg-red-500"
          textClassName="text-[17px] font-bold"
          size="15px"
          text={"آقا عشق"}
        />
        <br />
        <br />
        <Button variant={"link"} shadow={false} bold={true}>
          فراموشی رمز عبور
        </Button>
      </div>
    </>
  );
}

export default Test;
