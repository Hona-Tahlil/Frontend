import React, { useState } from "react";
import {
  CircleAlert,
  Hamburger,
  Hand,
  HandHeart,
  Home,
  Link,
  LogOut,
  Menu,
  NotebookPen,
  X,
} from "lucide-react";
import NavbarItem from "./NavbarItem";
import { Button } from "../Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { boolean } from "yup";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  isUserLoggedin: boolean;
};
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ isUserLoggedin }: NavbarProps) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);
  return (
      <nav
        dir="rtl"
        className="flex justify-between bg-white h-13 items-center px-10 font-[Alibaba] shadow-lg w-full "
      >
        <div className="flex h-full items-center">
          {isMobile && (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow transition active:scale-95"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          )}
          <img src="src/assets/images/Logo.svg" alt="" className="h-[70%]" />
          {!isMobile && (
            <ul className="mr-5 flex h-full items-center">
              <NavbarItem route="" icon={<Home className="h-5"></Home>}>
                خانه
              </NavbarItem>
              <NavbarItem
                route=""
                icon={<HandHeart className="h-5"></HandHeart>}
              >
                رزرو
              </NavbarItem>
              <NavbarItem
                route=""
                icon={<NotebookPen className="h-5"></NotebookPen>}
              >
                بلاگ
              </NavbarItem>
              <NavbarItem
                route=""
                icon={<CircleAlert className="h-5"></CircleAlert>}
              >
                درباره ما
              </NavbarItem>
            </ul>
          )}
        </div>
        {isUserLoggedin ? (
          <div className="flex h-full items-center">
            <Button className="rounded-xl h-[70%] flex items-center gap-1 ">
              <LogOut strokeWidth={3}></LogOut>
              <span className="font-bold text-sm w-fit">ورود</span>
              <div className="bg-white w-0.5 h-full rounded-4xl"></div>
              <span className="font-bold text-sm">ثبت نام</span>
            </Button>
          </div>
        ) : (
          <div className="flex h-full items-center">
            <Button className="rounded-xl h-[70%] flex items-center gap-1 ">
              <LogOut strokeWidth={3}></LogOut>
              <span className="font-bold text-sm w-fit">ورود</span>
              <div className="bg-white w-0.5 h-full rounded-4xl"></div>
              <span className="font-bold text-sm">ثبت نام</span>
            </Button>
          </div>
        )}
      </nav>
  );
}
