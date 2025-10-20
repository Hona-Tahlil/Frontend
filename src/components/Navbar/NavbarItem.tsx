import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

type NavbarItemsProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  route: string;
  className?: string;
};

export default function NavbarItem({
  children,
  icon,
  route,
  className,
}: NavbarItemsProps) {
  return (
    <li className={cn("h-full", className)}>
      <Link to={route} className={ "h-full flex items-center gap-2 text-sm hover:bg-primary hover:text-white px-2 "}>
        {icon}
        {children}

      </Link>
        
    </li>
  );
}
