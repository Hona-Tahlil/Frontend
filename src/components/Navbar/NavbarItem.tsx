import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type NavbarItemsProps = {
  text: string;
  icon?: React.ReactNode;
  route: string;
  className?: string;
};

export default function NavbarItem({
  text,
  icon,
  route,
  className,
}: NavbarItemsProps) {
  return (
    <li className={cn("h-full", className)}>
      <Link to={route} className={ "h-full flex items-center gap-2 text-sm hover:text-primary px-2  "}>
        {icon}
        {text}

      </Link>
        
    </li>
  );
}
