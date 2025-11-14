import React from "react";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

type DontKnowToggleProps = {
  className?: string | null;
};

export default function DontKnowToggle({ className }: DontKnowToggleProps) {
  return (
    <div
      className={cn(
        className,
        "rounded-4xl h-15 bg-primary-200 w-70 flex items-center justify-between px-5"
      )}
    >
      <Switch className="bg-primary drop-shadow-none" />
      <p className="text-lg  ">نمیدونم</p>
    </div>
  );
}
