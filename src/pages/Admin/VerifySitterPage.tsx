import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getSittersService } from "@/services/sitterService";
import { changeSitterStatusService, mapStatusToBackend } from "@/services/sitterService";
import { StatusButton } from "@/components/Custom/Button/StatusButton";





import {
  initialSitters,
  statusColor,
  statusLabel,
} from "@/data/sitterConstants";
import type { Sitter, SitterStatus } from "@/data/sitterConstants";

export default function VerifySitterPage() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();


  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | SitterStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedSitterId, setSelectedSitterId] = useState<number | null>(null);

  const selectedSitter =
    selectedSitterId !== null
      ? sitters.find((s) => s.id === selectedSitterId) ?? null
      : null;


      useEffect(() => {
        const fetchSitters = async () => {
          try {
            setLoading(true);
            setError(null);
            const list = await getSittersService();
            setSitters(list);
          } catch (e) {
            setError("خطا در دریافت لیست پت‌سیترها");
          } finally {
            setLoading(false);
          }
        };
      
        fetchSitters();
      }, []);
      

      useEffect(() => {
        if (location.state?.updatedSitter) {
          const updated = location.state.updatedSitter;
    
          setSitters((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          );
    
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, [location.state, navigate, location.pathname]);

      

  const handleBack = () => {
    navigate("/admin");
  };

  const handleOpenDetails = (id: number) => {
    if (isMobile) {
      navigate(`/admin/verify-sitter/${id}`, {
        state: { sitter: sitters.find((s) => s.id === id) }
      });
      
    } else {
      setSelectedSitterId(id);
    }
  };

  const filtered = sitters.filter((sitter) => {
    const matchesStatus = filter === "all" ? true : sitter.status === filter;
    const matchesSearch =
      sitter.name.includes(search) || sitter.email.includes(search);
    return matchesStatus && matchesSearch;
  });

  const handleChangeStatus = async (newStatus: SitterStatus) => {
    if (!selectedSitterId) return;
  
    // آپدیت optimistic (سریع در UI)
    setSitters((prev) =>
      prev.map((s) =>
        s.id === selectedSitterId ? { ...s, status: newStatus } : s
      )
    );
  
    try {
      await changeSitterStatusService({
        petSitterUserID: selectedSitterId, // اگر بک‌اند ID دیگری می‌خواهد، همینجا اصلاح کن
        status: mapStatusToBackend(newStatus),
      });
    } catch (e) {
      // اگر خطا خورد، برگردان به حالت قبل (اختیاری ولی بهتر)
      setSitters((prev) =>
        prev.map((s) =>
          s.id === selectedSitterId ? { ...s, status: selectedSitter?.status ?? s.status } : s
        )
      );
      alert("خطا در تغییر وضعیت");
    }
  };
  

  return (
    <div className="flex min-h-screen font-[Alibaba]" dir="rtl">
      {!isMobile && <AdminSidebar activeItemId="verify-sitter" />}

      <div className={`flex-1 ${isMobile ? "w-screen" : ""}`} dir="rtl">
        {isMobile && (
          <div className="flex mt-5">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-small text-blue-600 font-[Alibaba]"
            >
              <ChevronRight className="w-4 h-4" />
              <span>بازگشت به داشبورد</span>
            </button>
          </div>
        )}

        <AdminContainer
          title="اعتبارسنجی پت‌سیتر"
          description="لیست پت‌سیترها و وضعیت بررسی آنها."
        >
          <div
            className={`
              mb-5
              flex
              gap-3
              ${isMobile ? "flex-col w-full" : "flex-row justify-end"}
            `}
          >

              <select
                className={`
                  border border-gray-300 rounded-lg px-2 py-1 text-small
                  ${isMobile ? "w-full" : ""}
                `}
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | SitterStatus)}
              >

              <option value="all">همه وضعیت‌ها</option>
              <option value="pending">در حال انتظار</option>
              <option value="accepted">قبول شده</option>
              <option value="rejected">رد شده</option>
            </select>

            <input
              type="text"
              placeholder="جستجو نام یا ایمیل..."
              className={`
                border border-gray-300 rounded-lg px-3 py-1 text-small
                ${isMobile ? "w-full" : ""}
              `}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {loading && (
    <div className="text-center text-small text-charcoal-500 mb-4">
      در حال دریافت اطلاعات...
    </div>
  )}

{error && (
    <div className="text-center text-small text-red-600 mb-4">
      {error}
    </div>
  )}

          {!loading && !error && (
              <>

          {isMobile ? (
            <div className="border border-charcoal-100 rounded-xl overflow-hidden">
              <table className="w-full table-fixed text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-charcoal-100 bg-charcoal-50">
                    <th className="py-2 px-1 font-semibold w-10">ردیف</th>

                    <th className="py-2 px-1 font-semibold">نام</th>

                    <th className="py-2 px-1 font-semibold w-20">وضعیت</th>

                    <th className="py-2 px-1 font-semibold w-20">جزئیات</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((sitter, index) => (
                    <tr
                      key={sitter.id}
                      className="border-b border-charcoal-100 hover:bg-charcoal-50"
                    >
                      <td className="py-1.5 px-1 text-center">{index + 1}</td>

                      <td className="py-1.5 px-1 break-words">
                        {sitter.name}
                      </td>

                      <td className="py-1.5 px-1">
                        <span
                          className={`
                            px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap 
                            ${statusColor[sitter.status]}
                          `}
                        >
                          {statusLabel[sitter.status]}
                        </span>
                      </td>

                      <td className="py-1.5 px-1 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[11px] text-admin-700 hover:underline"
                          onClick={() => handleOpenDetails(sitter.id)}
                        >
                          جزئیات
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-xs text-charcoal-400"
                      >
                        موردی با این فیلتر پیدا نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-charcoal-100 rounded-xl overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-charcoal-100 bg-charcoal-50">
                    <th className="py-3 px-2 text-small font-semibold w-4/48">
                      ردیف
                    </th>

                    <th className="py-3 px-2 text-small font-semibold w-12/48 whitespace-nowrap">
                      نام و نام خانوادگی
                    </th>

                    <th className="py-3 px-2 text-small font-semibold w-16/48">
                      ایمیل
                    </th>

                    <th className="py-3 px-2 text-small font-semibold w-9/48">
                      وضعیت
                    </th>

                    <th className="py-3 px-2 text-small font-semibold w-7/48 text-right">
                      جزئیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((sitter, index) => (
                    <tr
                      key={sitter.id}
                      className="border-b border-charcoal-100 hover:bg-charcoal-50"
                    >
                      <td className="py-3 px-2 text-small">{index + 1}</td>

                      <td className="py-3 px-2 text-small">{sitter.name}</td>

                      <td className="py-3 px-2 text-small">{sitter.email}</td>

                      <td className="py-3 px-2 text-small">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusColor[sitter.status]}`}
                        >
                          {statusLabel[sitter.status]}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-small text-left whitespace-nowrap">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-admin-700 hover:underline"
                          onClick={() => handleOpenDetails(sitter.id)}
                        >
                          مشاهده جزئیات
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-small text-charcoal-500"
                      >
                        موردی با این فیلتر پیدا نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
           </>
  )}
        </AdminContainer>
      </div>

      {!isMobile && selectedSitter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-800/40">
          <div className="bg-card rounded-3xl w-[95%] max-w-3xl p-6 shadow-xl font-[Alibaba]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">جزییات پت‌سیتر</h2>
              <button onClick={() => setSelectedSitterId(null)}>
                <X className="w-5 h-5 text-charcoal-500 hover:text-charcoal-700" />
              </button>
            </div>

            <div className="space-y-3 text-small">
              <div className="border border-charcoal-100 rounded-2xl px-4 py-3">
                <span className="font-bold text-admin-700">مشخصات</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <b>نام پت‌یار:</b> {selectedSitter.name}
                  </span>
                  <span>
                    <b>جنسیت:</b> زن
                  </span>
                  <span>
                    <b>تاریخ تولد:</b> 2005/2/12
                  </span>
                </div>
              </div>

              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-admin-700">اطلاعات تماس</span>
                <div className="mt-2 flex flex-col gap-1">
                  <span>
                    <b>ایمیل:</b> {selectedSitter.email}
                  </span>
                  <span>
                    <b>شماره تماس:</b> 09123456782
                  </span>
                </div>
              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3">
                <span className="font-bold text-admin-700">آدرس</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <b>استان:</b> تهران
                  </span>
                  <span>
                    <b>شهر:</b> تهران
                  </span>
                  <span>
                    <b>نشانی:</b> خیابان فرهنگ، کوچه ۲۳، پلاک ۱۲۳۴۵
                  </span>
                </div>
              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 text-center text-admin-700 font-bold cursor-pointer hover:bg-admin-50">
                دانلود فایل‌های آپلود شده
              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3">
                <span className="font-bold text-admin-700">خدمات:</span>
                <p>سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی</p>
              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3">
                <span className="font-bold text-admin-700">بیوگرافی:</span>
                <p className="leading-relaxed">
                  پت‌یار با تجربه و علاقه‌مند به نگهداری از حیوانات خانگی.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <StatusButton
    status="accepted"
    currentStatus={selectedSitter.status}
    onClick={() => handleChangeStatus("accepted")}
  />

  <StatusButton
    status="pending"
    currentStatus={selectedSitter.status}
    onClick={() => handleChangeStatus("pending")}
  />

  <StatusButton
    status="rejected"
    currentStatus={selectedSitter.status}
    onClick={() => handleChangeStatus("rejected")}
  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
