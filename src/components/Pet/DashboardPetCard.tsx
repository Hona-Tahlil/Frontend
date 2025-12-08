import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../Custom/Button/Button";
import { Eye, Mars, Trash, Venus } from "lucide-react";
import { FaMale } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-temp.jpg";
import petDefault from "@/assets/images/pet-profile-bg.png";
import petBgPatter from "@/assets/images/paw-pattern-bg.png";
import { useMobile } from "@/hooks/ResponsiveHooks";

type DashboardPetCardProps = {
  name: string;
  kind: string;
  species: string;
  age: string | null;
  isAdult: boolean | null;
  gender: string;
  id: number;
  pictureLink?: string | undefined;
};

export default function DashboardPetCard({
  name,
  kind,
  species,
  age,
  isAdult,
  gender,
  id,
  pictureLink,
}: DashboardPetCardProps) {
  const isMobile = useMobile();
  return (
    <Card className="rounded-lg border-none rtl mb-3 w-fit">
      <CardHeader className="p-0 flex">
        <CardTitle
          className="h-13 md:h-25 rounded-t-lg bg-cover "
          style={{ backgroundImage: `url(${petBgPatter})` }}
        ></CardTitle>
        <div className="h-fit w-fit flex justify-center items-center self-center">
          <Avatar className=" -mt-[60%] md:-mt-[55%] w-15 h-15  md:w-25 md:h-25">
            <AvatarImage
              src={petProfile}
              className="object-cover"
            ></AvatarImage>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="px-3 mb-0 pb-2">
        <div className="flex justify-between">
          <p className="text-sm md:text-lg font-bold">{name}</p>
          {gender === "male" ? <Mars size={isMobile ? 20 : 32} /> : <Venus size={isMobile ? 20 : 32}/>}
        </div>
        <p className="text-xs md:text-sm mt-2">
          {kind} {species}
        </p>
        <p className="text-xs md:text-sm">{age} سال</p>
      </CardContent>
      {isMobile ? (
        <CardFooter className="flex flex-col md:mt-5 px-3 pb-2">
          <Button className="shadow-none drop-shadow-none w-full h-7 text-xs">
            <Eye />
            مشاهده
          </Button>
          {/* <Button
            variant={"outline"}
            className="shadow-none drop-shadow-none w-full h-7 text-xs"
          >
            <Trash />
            حذف
          </Button> */}
        </CardFooter>
      ) : (
        <CardFooter className="flex gap-2 mt-1 md:mt-5">
          <Button variant={"outline"} className="shadow-none drop-shadow-none">
            <Trash />
            حذف
          </Button>
          <Button className="shadow-none drop-shadow-none">
            <Eye />
            مشاهده
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
