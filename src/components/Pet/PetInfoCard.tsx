import { useLayoutEffect, useRef, useState, type FC } from "react";
import { Divide, Info, Pencil, PenLine } from "lucide-react"; // example icon
import { Button } from "../Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Input } from "../Custom/Input/Input";
import { Form, Formik } from "formik";
import { Checkbox } from "../Custom/Checkbox/Checkbox";
import PetInfoShema from "@/schemas/PetInfoSchema";
import { Textarea } from "../Custom/Textarea/Textarea";
import CustomToast from "../Custom/CustomToast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Custom/Select/Select";
import { getPetSpeciesService } from "@/services/petRegisterService";
import DatePicker from "../Custom/DatePicker/DatePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePetInfoByIdService } from "@/services/Pet/petService";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TruncatedText from "../TruncatedText/TruncatedText";

type PetInfoCardProps = {
  id: number;
  name: string;
  kind: number;
  species: number;
  gender: string;
  weight: number | null;
  birthDate: string | null;
  aboutPet: string | null | undefined;
  isAdult: boolean | null;
  onSubmit: (() => Promise<void>) & (() => Promise<any>);
  editingMode: boolean;
  setEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PetInfoCard({
  id,
  name,
  kind,
  species,
  gender,
  weight,
  birthDate,
  aboutPet,
  isAdult,
  onSubmit,
  editingMode,
  setEditingMode,
}: PetInfoCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  const KIND_MAP: Record<number, string> = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
  };

  const checkOverflow = () => {
    const el = pRef.current;
    if (!el) return;

    // only meaningful when clamped
    // add 1px tolerance for rounding differences
    const overflowing = el.scrollHeight > el.clientHeight + 1;
    setIsOverflowing(overflowing);
  };

  useLayoutEffect(() => {
    checkOverflow();
  }, [aboutPet, showMore]);

  const isMobile = useMobile();

  const [speciesList, setSpeciesList] = useState([
    { name: "پرشین", num: 1 },
    { name: "ژرمن", num: 2 },
  ]);
  const [getSpeciesError, setGetSpeciesError] = useState(false);

  function petKindOnChange(name: string) {
    const kindId = name === "1" ? 1 : name === "2" ? 2 : name === "3" ? 3 : 4;

    getPetSpeciesService(kindId)
      .then((response) => {
        if (response.statusCode === 200) {
          setSpeciesList(response.data!);
        }
      })
      .catch((error) => {
        const errorText = "خطای غیر منتظره";
        console.log(errorText);
        setGetSpeciesError(true);
        console.log(error?.response?.statusCode);
      });

    console.log(name);
  }

  
  return (
    <div
      className="bg-white rounded-xl shadow-lg px-2 md:px-10 py-5 md:p-6  w-full border border-gray-100"
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
              if (editingMode == false){
                petKindOnChange(KIND_MAP[kind]);
              }
              setEditingMode(!editingMode);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2  border-b border-gray-300">
        <div className="p-3 md:p-6 border-b border-gray-300 relative flex flex-col justify-center items-center">
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
            <p className="font-medium text-xs sm:text-sm">{name}</p>
          )}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
        </div>
        <div className="p-3 md:p-6  border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm text-gray-500">نوع</p>
          {editingMode ? (
            <Select
              name="kind"
              onValueChange={(value) => {
                petKindOnChange(value);
              }}
            >
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="نژاد پت خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key={1} value="1">
                    سگ
                  </SelectItem>
                  <SelectItem key={2} value="2">
                    گربه
                  </SelectItem>
                  <SelectItem key={3} value="3">
                    پرنده
                  </SelectItem>
                  <SelectItem key={4} value="4">
                    جونده
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="font-medium text-xs sm:text-sm">{kind}</p>
          )}
          {/* Vertical divider - shorter */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
          )}
        </div>
        <div className="p-3 md:p-6  border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm text-gray-500">نژاد</p>
          {editingMode ? (
            <Select name="species">
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="نژاد پت خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {speciesList.map((item) => (
                    <SelectItem key={item.num} value={item.num.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="font-medium text-xs sm:text-sm">{species}</p>
          )}
          {isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
          )}
        </div>

        <div className="p-3 md:p-6  border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm text-gray-500">جنسیت</p>
          {editingMode ? (
            <Select name="gender">
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="جنسیت پت" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key={1} value="1">
                    نر
                  </SelectItem>
                  <SelectItem key={2} value="2">
                    ماده
                  </SelectItem>
                  <SelectItem key={3} value="3">
                    نمی‌دانم
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="font-medium text-xs sm:text-sm">{gender}</p>
          )}
          {/* Vertical divider - shorter */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
          )}
        </div>
        <div className="p-3 md:p-6  border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm text-gray-500">وزن (کیلوگرم)</p>
          {editingMode ? (
            <Input
              name="weight"
              classes={{
                className: "h-8 md:h-9 w-[120%] md:w-[80%] mt-1",
              }}
              shadow={true}
            />
          ) : (
            <p className="font-medium text-xs sm:text-sm">{weight ?? "-"}</p>
          )}
          {/* Vertical divider - shorter */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
        </div>
        <div className="p-3 md:p-6  border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm text-gray-500">تاریخ تولد</p>
          {editingMode ? (
            <div className=" h-8 md:h-9 w-[120%] md:w-[80%] mt-1">
              <DatePicker name="birthDate" />
            </div>
          ) : (
            <p className="font-medium text-xs sm:text-sm">
              {birthDate != null
                ? new DateObject({
                    date: new Date(
                      new Date(birthDate!).getFullYear(),
                      new Date(birthDate!).getMonth(),
                      new Date(birthDate!).getDate()
                    ),
                    calendar: persian,
                    locale: persian_fa,
                  }).toString()
                : isAdult
                ? "بالغ"
                : "نابالغ"}
            </p>
          )}
        </div>
      </div>

      {/* Health Section */}
      <div className="mt-4">
        <h3 className="text-gray-500 font-medium mb-1 ">درباره پت</h3>
        {editingMode ? (
          <Textarea
            name="aboutPet"
            placeholder="درباره پت"
            rows={10}
            className=""
          />
        ) : (
          <p
            ref={pRef}
            className={
              (!showMore ? "line-clamp-3 " : "") +
              "text-gray-700 leading-relaxed text-xs md:text-sm"
            }
          >
            {aboutPet}
          </p>
        )}
        {!editingMode && isOverflowing && (
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
            <Button
              type="reset"
              variant={"outline"}
              onClick={() => {
                setEditingMode(false);
              }}
            >
              انصراف
            </Button>
            <Button
              type="submit"
              onClick={() => {
                onSubmit();
              }}
            >
              تایید
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
