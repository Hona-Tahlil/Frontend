import BookingCard from "@/components/Booking/PetOwner/BookingCard";
import type { CardStatus } from "@/types/bookingCardTypes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Custom/Tabs/Tabs";
import OwnerDashboardSidebar from "@/components/Dashboard/OwnerDashboardSidebar";
import { searchRequestsService } from "@/services/Requests/searchRequestsService";
import {
  RequestStatus,
  type SearchRequestsApiItem,
  type SearchRequestsPayload,
} from "@/types/Requests/searchRequests";
import { REQUESTS_QUERY_KEY } from "@/queryKeys/requests";
import { useQuery } from "@tanstack/react-query";
import { convertGregorianToJalaliDate } from "@/utils/convertJalaliToGeorgian";

const requestPayload: SearchRequestsPayload = {
  page: 1,
  count: 20,
  filters: [],
  sorts: [
    {
      field: "created_at",
      dir: "DESC",
    },
  ],
};

const mapRequestStatusToCardStatus = (status: RequestStatus): CardStatus => {
  switch (status) {
    case RequestStatus.Pending:
      return "pending";
    case RequestStatus.Accepted:
      return "accepted";
    case RequestStatus.Paid:
    case RequestStatus.Finished:
      return "done";
    case RequestStatus.Canceled:
      return "canceled";
    case RequestStatus.Dismissed:
      return "rejected";
    case RequestStatus.Conflict:
      return "pending";
    default:
      return "pending";
  }
};

const formatJalaliDate = (value: Date) => {
  const { jy, jm, jd } = convertGregorianToJalaliDate(value);
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${jy}/${pad(jm)}/${pad(jd)}`;
};

const formatDateTime = (value: string) => {
  if (!value) {
    return { date: "-", time: "-" };
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return {
      date: "-",
      time: "-",
    };
  }
  const date = formatJalaliDate(parsed);
  const time = `${String(parsed.getHours()).padStart(2, "0")}:${String(
    parsed.getMinutes(),
  ).padStart(2, "0")}`;
  return { date, time };
};

const formatLocation = (item: SearchRequestsApiItem) => {
  const parts = [item.address?.provinceName, item.address?.cityName].filter(
    Boolean,
  );
  return parts.length ? parts.join("، ") : "-";
};

const mapRequestToCard = (item: SearchRequestsApiItem) => {
  const slotDate = item.calendarSlots?.[0]?.date || item.updatedAt;
  const { date, time } = formatDateTime(slotDate);
  return {
    requestID: item.requestID,
    title: `${item.petSitterFirstName} ${item.petSitterLastName}`,
    services: item.service.type,
    location: formatLocation(item),
    date,
    time,
    cost: item.totalPrice || item.service.price,
    cardStatus: mapRequestStatusToCardStatus(item.status.num),
  };
};

export default function OwnerBookings() {
  const { data, isLoading, isError } = useQuery({
    queryKey: REQUESTS_QUERY_KEY,
    queryFn: () => searchRequestsService(requestPayload),
  });
  const cards = (data?.data.data ?? []).map(mapRequestToCard);
  const activeCards = cards.filter(
    (card) => card.cardStatus === "pending" || card.cardStatus === "accepted",
  );
  const pastCards = cards.filter((card) => card.cardStatus === "done");
  const canceledCards = cards.filter(
    (card) => card.cardStatus === "canceled" || card.cardStatus === "rejected",
  );

  const renderCards = (items: ReturnType<typeof mapRequestToCard>[]) => {
    if (isLoading) {
      return (
        <div className="flex h-40 items-center justify-center text-sm text-black/50">
          در حال بارگذاری...
        </div>
      );
    }
    if (isError) {
      return (
        <div className="flex h-40 items-center justify-center text-sm text-black/50">
          خطا در دریافت اطلاعات.
        </div>
      );
    }
    if (!items.length) {
      return (
        <div className="flex h-40 items-center justify-center text-sm text-black/50">
          موردی برای نمایش نیست.
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {items.map((item) => (
          <BookingCard
            key={item.requestID}
            side="petowner"
            cardStatus={item.cardStatus}
            requestID={item.requestID}
            title={item.title}
            services={item.services}
            location={item.location}
            date={item.date}
            time={item.time}
            cost={item.cost}
          />
        ))}
      </div>
    );
  };

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
                {renderCards(activeCards)}
              </TabsContent>
              <TabsContent value="past">
                {renderCards(pastCards)}
              </TabsContent>
              <TabsContent value="canceled">
                {renderCards(canceledCards)}
              </TabsContent>
            </Tabs>
          </section>
        </main>

        <OwnerDashboardSidebar />
      </div>
    </div>
  );
}
