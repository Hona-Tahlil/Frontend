import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/Custom/Dialog/Dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";

type RequestDialogboxLayoutProps = {
  petsitterName: string;
  petsitterImage: string; // image url
  children: React.ReactNode;
  trigger?: React.ReactNode; // 👈 NEW
};

export default function RequestDialogboxLayout({
  petsitterName,
  petsitterImage,
  children,
  trigger,
}: RequestDialogboxLayoutProps) {
  const initials =
    petsitterName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "?";

  return (
    <Dialog>
      {/* Use custom trigger (e.g. "See details" button) */}
      <DialogTrigger asChild>{trigger ?? <button>Open</button>}</DialogTrigger>

      <DialogContent
        className="
          p-0 overflow-hidden
          w-200 rounded-2xl rtl
        "
      >
        <div className="relative bg-[#A8D0D5] h-20 flex items-center justify-center">
          <DialogClose className="absolute left-4 top-1/2 -translate-y-1/2 hover:cursor-pointer">
            <div className="aspect-square rounded-full w-8 h-8 border-2 flex items-center justify-center border-teal-600">
              <X className="w-5 h-5 text-teal-600" />
            </div>
          </DialogClose>
        </div>

        <div className="flex ">
          <div className="w-fit h-fit justify-end pr-6 flex flex-col items-center">
            <Avatar className="w-24 h-24 border-4 -mt-[50%] border-teal-600 shadow-md">
              <AvatarImage src={petsitterImage} alt={petsitterName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="font-bold text-lg mt-2 ">{petsitterName}</div>
          </div>

          <div className="px-6 pb-6 w-full">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
