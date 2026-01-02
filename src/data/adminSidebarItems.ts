// src/data/adminSidebarItems.ts
import {
  ShieldCheck,
  ListChecks,
  Users,
  MessageSquareMore,
  AlertCircle,
  CalendarDays,
  LockKeyhole,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS = [
  { id: "verify-sitter", label: "اعتبارسنجی پت سیتر", icon: ShieldCheck, path: "/admin/verify-sitter" },
  { id: "sitters-list", label: "نمایش لیست پت سیتر", icon: ListChecks, path: "/admin/sitters" },
  { id: "owners-list", label: "نمایش لیست پت اونر", icon: Users, path: "/admin/owners" },
  { id: "reviews", label: "نمایش نظرات", icon: MessageSquareMore, path: "/admin/reviews" },
  { id: "complaints", label: "نمایش شکایات", icon: AlertCircle, path: "/admin/complaints" },
  { id: "bookings", label: "نمایش رزروها", icon: CalendarDays, path: "/admin/bookings" },
  { id: "access", label: "دسترسی‌ها", icon: LockKeyhole, path: "/admin/access" },
] as const;

