import type { ElementType } from "react";

type item = {
  name: string;
  icon: ElementType;
};
export type PetKindToggleGroupProps = {
  items: item[];
};

export type IsAdultToggleGroupProps = {
  items: item[];
};