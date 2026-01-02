"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarItems";

interface AdminSidebarProps {
  activeItemId?: string;
  onChangeActive?: (id: string) => void;
  className?: string;
}

export function AdminSidebar({
  activeItemId,
  onChangeActive,
  className,
}: AdminSidebarProps) {
  const [activeId, setActiveId] = useState<string>(
    activeItemId ?? ADMIN_SIDEBAR_ITEMS[0]?.id
  );

  const navigate = useNavigate();

  const handleClick = (id: string, path?: string) => {
    setActiveId(id);
    onChangeActive?.(id);
    if (path) navigate(path);
  };

  useEffect(() => {
    console.log(activeId);
  },[activeId]);

  return (
    <aside
      className={cn(
        `
        bg-admin-sidebar text-admin-sidebar-foreground shadow-lg
        flex flex-col

        /* Desktop */
        w-64 h-screen

        /* Mobile → Fullscreen Sidebar */
        sm:w-64 sm:h-screen
        w-full min-h-screen
        py-6
      `,
        className
      )}
    >
      {/* هدر سایدبار */}
      <div className="flex items-center justify-center py-4 w-full">
        <span className="text-2xl font-extrabold text-white">PetYar</span>
      </div>

      {/* آیتم‌های منو */}
      <nav className="flex-1 flex flex-col w-full mt-4">
        {ADMIN_SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id, item.path)}
              className={cn(
                `
                  flex items-center justify-between 
                  w-full py-3 px-4 text-base
                  border-b border-white/20
                  transition
                `,
                "hover:bg-white/10 hover:text-white",
                isActive && "bg-white text-admin-sidebar shadow-sm"
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* خروج */}
      <div className="w-full mt-6 pt-4 border-t border-white/20">
        <button
          type="button"
          className="w-full flex items-center justify-between bg-white text-admin-sidebar py-3 px-4 font-semibold hover:bg-gray-100"
        >
          <span>خروج از پنل ادمین</span>
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}
