import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import petDefaultImage from "@/assets/images/pet-default-profile.png";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { useField, useFormikContext } from "formik";
import type { PreviewableAvatarProps } from "@/types/avatarTypes";

const PreviewableAvatar: React.FC<PreviewableAvatarProps> = ({
  className,
  name,
  canEdit = true,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobile();

  const formik = useFormikContext<any>();

  const [field] = useField(name);

  useEffect(() => {
    if (field.value) {
      setImage(field.value);
    }
  }, [field.value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEdit) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    formik.setFieldValue(name, file);
    formik.setFieldTouched(name, true, false);
  };

  const handleClick = () => {
    if (!canEdit) return;
    fileInputRef.current?.click();
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className={cn(
              "relative group rounded-full cursor-pointer select-none",
              className
            )}
          >
            <Avatar className="w-full h-full shadow-md">
              <AvatarImage
                src={image || petDefaultImage}
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback>pet image</AvatarFallback>
            </Avatar>
            {canEdit && (
              <div className="aspect-square rounded-full h-8 w-8 bg-white justify-center flex items-center absolute -translate-y-[70%]">
                <PenLine className="h-4" />
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-center w-fit py-5 px-15 md:px-30 rounded-2xl">
          <DialogHeader>
            <DialogTitle className={canEdit ? "text-2xl mb-10" : "sr-only"}>
              {"\u0627\u0646\u062a\u062e\u0627\u0628 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {"\u067e\u06cc\u0634\u200c\u0646\u0645\u0627\u06cc\u0634 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
            </DialogDescription>
          </DialogHeader>
          <div className="mb-6 h-40 w-40 overflow-hidden rounded-full shadow-md">
            <img
              src={image || petDefaultImage}
              alt="avatar preview"
              className="h-full w-full object-cover"
            />
          </div>
          {canEdit && (
            <DialogFooter>
              <Button onClick={handleClick} className="w-40 h-10 text-md">
                {"\u0627\u0646\u062a\u062e\u0627\u0628 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative group rounded-full cursor-pointer select-none",
            className
          )}
        >
          <Avatar className="w-full h-full shadow-md">
            <AvatarImage
              src={image || petDefaultImage}
              alt="avatar"
              className="object-cover"
            />
            <AvatarFallback>pet image</AvatarFallback>
          </Avatar>

          {canEdit && (
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center justify-center">
              <Pencil className="text-white w-6 h-6" />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center w-fit py-5 px-15 md:px-30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className={canEdit ? "text-2xl mb-10" : "sr-only"}>
            {"\u0627\u0646\u062a\u062e\u0627\u0628 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {"\u067e\u06cc\u0634\u200c\u0646\u0645\u0627\u06cc\u0634 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-6 h-48 w-48 overflow-hidden rounded-full shadow-md">
          <img
            src={image || petDefaultImage}
            alt="avatar preview"
            className="h-full w-full object-cover"
          />
        </div>
        {canEdit && (
          <DialogFooter>
            <Button onClick={handleClick} className="w-40 h-10 text-md">
              {"\u0627\u0646\u062a\u062e\u0627\u0628 \u0639\u06a9\u0633 \u067e\u0631\u0648\u0641\u0627\u06cc\u0644"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewableAvatar;
