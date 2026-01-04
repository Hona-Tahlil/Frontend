import dashback from "@/assets/dashboard/dashback.png";
import {
  CalendarCheck,
  Heart,
  History,
  MessageCircle,
  PawPrint,
  UserRound,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { id: "profile", label: "اطلاعات شخصی", icon: UserRound },
  { id: "wallet", label: "کیف پول", icon: Wallet },
  { id: "messages", label: "پیام ها", icon: MessageCircle },
  { id: "history", label: "تاریخچه", icon: History },
  {
    id: "bookings",
    label: "رزرو ها",
    icon: CalendarCheck,
    href: "/Dashboard/bookings",
  },
  { id: "pets", label: "پت ها", icon: PawPrint, href: "/Dashboard/pets" },
  { id: "favorites", label: "پت های مورد علاقه", icon: Heart },
];

type SidebarItemId = (typeof sidebarItems)[number]["id"];

type OwnerDashboardSidebarProps = {
  activeItem?: SidebarItemId;
};

export default function OwnerDashboardSidebar({
  activeItem = "pets",
}: OwnerDashboardSidebarProps) {
  return (
    <aside className="w-full max-w-sm lg:sticky lg:top-24 lg:w-72">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_-22px_rgba(0,0,0,0.4)]">
        <div
          className="flex h-24 items-center justify-center bg-[#f8a65b] text-white"
          style={{
            backgroundImage: `url(${dashback})`,
            backgroundRepeat: "repeat",
            backgroundSize: "220px",
          }}
        >
          <span className="text-base font-semibold">داشبورد صاحب پت</span>
        </div>
        <nav className="px-4 py-4 text-sm text-[#3c3836]">
          <ul className="divide-y divide-black/10">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeItem;
              const content = (
                <>
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary" : "text-black/70"
                    }`}
                  />
                  <span
                    className={`${isActive ? "font-semibold text-primary" : ""}`}
                  >
                    {item.label}
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="flex w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-black/5"
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      className="flex w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-black/5"
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
