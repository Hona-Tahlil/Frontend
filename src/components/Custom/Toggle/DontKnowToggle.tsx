import React from "react";
import { Switch } from "../../ui/switch";
import { cn } from "@/lib/utils";

type DontKnowToggleProps = {
  className?: string | null;
  text: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function Toggle({ className, text , checked, onCheckedChange}: DontKnowToggleProps) {
  return (
    <div
      className={cn(
        className,
        "rounded-4xl h-15 bg-primary-200 w-70 flex items-center justify-between px-5"
      )}
    >
      <Switch className="bg-primary" checked={checked} onCheckedChange={onCheckedChange} />
      <p className="text-lg  ">{text}</p>
    </div>
  );
}
