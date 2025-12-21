import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function LoadingPetCard() {
  return (
    <div className=" flex items-center">
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  );
}
