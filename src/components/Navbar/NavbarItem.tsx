import React from "react";

type NavbarItemsProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  route: string;
};

export default function NavbarItem({
  children,
  icon,
  route,
}: NavbarItemsProps) {
  return (
    <li className="h-full">
      <a href={route} className="h-full flex items-center gap-2 text-sm hover:bg-primary hover:text-white px-2">
        {icon}
        {children}

      </a>
        
    </li>
  );
}
