import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Pet } from "@/types/Pet/pet";
import { ageYearsMonths } from "@/utils/getYearMonthFromDate";
import React from "react";

type RequestPetCardProps = {
  name: string;
  age?: string;
  isAdult?: boolean;
  species: string;
  gender: number;
  pictureLink: string;
};

export default function RequestPetCard({
  name,
  age,
  isAdult,
  species,
  gender,
  pictureLink,
}: RequestPetCardProps) {
  return (
    <div className="bg-[#E5E7EB] flex items-center gap-3 overflow-clip relative rounded-[25px]   h-[120px]">
      {/* Pet Image */}
      <div className="mr-3">
        <Avatar className="size-20">
          <AvatarImage src={pictureLink} className="object-cover" />
          <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-2 w-full  ">
        <div className=" border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm">نام: {name}</p>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-7 bg-gray-300"></div>
        </div>
        <div className="p-3   border-b border-gray-300 relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm ">نژاد: {species}</p>
        </div>
        <div className="p-3  relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm ">
            سن:{" "}
            {age !== undefined && age !== null
              ? ageYearsMonths(age!)
              : isAdult
              ? "بالغ"
              : "نابالغ"}
          </p>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-7 bg-gray-300"></div>
        </div>

        <div className="p-3   relative flex flex-col justify-center items-center">
          <p className="text-xs sm:text-sm ">جنسیت: {gender}</p>
        </div>
      </div>
    </div>
  );
}
