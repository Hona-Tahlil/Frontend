import dashback from "@/assets/dashboard/dashback.png";
import {
  Heart,
  History,
  MessageCircle,
  PawPrint,
  UserRound,
  Wallet,
} from "lucide-react";

const sidebarItems = [
  { label: "اطلاعات شخصی", icon: UserRound },
  { label: "کیف پول", icon: Wallet },
  { label: "پیام ها", icon: MessageCircle },
  { label: "تاریخچه", icon: History },
  { label: "پت ها", icon: PawPrint, active: true },
  { label: "پت های مورد علاقه", icon: Heart },
];

export default function OwnerDashboardSidebar() {
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
              return (
                <li
                  key={item.label}
                  className="flex flex-row-reverse items-center justify-between py-3"
                >
                  <Icon
                    className={`h-5 w-5 ${
                      item.active ? "text-primary" : "text-black/70"
                    }`}
                  />
                  <span
                    className={`${
                      item.active ? "font-semibold text-primary" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
