import BookingCard from "@/components/Booking/PetOwner/BookingCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Custom/Tabs/Tabs";
import OwnerDashboardSidebar from "@/components/Dashboard/OwnerDashboardSidebar";

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

        <OwnerDashboardSidebar />
      </div>
    </div>
  );
}
