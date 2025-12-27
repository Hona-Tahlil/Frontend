import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, CircleUser, Heart, LogOut, PawPrint } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Custom/Dropdonw-Menu/DropdownMenu";
import useUserStore from "@/store/userStore/userStore";
import { useNavigate } from "react-router-dom";

export default function NavbarProfile() {
  const { firstName, lastName, email } = useUserStore();
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const userImage = "";
  return (
    <div className="h-full flex items-center gap-0.5 text-right lg:ml-7">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-full flex gap-0.5 items-center cursor-pointer">
            <Avatar className="h-full">
              <AvatarImage
                className="h-full"
                src={userImage}
                loading="lazy"
                decoding="async"
              />
              <AvatarFallback>
                <CircleUser
                  className="h-full w-full"
                  strokeWidth={1.5}
                ></CircleUser>
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="" size={15} strokeWidth={4} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mt-3 rtl "
          align="start"
          sideOffset={8}
        >
          <DropdownMenuLabel className="mt-2">
            {firstName} {lastName}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs font-light">
            {email}
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => {navigate("/Dashboard/pets")}}>
              <Heart />
              داشبورد صاحب پت
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigate("/test");
              }}
            >
              <PawPrint />
              داشبورد پت‌یار
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
                navigate("/")
              }}
            >
              <LogOut />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
