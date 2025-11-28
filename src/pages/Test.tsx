import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import { Textarea } from "@/components/Custom/Textarea/Textarea";

import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import { useDesktop, useMobile, useTablet } from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Custom/Select/Select";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { PetDatePicker } from "@/components/Custom/PetDatePicker/PetDatePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Stepper, { Step } from "@/components/Custom/PetRegister/PetMultiStage";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { NonFormikInput } from "@/components/Custom/Input/NonFormikInput";
import PawIcon from "@/components/Custom/PetRegister/PawIcon";
import { BabyIcon, Bird, Cat, Dog, Mars, Rabbit, Venus } from "lucide-react";
import IsAdultToggleGroup from "@/components/PetRegister/IsAdultToggleGroup";
import PetKindToggleGroup from "@/components/PetRegister/PetKindToggleGroup";

import Toggle from "@/components/Custom/Toggle/Toggle";
import { useState } from "react";
import { name } from "react-date-object/calendars/julian";
import { DropdownMenu } from "@/components/Custom/Dropdonw-Menu/DropdownMenu";
import { getPetSpeciesService } from "@/services/petRegisterService";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر نمی باشد")
    .required("ایمیل اجباری است"),
  password: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
    .required("رمز عبور اجباری است"),
  akhoond: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
    .required("رمز عبور اجباری است"),
});

function Test() {
  const isDesktop = useDesktop();
  const isMobile = useMobile();
  const isTablet = useTablet();
  const [kindDontKnow, setKindDontKnow] = useState(false);
  const [genderDontKnow, setGenderDontKnow] = useState(false);
  const [weightDontKnow, setWeightDontKnow] = useState(false);
  const [birthDontKnow, setBirthDontKnow] = useState(false);
  const navigate = useNavigate();
  const [species, setSpecies] = useState([
    { name: "پرشین", num: 1 },
    { name: "ژرمن", num: 2 },
  ]);

  function petKindOnChange(name: string) {
    // api call

    const kindId =
      name === "dog" ? 1 : name === "cat" ? 2 : name === "bird" ? 3 : 4;
    getPetSpeciesService(kindId)
      .then((loginResponse) => {
        if (loginResponse.statusCode === 200) {
          //setAccessToken(loginResponse.data?.accessToken);
          setSpecies(loginResponse.data!);
        }
      })
      .catch((error) => {
        const errorText = "خطای غیر منتظره";
        console.log(errorText);
      });

    console.log(name);
  }
  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          akhoond: "2",
          password: "he",
          love: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6 border rounded flex flex-col gap-4 items-center w-200">
            <Select name="akhoond">
              <SelectTrigger className="w-30">
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

            <div className="mt-5 w-50">
              <Input
                name="email"
                shadow={true}
                classes={{
                  className: "h-20",
                  inputClassName: "!text-[20px]",
                  errorClassName: "px-5",
                }}
                type="email"
                placeholder="ایمیل"
              />
            </div>

            <div className="w-35">
              <DatePicker className="h-15 !text-[35px]" name="akhoond2" />
            </div>

            <div className="mt-5 w-50">
              <Input
                name="password"
                shadow={true}
                classes={{
                  className: "h-20",
                  errorClassName: "px-5",
                  inputClassName: "!text-[45px]",
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

            <div className="px-5 w-full">
              <Textarea
                rows={6}
                scrollbarBorderRadius="10px"
                className="relative drop-shadow-lg py-3"
                name="betterakhoond"
              />
            </div>

            <Button
              type="submit"
              size={"giant"}
              variant={"outline"}
              shadow={false}
              boxShadow={true}
              bold={true}
              isLoading={isSubmitting}
              className="mb-3"
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

      <MultiStage>
        <MultiStage.Header>
          <MultiStage.StageHeader index={0}>
            بررسی اطلاعات
          </MultiStage.StageHeader>
          <MultiStage.StageHeader index={1}>مدارک</MultiStage.StageHeader>
          <MultiStage.StageHeader index={2}>بیوگرافی</MultiStage.StageHeader>
        </MultiStage.Header>

        <MultiStage.StageHolder>
          <MultiStage.Stage index={0}>
            <p>Account form goes here</p>
          </MultiStage.Stage>

          <MultiStage.Stage index={1}>
            <p>Profile form goes here</p>
          </MultiStage.Stage>
        </MultiStage.StageHolder>
      </MultiStage>

      <Formik
        initialValues={{ isAdult: "false", petKind: "dog" }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <IsAdultToggleGroup
            name="isAdult"
            items={[
              { name: "false", icon: BabyIcon, value: "جوجه" },
              { name: "true", icon: Dog, value: "بالغ" },
            ]}
          />

          <PetKindToggleGroup
            name="petKind"
            items={[
              { name: "dog", icon: Dog, value: "سگ" },
              { name: "cat", icon: Cat, value: "گربه" },
              { name: "bird", icon: Bird, value: "پرنده" },
            ]}
          />
        </Form>
      </Formik>

      {/* FIXED: Removed the extra broken MultiStage.StageHolder */}

      <Dialog>
        <DialogTrigger asChild>
          {!isMobile && <Button>کلیک کن</Button>}
        </DialogTrigger>
        <DialogContent className="w-200 h-[90%] " dir="rtl">
          <Formik
            initialValues={{
              petKind: kindDontKnow ? "" : "dog",
              petName: "salam",
              isAdult: "true",
              aboutPet: "",
            }}
            onSubmit={(values) => console.log(values)}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
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
                  className="mb-20"
                  backButtonProps={{ className: "" }}
                  stepContainerClassName="hidden"
                >
                  <Step>
                    <div className="h-120 flex justify-start flex-col items-center mb-[2vh]">
                      <p className="font-bold text-md mt-10">
                        نام و عکس پت خود رو وارد کنید
                      </p>
                      <Avatar className="w-24 h-24 border-2 mt-4"></Avatar>
                      <div>
                        <p className="text-lg mb-1">نام</p>
                        <Input
                          name="petName"
                          classes={{ className: "text-lg h-10" }}
                        ></Input>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="overflow-y-auto">
                      <div className="h-120 w-full flex justify-start flex-col items-center mb-[2vh] ">
                        <p className="font-bold text-lg mt-5">
                          نوع و نژاد پت شما چیه؟
                        </p>
                        <div className="h-13 my-5">
                          <Toggle
                            text="نمیدونم"
                            checked={kindDontKnow}
                            onCheckedChange={setKindDontKnow}
                            className="h-full"
                          />
                        </div>
                        <div className="w-full">
                          <PetKindToggleGroup
                            disable={kindDontKnow}
                            onChange={petKindOnChange}
                            name="petKind"
                            items={[
                              { name: "dog", icon: Dog, value: "سگ" },
                              { name: "cat", icon: Cat, value: "گربه" },
                              { name: "bird", icon: Bird, value: "پرنده" },
                              { name: "rabit", icon: Rabbit, value: "جونده" },
                            ]}
                            className="grid-cols-2 grid grid-rows-2 h-60"
                          />
                        </div>
                        <div className="w-[90%] mt-10 flex gap-5 justify-between items-center">
                          <p className="text-lg mb-0.5">نژاد</p>
                          <Select name="breed">
                            <SelectTrigger
                              className="w-full h-9"
                              disabled={kindDontKnow}
                            >
                              <SelectValue
                                placeholder={
                                  kindDontKnow ? "نژاد و نوع پت را نمیدونم" : ""
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!kindDontKnow && (
                                <SelectGroup>
                                  {species.map((item) => (
                                    <SelectItem value={item.num.toString()}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-120 flex justify-start flex-col items-center mb-[2vh]">
                      <p className="font-bold text-lg mt-10">دختره یا پسر؟</p>
                      <div className="h-13 my-5">
                        <Toggle
                          text="نمیدونم"
                          checked={genderDontKnow}
                          onCheckedChange={setGenderDontKnow}
                          className="h-full"
                        />
                      </div>
                      <div className="w-full">
                        <PetKindToggleGroup
                          disable={genderDontKnow}
                          onChange={petKindOnChange}
                          name="petKind"
                          items={[
                            { name: "male", icon: Mars, value: "پسر" },
                            { name: "femal", icon: Venus, value: "دختر" },
                          ]}
                          className="grid-cols-2 grid"
                        />
                      </div>
                      <p className="font-bold text-lg mt-10">وزنش چقدره؟</p>
                      <div className="my-5 h-13">
                        <Toggle
                          text="نمیدونم"
                          checked={weightDontKnow}
                          onCheckedChange={setWeightDontKnow}
                          className=" h-full"
                        />
                      </div>
                      <div className="h-10">
                        <Input
                          name="weight"
                          disabled={weightDontKnow}
                          classes={{ className: "w-full px-8" }}
                        ></Input>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-120 flex justify-start flex-col items-center mb-[2vh]">
                      <p className="font-bold text-md mt-10">
                        چه تاریخی به دنیا اومده؟
                      </p>
                      <div className="h-13 my-5">
                        <Toggle
                          text="نمیدونم"
                          checked={birthDontKnow}
                          onCheckedChange={setBirthDontKnow}
                          className="h-full"
                        />
                      </div>
                      <div className="flex flex-1 justify-center w-[80%] mt-5 h-50">
                        {birthDontKnow ? (
                          <IsAdultToggleGroup
                            name="isAdult"
                            items={[
                              {
                                name: "false",
                                icon: BabyIcon,
                                value: "نابالغ",
                              },
                              { name: "true", icon: Dog, value: "بالغ" },
                            ]}
                            className="grid grid-cols-2 h-30"
                          />
                        ) : (
                          <PetDatePicker
                            from={10}
                            to={8}
                            relative={true}
                            name="niceone"
                            smallFontSize="16px"
                            bigFontSize="26px"
                            classes={{
                              containerClassName: "w-20 mt-4",
                              textClassName: "text-xl",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-120 flex justify-start flex-col items-center mb-[2vh]">
                      <p className="font-bold text-md mt-10">
                        درباره پت بهم بگو
                      </p>
                      <div className="w-full mt-10">
                        <Textarea
                          rows={9}
                          scrollbarBorderRadius="10px"
                          className="relative drop-shadow-lg py-3"
                          name="aboutPet"
                          placeholder="داروی مصرفی خاص، وضعیت واکسیناسیون، بیماری خاص..."
                        />
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {isMobile && (
        <Button
          onClick={() => {
            navigate("/RegisterPet");
          }}
        >
          سلام
        </Button>
      )}

      <PawIcon step={2} className=""></PawIcon>
      {/* <Toggle
        className="mb-10 h-50"
        text="نمیدونم"
        checked={isChecked}
        onCheckedChange={() => setIsChecked((checked) => !checked)}
      /> */}

      {/* {isChecked && <p>salllaaam</p>} */}
    </div>
  );
}

export default Test;
