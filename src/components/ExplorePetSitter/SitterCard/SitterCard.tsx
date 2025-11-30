import { PawPrint, MapPin, Dog, Cat, Bird, Rat, House } from "lucide-react";
import { Button } from "@/components/Custom/Button/Button";
import type { PetSitter } from "@/types/PetSitter";
import { SERVICE_OPTIONS } from "@/types/services";

interface SitterCardProps {
  sitter: PetSitter;
}

export default function SitterCard({ sitter }: SitterCardProps) {
  const fullStars = Math.round(sitter.rating);
  const stars = "★".repeat(fullStars).padEnd(5, "☆");

  return (
    <div className="rounded-[24px] border border-orange-300 bg-white/90 px-6 py-5 flex flex-col justify-between">
      {/* بالا */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
            <PawPrint className="h-8 w-8 text-orange-500" />
          </div>

          <div className="flex-1 space-y-1 text-right">
            <h3 className="text-lg font-semibold text-slate-900">{sitter.name}</h3>

            <div className="flex items-center justify-start gap-1 text-xs text-slate-500">
              <span className="text-sm text-orange-400">{stars}</span>
              <span>({sitter.reviewsCount} نظر)</span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>{sitter.city}</span>
            </div>
          </div>
        </div>

        {/* قیمت */}
        <div className="mt-6 text-right text-sm text-slate-700">
          شروع قیمت از{" "}
          <span className="font-semibold text-orange-500">
            {sitter.pricePerNight.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* خدمات */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {sitter.services.map((service) => {
              const label =
                SERVICE_OPTIONS.find((s) => s.value === service)?.label ||
                "سرویس";

              return (
                <div
                  key={service}
                  className="flex items-center gap-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-1 text-xs font-medium text-white shadow-lg"
                >
                  <House className="h-3 w-3" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          {/* پت‌ها */}
          <div className="flex items-center gap-2 text-orange-500">
            {sitter.pets.includes("cat") && <Cat className="h-5 w-5" />}
            {sitter.pets.includes("dog") && <Dog className="h-5 w-5" />}
            {sitter.pets.includes("bird") && <Bird className="h-5 w-5" />}
            {sitter.pets.includes("rodent") && <Rat className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="mt-5 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-full border-orange-500 px-4 py-2.5 text-xs font-semibold text-orange-500 
          focus:outline-none active:scale-100 active:shadow-none transition-none cursor-pointer"
        >
          مشاهده پروفایل
        </Button>

        <Button
          className="flex-1 rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white
          focus:outline-none active:scale-100 active:shadow-none transition-none cursor-pointer"
        >
          رزرو فوری
        </Button>
      </div>
    </div>
  );
}
