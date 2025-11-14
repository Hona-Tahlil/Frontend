import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import React, { type ElementType } from "react";

type item = {
  name: string;
  icon: ElementType;
};
type ToggleGroupType1Props = {
  items: item[];
};

export default function ToggleGroupType1({ items }: ToggleGroupType1Props) {
  return (
    <ToggleGroup type="single" className=" w-full rtl mb-10 p-0 ">
      {items.map((item) => (
        <ToggleGroupItem
          value={item.name}
          className="group h-20 w-40 md:h-50 md:w-100 p-0 flex justify-between gap-0 rounded-2xl cursor-pointer mx-3"
        >
          <div className="bg-black/40 group-hover:bg-primary group-data-[state=on]:bg-primary text-white h-full px-1 md:px-5 rounded-tr-2xl rounded-br-2xl flex justify-center items-center">
            <p className="text-xs md:text-xl font-bold rotate-90"> {item.name} </p>
          </div>
          <div className="w-full h-full border-black/40  border-4 group-hover:border-primary group-data-[state=on]:border-primary rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
            {
              <item.icon  className="w-50 group-hover:text-primary group-data-[state=on]:text-primary"></item.icon>
            }
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
