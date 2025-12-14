import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AdminContainer } from "@/components/Admin/AdminContainer";

import {
  initialSitters,
  statusColor,
  statusLabel
} from "@/data/sitterConstants";

import type { Sitter, SitterStatus } from "@/data/sitterConstants";

export default function VerifySitterDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const sitterFromPage: Sitter | undefined = location.state?.sitter;

  const sitter: Sitter | null =
    sitterFromPage ??
    initialSitters.find((s) => s.id === Number(id)) ??
    null;

  const [currentStatus, setCurrentStatus] = useState<SitterStatus>(
    sitter?.status ?? "pending"
  );

  const [updatedSitter, setUpdatedSitter] = useState<Sitter | null>(null);

  useEffect(() => {
    if (sitter) {
      setCurrentStatus(sitter.status);
    }
  }, [sitter]);

  const changeStatus = (newStatus: SitterStatus) => {
    if (!sitter) return;

    setCurrentStatus(newStatus);

    setUpdatedSitter({ ...sitter, status: newStatus });
  };

  const goBack = () => {
    navigate("/admin/verify-sitter", {
      state: {
        updatedSitter: updatedSitter ?? sitter
      }
    });
  };

  if (!sitter) {
    return (
      <div className="p-6 text-center">
        <p>پت‌سیتر یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-[Alibaba]" dir="rtl">
      <div className="flex-1 w-screen px-4 py-4">

        <button
          onClick={goBack}
          className="inline-flex items-center gap-1 text-blue-600 text-small mb-4"
        >
          <ChevronRight className="w-4 h-4" />
          بازگشت
        </button>

        <AdminContainer
          title="جزییات پت‌سیتر"
          description="اطلاعات کامل پت‌سیتر انتخاب‌شده."
        >

          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[currentStatus]}`}
            >
              {statusLabel[currentStatus]}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-4">

            <button
              onClick={() => changeStatus("accepted")}
              className={`w-full rounded-full py-2 text-small font-bold ${
                currentStatus === "accepted"
                  ? "bg-green-500 text-white"
                  : "border border-green-500 text-green-700 hover:bg-green-50"
              }`}
            >
              تایید شده
            </button>

            <button
              onClick={() => changeStatus("pending")}
              className={`w-full rounded-full py-2 text-small font-bold ${
                currentStatus === "pending"
                  ? "bg-yellow-400 text-white"
                  : "border border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              در حال انتظار
            </button>

            <button
              onClick={() => changeStatus("rejected")}
              className={`w-full rounded-full py-2 text-small font-bold ${
                currentStatus === "rejected"
                  ? "bg-red-500 text-white"
                  : "border border-red-500 text-red-600 hover:bg-red-50"
              }`}
            >
              رد شده
            </button>

          </div>


          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">مشخصات</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <span><b>نام پت‌یار:</b> {sitter.name}</span>
              <span><b>جنسیت:</b> زن</span>
              <span><b>تاریخ تولد:</b> 2005/2/12</span>
            </div>
          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">اطلاعات تماس</span>
            <div className="mt-2 flex flex-col gap-1">
              <span><b>ایمیل:</b> {sitter.email}</span>
              <span><b>شماره تماس:</b> 09123456782</span>
            </div>
          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">آدرس</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <span><b>استان:</b> تهران</span>
              <span><b>شهر:</b> تهران</span>
              <span><b>نشانی:</b> خیابان فرهنگ، کوچه ۲۳، پلاک ۱۲۳۴۵</span>
            </div>
          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5 text-center text-blue-700 font-bold hover:bg-blue-50">
            دانلود فایل‌های آپلود شده
          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">خدمات:</span>
            <p>سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی</p>
          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">بیوگرافی:</span>
            <p className="leading-relaxed">
              پت‌یار با تجربه و علاقه‌مند به نگهداری از حیوانات خانگی.
            </p>
          </div>

        </AdminContainer>
      </div>
    </div>
  );
}
