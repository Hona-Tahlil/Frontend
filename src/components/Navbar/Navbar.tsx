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
    <header className="w-screen">
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
      <AnimatePresence>
        {/* Slide-in panel */}
        {open && (
          <motion.div>
            <button
              aria-label="Close menu backdrop"
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-semibold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl p-2 border border-neutral-200 dark:border-neutral-700 hover:shadow"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="px-4 py-4">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <a
                    href="#cta"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-semibold shadow hover:shadow-lg active:scale-[.98]"
                  >
                    Get Started
                  </a>
                </div>

                <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 px-1">
                  Tip: Press <kbd className="rounded border px-1">Esc</kbd> to
                  close.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
