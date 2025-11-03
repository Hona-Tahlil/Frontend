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
import petBgPatter from "@/assets/images/paw-pattern-bg.png";

type DashboardPetCardProps = {
  name: string;
  kind: string;
  species: string;
  age: string | null;
  isAdult: boolean | null;
  gender: string;
};

export default function DashboardPetCard({
  name,
  kind,
  species,
  age,
  isAdult,
  gender,
}: DashboardPetCardProps) {
  return (
    <Card className="rounded-lg border-none rtl mb-3">
      <CardHeader className="p-0 flex">
        <CardTitle
          className="h-25 rounded-t-lg bg-cover "
          style={{ backgroundImage: `url(${petBgPatter})` }}
        ></CardTitle>
        <div className="h-fit w-fit flex justify-center items-center self-center">
          <Avatar className="-mt-[55%]  w-25 h-25">
            <AvatarImage
              src={petProfile}
              className="object-cover"
            ></AvatarImage>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-between">
          <p className="text-lg font-bold">{name}</p>
          {gender === "male" ? <Mars /> : <Venus />}
        </div>
        <p className="text-sm mt-2">
          {kind} {species}
        </p>
        <p className="text-sm">{age} سال</p>
      </CardContent>
      <CardFooter className="flex gap-2 mt-5">
        <Button variant={"outline"} className="shadow-none drop-shadow-none">
          <Trash />
          حذف
        </Button>
        <Button className="shadow-none drop-shadow-none">
          <Eye />
          مشاهده
        </Button>
      </CardFooter>
    </Card>
  );
}
