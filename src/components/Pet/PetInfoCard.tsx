import { useState, type FC } from "react";
import { Divide, Info, Pencil } from "lucide-react"; // example icon
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
      className="bg-white rounded-xl shadow-lg p-6 px-10  w-full border border-gray-100"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {editingMode ? "ویرایش اطلاعات" : "جزئیات اطلاعات"}
          </h2>
          <Pencil
            className="w-5 h-5 cursor-pointer"
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
            {/* Grid Info */}
            {!isMobile ? (
              <>
                <div className="grid grid-cols-3  divide-x-2 divide-gray-200 border-y border-gray-200 py-6 text-center text-gray-800">
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نام</p>
                    {editingMode ? (
                      <Input
                        name="name"
                        placeholder="نام پت"
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{name}</p>
                    )}
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نوع</p>
                    {editingMode ? (
                      <Input
                        name="type"
                        placeholder=""
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{type}</p>
                    )}
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نژاد</p>
                    {editingMode ? (
                      <Input
                        name="breed"
                        placeholder=""
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{breed}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x-2 divide-gray-200 border-b border-gray-200 py-6 text-center text-gray-800">
                  <div className="px-2">
                    <p className="text-sm text-gray-500">جنسیت</p>
                    {editingMode ? (
                      <Input
                        name="gender"
                        placeholder=""
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{gender}</p>
                    )}
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">وزن (کیلوگرم)</p>
                    {editingMode ? (
                      <Input
                        name="weight"
                        placeholder=""
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{weight}</p>
                    )}
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">تاریخ تولد</p>
                    {editingMode ? (
                      <Input
                        name="birthDate"
                        placeholder=""
                        classes={{
                          className: "h-9 w-[80%]",
                        }}
                        shadow={true}
                      />
                    ) : (
                      <p className="font-medium">{birthDate}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2  divide-x-2 divide-gray-200 border-y border-gray-200 py-4 text-center text-gray-800">
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نام</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نوع</p>
                    <p className="font-medium">{type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x-2 divide-gray-200 border-b border-gray-200 py-4 text-center text-gray-800">
                  <div className="px-2">
                    <p className="text-sm text-gray-500">نژاد</p>
                    <p className="font-medium">{breed}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">جنسیت</p>
                    <p className="font-medium">{gender}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x-2 divide-gray-200 border-b border-gray-200 py-4 text-center text-gray-800">
                  <div className="px-2">
                    <p className="text-sm text-gray-500">وزن (کیلوگرم)</p>
                    <p className="font-medium">{weight}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-sm text-gray-500">تاریخ تولد</p>
                    <p className="font-medium">{birthDate}</p>
                  </div>
                </div>
              </>
            )}

            {/* <div className="grid grid-cols-3 grid-rows-2  divide-x-2 divide-y-2 divide-gray-200  border-gray-200 py-4 text-center text-gray-800">
              <div className="px-2">
                <p className="text-sm text-gray-500">نام</p>
                <p className="font-medium">{name}</p>
              </div>
              <div className="px-2">
                <p className="text-sm text-gray-500">نوع</p>
                <p className="font-medium">{type}</p>
              </div>
              <div className="px-2">
                <p className="text-sm text-gray-500">نژاد</p>
                <p className="font-medium">{breed}</p>
              </div>
              <div className="px-2">
                <p className="text-sm text-gray-500">جنسیت</p>
                <p className="font-medium">{gender}</p>
              </div>
              <div className="px-2">
                <p className="text-sm text-gray-500">وزن (کیلوگرم)</p>
                <p className="font-medium">{weight}</p>
              </div>
              <div className="px-2">
                <p className="text-sm text-gray-500">تاریخ تولد</p>
                <p className="font-medium">{birthDate}</p>
              </div>
            </div> */}



            {/* Health Section */}
            <div className="mt-4">
              <h3 className="text-gray-500 font-medium mb-1">وضعیت سلامت</h3>
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
                    "text-gray-700 leading-relaxed text-sm text"
                  }
                >
                  {healthStatus}
                </p>
              )}
              {!editingMode && (
                <Button
                  variant={"link"}
                  className="text-gray-500 underline leading-relaxed text-sm cursor-pointer hover:text-gray-900 p-0"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "نمایش کمتر..." : "نمایش بیشتر..."}
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
