import BookingCard from "@/components/Booking/PetOwner/BookingCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Custom/Tabs/Tabs";
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

export default function OwnerBookings() {
  return (
    <div className="min-h-screen bg-[#fff4ef] px-5 py-10" dir="rtl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row-reverse lg:items-start">
        <main className="flex-1">
          <h1 className="mb-6 text-right text-2xl font-semibold text-[#2f2a28]">
            رزرو های من
          </h1>
          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_30px_-25px_rgba(0,0,0,0.4)] sm:p-8">
            <Tabs defaultValue="canceled">
              <TabsList className="mb-6 gap-6">
                <TabsTrigger value="active">رزرو های فعال</TabsTrigger>
                <TabsTrigger value="past">رزرو های گذشته</TabsTrigger>
                <TabsTrigger value="canceled">لغو شده</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="flex h-40 items-center justify-center text-sm text-black/50">
                  موردی برای نمایش نیست.
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="flex h-40 items-center justify-center text-sm text-black/50">
                  موردی برای نمایش نیست.
                </div>
              </TabsContent>
              <TabsContent value="canceled">
                <div className="space-y-6">
                  <BookingCard
                    side="petowner"
                    cardStatus="canceled"
                    title="جمیز باند"
                    services="نگهداری، آرایش"
                    location="تهران، نیاوران"
                    date="1403/08/20"
                    time="10:00"
                    cost={123000}
                  />
                  <BookingCard
                    side="petowner"
                    cardStatus="rejected"
                    title="جمیز باند"
                    services="نگهداری، آرایش"
                    location="تهران، نیاوران"
                    date="1403/08/20"
                    time="10:00"
                    cost={123000}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>

        <aside className="w-full max-w-sm lg:sticky lg:top-10 lg:w-72">
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
      </div>
    </div>
  );
}
