import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { NonFormikInput } from "@/components/Custom/Input/NonFormikInput";
import { PetDatePicker } from "@/components/Custom/PetDatePicker/PetDatePicker";
import Stepper, { Step } from "@/components/Custom/PetRegister/PetMultiStage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Custom/Select/Select";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import Toggle from "@/components/Custom/Toggle/Toggle";
import IsAdultToggleGroup from "@/components/PetRegister/IsAdultToggleGroup";
import PetKindToggleGroup from "@/components/PetRegister/PetKindToggleGroup";
import { Avatar } from "@/components/ui/avatar";
import { Form, Formik, type FormikHelpers, type FormikValues } from "formik";
import {
  BabyIcon,
  Bird,
  Cat,
  Dog,
  Mars,
  Rabbit,
  Redo2,
  Venus,
} from "lucide-react";
import React, { useEffect, useState } from "react";

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

  const [isChecked, setIsChecked] = useState(false);
  const [species, setSpecies] = useState([
    { name: "پرشین", number: 1 },
    { name: "ژرمن", number: 2 },
  ]);
  const [kindDontKnow, setKindDontKnow] = useState(false);
  const [genderDontKnow, setGenderDontKnow] = useState(false);
  const [weightDontKnow, setWeightDontKnow] = useState(false);
  const [birthDontKnow, setBirthDontKnow] = useState(false);

  function petKindOnChange(value: string) {
    // api call
    
    console.log(value);
  }

  return (
    <div
      className="overflow-hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="relative flex flex-col items-center w-full pb-6 ">
        <div className="p-2 absolute top-6 right-4 text-lg font-semibold flex items-center gap-2 text-gray-800">
          <span>
            <Redo2 />
          </span>
        </div>
        <div className="bg-white aspect-square rounded-full w-[200%] mt-[20%] flex-col flex  items-center drop-shadow-2xl">
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
                    <div className="h-110 flex justify-start flex-col items-center mb-[3vh]">
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
                    <div className="h-110 w-full flex justify-start flex-col items-center mb-[3vh]">
                      <p className="font-bold text-lg mt-10">
                        نوع و نژاد پت شما چیه؟
                      </p>
                      <div className="h-10 my-5">
                        <Toggle
                          text="نمیدونم"
                          checked={kindDontKnow}
                          onCheckedChange={setKindDontKnow}
                          className="h-full"
                        />
                      </div>

                      <div className="w-full">
                        <PetKindToggleGroup
                          disable={isChecked}
                          onChange={petKindOnChange}
                          name="petKind"
                          items={[
                            { name: "dog", icon: Dog, value: "سگ" },
                            { name: "cat", icon: Cat, value: "گربه" },
                            { name: "bird", icon: Bird, value: "پرنده" },
                            { name: "rabit", icon: Rabbit, value: "جونده" },
                          ]}
                          className="grid-cols-2 grid grid-rows-2 mb-0"
                        />
                      </div>
                      <div className="w-[90%] flex gap-5 justify-between items-center mt-10 ">
                        <p className="text-lg mb-0.5">نژاد</p>
                        <Select name="breed">
                          <SelectTrigger
                            className="w-full h-9"
                            disabled={isChecked}
                          >
                            <SelectValue
                              placeholder={
                                isChecked ? "نژاد و نوع پت را نمیدونم" : ""
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {!isChecked && (
                              <SelectGroup>
                                {species.map((item) => (
                                  <SelectItem value={item.number.toString()}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-110 flex justify-start flex-col items-center mb-[3vh]">
                      <p className="font-bold text-lg mt-10">دختره یا پسر؟</p>
                      <div className="h-10 my-5">
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
                      <p className="font-bold text-lg mt-5">وزنش چقدره؟</p>
                      <div className="my-5 h-10">
                        <Toggle
                          text="نمیدونم"
                          checked={weightDontKnow}
                          onCheckedChange={setWeightDontKnow}
                          className=" h-full"
                        />
                      </div>

                      <div className="h-10 w-full">
                        <Input
                          name="weight"
                          disabled={weightDontKnow}
                          classes={{ className: "w-full px-5" }}
                        ></Input>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-110 flex justify-start flex-col items-center mb-[3vh]">
                      <p className="font-bold text-md mt-10">
                        چه تاریخی به دنیا اومده؟
                      </p>
                      <div className="h-10 my-5">
                        <Toggle
                          text="نمیدونم"
                          checked={birthDontKnow}
                          onCheckedChange={setBirthDontKnow}
                          className="h-full text-sm"
                        />
                      </div>

                      <div className="flex flex-1 justify-center w-[80%] mt-5">
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
                            bigFontSize="24px"
                            classes={{
                              containerClassName: "w-20",
                              textClassName: "text-xl",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="h-110 flex justify-start flex-col items-center mb-[3vh]">
                      <p className="font-bold text-md mt-10">
                        درباره وضعیت سلامت پت بهم بگو
                      </p>
                      <div className="w-full mt-10 px-3">
                        <Textarea
                          rows={12}
                          scrollbarBorderRadius="10px"
                          className="relative drop-shadow-lg py-3 w-full text-xs"
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
