import { useState, type FC } from "react";
import { Divide, Info, Pencil, PenLine } from "lucide-react"; // example icon
import { Button } from "../Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Input } from "../Custom/Input/Input";
import { Form, Formik } from "formik";
import { Checkbox } from "../Custom/Checkbox/Checkbox";
import PetInfoShema from "@/schemas/PetInfoSchema";

type PetInfoCardProps = {
  name: string;
  type: string;
  breed: string;
  gender: string;
  weight: number;
  birthDate: string;
  healthStatus: string;
};

export default function PetInfoCard({
  name,
  type,
  breed,
  gender,
  weight,
  birthDate,
  healthStatus,
}: PetInfoCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const isMobile = useMobile();
  return (
    <div
      className="bg-white rounded-xl shadow-lg  px-5 py-5 md:p-6  md:px-10  w-full border border-gray-100"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info
            className={isMobile ? "hidden" : "" + "w-5 h-5 text-gray-600"}
          />
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            {editingMode ? "ویرایش اطلاعات" : "جزئیات اطلاعات"}
          </h2>
          <PenLine
            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
            onClick={() => {
              setEditingMode(!editingMode);
            }}
          />
        </div>
      </div>

      <Formik
        {...PetInfoShema}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            

            <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2  border-b border-gray-300">
              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">نام</p>
                {editingMode ? (
                  <Input
                    name="name"
                    placeholder="نام پت"
                    classes={{
                      className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{name}</p>
                )}
                {/* Vertical divider - shorter */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
              </div>
              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">نوع</p>
                {editingMode ? (
                  <Input
                    name="type"
                    placeholder=""
                    classes={{
                      className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{type}</p>
                )}
                {/* Vertical divider - shorter */}
                {!isMobile && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>}
              </div>
              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">نژاد</p>
                {editingMode ? (
                  <Input
                    name="breed"
                    placeholder=""
                    classes={{
                      className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{breed}</p>
                )}
                {isMobile && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>}
              </div>

              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">جنسیت</p>
                {editingMode ? (
                  <Input
                    name="gender"
                    placeholder=""
                    classes={{
                      className: " h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{gender}</p>
                )}
                {/* Vertical divider - shorter */}
                {!isMobile && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>}
              </div>
              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">وزن (کیلوگرم)</p>
                {editingMode ? (
                  <Input
                    name="weight"
                    placeholder=""
                    classes={{
                      className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{weight}</p>
                )}
                {/* Vertical divider - shorter */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
              </div>
              <div className="p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">تاریخ تولد</p>
                {editingMode ? (
                  <Input
                    name="birthDate"
                    placeholder=""
                    classes={{
                      className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
                    }}
                    shadow={true}
                  />
                ) : (
                  <p className="font-medium">{birthDate}</p>
                )}
              </div>
            </div>

           

            {/* Health Section */}
            <div className="mt-4">
              <h3 className="text-gray-500 font-medium mb-1 ">وضعیت سلامت</h3>
              {editingMode ? (
                <Input
                  name="healthState"
                  placeholder="وضعیت سلامت"
                  classes={{
                    className: "h-9 w-[80%]",
                  }}
                  shadow={true}
                />
              ) : (
                <p
                  className={
                    (!showMore ? "line-clamp-3 " : "") +
                    "text-gray-700 leading-relaxed text-xs md:text-sm"
                  }
                >
                  {healthStatus}
                </p>
              )}
              {!editingMode && (
                <Button
                  variant={"link"}
                  className="text-gray-500 underline leading-relaxed text-xs md:text-sm cursor-pointer hover:text-gray-900 p-0"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "نمایش کمتر..." : "نمایش بیشتر..."}
                </Button>
              )}

              {editingMode && (
                <div className="flex gap-2 justify-end h-10 mt-7 w-full">
                  <Button type="reset" variant={"outline"}>
                    انصراف
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    تایید
                  </Button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
