import React from "react";
import { Button } from "../ui/button";
import { CircleAlert, Hand, HandHeart, Home, Link, NotebookPen } from "lucide-react";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <nav
      dir="rtl"
      className="flex justify-between bg-white h-12 items-center px-10 font-[Alibaba]"
    >
      <div className="flex h-full items-center">
        <img src="src/assets/images/Logo.svg" alt="" width="40px"/>
        <ul className="mr-5 flex h-full items-center">
          <NavbarItem route="" icon={<Home className="h-5"></Home>}>
            خانه
          </NavbarItem>
          <NavbarItem route="" icon={<HandHeart className="h-5"></HandHeart>}>
            خدمات
          </NavbarItem>
          <NavbarItem route="" icon={<NotebookPen className="h-5"></NotebookPen>}>
            بلاگ
          </NavbarItem>
          <NavbarItem route="" icon={<CircleAlert className="h-5"></CircleAlert>}>
            درباره ما
          </NavbarItem>
        </ul>
      </div>
      <div></div>
    </nav>
  );
}
