import React, { useState } from "react";
import {
  CircleAlert,
  HandHeart,
  Home,
  LogOut,
  Menu,
  NotebookPen,
  Scale,
  Undo2,
} from "lucide-react";
import NavbarItem from "./NavbarItem";
import { Button } from "../Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";
import navbarImage from "@/assets/images/mobile-navbar-background.png";
import navbarBgImage from "@/assets/images/mobie-navbar-bg-2.png";

import logoImage from "@/assets/images/Logo.svg";
import NavbarProfileDropdonwMenu from "./NavbarProfile";

type NavbarProps = {
  isUserLoggedin: boolean;
};
const NAV_LINKS = [
  {
    label: "خانه",
    href: "/landing",
    icon: <Home className="h-5" />,
    showDesktop: true,
  },
  {
    label: "رزرو",
    href: "#services",
    icon: <HandHeart className="h-5" />,
    showDesktop: true,
  },
  {
    label: "بلاگ",
    href: "#blog",
    icon: <NotebookPen className="h-5" />,
    showDesktop: true,
  },
  {
    label: "درباره ما",
    href: "/AboutUs",
    icon: <CircleAlert className="h-5" />,
    showDesktop: true,
  },
  {
    label: "قوانین و مقررات",
    href: "",
    icon: <Scale className="h-5" />,
    showDesktop: false,
  },
];

export default function Navbar({ isUserLoggedin }: NavbarProps) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);
  return (
    <nav
      dir="rtl"
      className="z-20 flex justify-between bg-white h-13 items-center px-10 font-[Alibaba] shadow-lg w-screen fixed "
    >
      <div className="flex h-full items-center">
        {isMobile && (
          <section className=" flex lg:hidden">
            <Menu
              className="size-7 ml-4"
              onClick={() => setOpen((prev) => !prev)}
            />
            <div>
              <div
                className={
                  open
                    ? "-translate-x-[0%] duration-75 absolute right-0 top-0 w-[60%] md:w-[40%] h-screen bg-white z-10 flex  justify-evenly items-start "
                    : " translate-x-[100%] duration-75 absolute right-0 top-0 w-[60%] md:w-[40%] h-screen bg-white z-10 flex  justify-evenly items-start"
                }
              >
                <div
                  className="absolute top-0 right-0 px-8 py-8"
                  onClick={() => setOpen(false)} // change isNavOpen state to false to close the menu
                >
                  <Undo2
                    className="size-7 rotate-y-180"
                    color="white"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col">
                  {isUserLoggedin ? (
                    <div className="h-full w-full ">
                      <img src={navbarImage} alt="" />
                    </div>
                  ) : (
                    <div className="h-full w-full ">
                      <img src={navbarImage} alt="" />
                    </div>
                  )}

                  <div className="flex flex-col w-full h-full items-center">
                    <div className="h-auto flex flex-colg   justify-start w-[80%] py-5">
                      <ul>
                        {NAV_LINKS.map((item) => (
                          <NavbarItem
                            icon={item.icon}
                            route={item.href}
                            className="w-fit h-10 rounded-lg"
                          >
                            {item.label}
                          </NavbarItem>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between w-[80%] mt-4 bottom-6 absolute border-t-1 pt-4">
                      <img src={logoImage} alt="" className="h-8" />
                      <p>نسخه ۱.۰.۰</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  (open ? "" : "hidden") +
                  "w-[40%] md:w-[60%] absolute top-0 left-0 h-screen bg-black opacity-50 overscroll-none touch-none z-30"
                }
                onClick={() => {
                  setOpen(false);
                }}
              ></div>
            </div>
          </section>
        )}
        <img src={logoImage} alt="" className="h-[70%]" />
        {!isMobile && (
          <ul className="mr-5 flex h-full items-center">
            {NAV_LINKS.map(
              (item) =>
                item.showDesktop && (
                  <NavbarItem icon={item.icon} route={item.href}>
                    {item.label}
                  </NavbarItem>
                )
            )}
          </ul>
        )}
      </div>
      {isUserLoggedin ? (
        <div className="flex h-[70%] items-center">
          <NavbarProfileDropdonwMenu />
        </div>
      ) : (
        <div className="flex h-full items-center">
          <Button className="rounded-xl h-[70%] flex items-center gap-1 ">
            <LogOut strokeWidth={3} />
            <span className="font-bold text-sm w-fit">ورود</span>
            <div className="bg-white w-0.5 h-full rounded-4xl"></div>
            <span className="font-bold text-sm">ثبت نام</span>
          </Button>
        </div>
      )}
    </nav>
  );
}
