import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { useDesktop, useTablet, useMobile } from "@/hooks/ResponsiveHooks"; // همون فایل هوک‌هات
import { useLocation } from "react-router-dom";
import { initialSitters, statusColor, statusLabel } from "@/data/sitterConstants";
import type { Sitter, SitterStatus } from "@/data/sitterConstants";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { StatusButton } from "@/components/Custom/Button/StatusButton";
import { useParams, useNavigate } from "react-router-dom";





export default function VerifySitterPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isDesktop = useDesktop();
  const isTablet = useTablet();
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [sitters, setSitters] = useState<Sitter[]>(initialSitters);
  const [filter, setFilter] = useState<"all" | SitterStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedSitterId, setSelectedSitterId] = useState<number | null>(null);
  const [selectedSitter, setSelectedSitter] = useState<Sitter | null>(null);


  useEffect(() => {
    if (location.state?.updatedSitter) {
      const updated = location.state.updatedSitter;
      setSitters((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleBack = () => {
    navigate("/admin");
  };

  const mainWrapClass = isMobile
  ? "w-full max-w-full px-4"
  : isTablet
  ? "w-full max-w-[820px] mx-auto px-4"
  : "w-full max-w-[1200px] mx-auto px-6 overflow-x-hidden";




  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
  
    const sitter = sitters.find((s) => s.id === Number(id)) ?? null;
    if (!sitter) return;
  
    setSelectedSitter(sitter);
    setCurrentStatus(sitter.status);
  
    if (isMobile) setOpenDrawer(true);
    else setSelectedSitterId(sitter.id); // اگر دسکتاپ دیالوگت با این باز میشه
  }, [id, sitters, isMobile]);
  

  const isDialogOpen = Boolean(id);


  const [currentStatus, setCurrentStatus] = useState<SitterStatus>("pending");


  

  const handleOpenDetails = (id: number) => {
    const sitter = sitters.find((s) => s.id === id) ?? null;
    if (!sitter) return;
  
    setSelectedSitter(sitter);
    setCurrentStatus(sitter.status);
  
    // ✅ URL را ست کن
    navigate(`/admin/verify-sitter/${id}`, { replace: false });
  
    // ✅ فقط نوع نمایش فرق کند
    if (isMobile) setOpenDrawer(true);
    else setSelectedSitterId(id); // اگر برای دسکتاپ از این state استفاده می‌کنی
  };


  useEffect(() => {
    if (!id) return;
  
    const sitter = sitters.find((s) => s.id === Number(id)) ?? null;
    if (!sitter) return;
  
    setSelectedSitter(sitter);
    setCurrentStatus(sitter.status);
  
    if (isMobile) setOpenDrawer(true);
    else setSelectedSitterId(sitter.id); // اگر دسکتاپ دیالوگت با این باز میشه
  }, [id, sitters, isMobile]);
  
  


  const changeStatus = (newStatus: SitterStatus) => {
    if (!selectedSitter) return;
  
    setCurrentStatus(newStatus);
  
    setSitters((prev) =>
      prev.map((s) =>
        s.id === selectedSitter.id ? { ...s, status: newStatus } : s
      )
    );
  };
  
  

  const filtered = sitters.filter((sitter) => {
    const matchesStatus = filter === "all" ? true : sitter.status === filter;
    const q = search.trim();

    const matchesSearch =
      q === ""
        ? true
        : [
            sitter.name,
            sitter.email,
            sitter.requestedAt,
            statusLabel[sitter.status], // سرچ با متن فارسی وضعیت
            sitter.status,              // سرچ با pending/accepted/rejected
          ].some((field) => field.toLowerCase().includes(q.toLowerCase()));
        return matchesStatus && matchesSearch;
  });

  const handleChangeStatus = (newStatus: SitterStatus) => {
    if (!selectedSitterId) return;
    setSitters((prev) =>
      prev.map((s) =>
        s.id === selectedSitterId ? { ...s, status: newStatus } : s
      )
    );
  };

  const handleDrawerOpenChange = (open: boolean) => {
    setOpenDrawer(open);
    if (!open) navigate("/admin/verify-sitter");
  };

  return (
  <div className="min-h-screen font-[Alibaba] flex flex-col md:flex-row overflow-x-hidden" dir="rtl">
  {/* {isDesktop  && <AdminSidebar activeItemId="verify-sitter" />} */}
  <div className="hidden md:block w-[260px] shrink-0 overflow-x-hidden">
      <AdminSidebar activeItemId="verify-sitter" />
    </div>
  <div className="flex-1 min-w-0 overflow-x-hidden">
  <div className={mainWrapClass}>

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
        
        <AdminContainer title="اعتبارسنجی پت‌سیتر" description="لیست پت‌سیترها و وضعیت بررسی آنها.">
          <div className={`mb-5 flex gap-3 ${isMobile ? "flex-col w-full" : "flex-row justify-end"}`}>
            
            <input
              type="text"
              placeholder="جستجو   ..."
              className={`border border-gray-300 rounded-lg px-3 py-1 text-small ${isMobile ? "w-full" : ""}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {isMobile ? (
            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="py-2 px-1 font-semibold ">ردیف</th>
                    <th className="py-2 px-1 font-semibold">نام</th>
                    <th className="py-2 px-1 font-semibold ">زمان درخواست</th>
                    <th className="py-2 px-1 font-semibold ">وضعیت</th>
                    <th className="py-2 px-1 font-semibold ">جزئیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sitter, index) => (
                    <tr key={sitter.id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-1.5 px-1 text-center">{index + 1}</td>
                      <td className="py-1.5 px-1 break-words">{sitter.name}</td>
                      <td className="py-1.5 px-1 text-[10px] break-all">
                        {sitter.requestedAt}
                      </td>

                      <td className="py-1.5 px-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${statusColor[sitter.status]}`}>
                          {statusLabel[sitter.status]}
                        </span>
                      </td>
                      <td className="py-1.5 px-1 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
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
                      <td colSpan={5} className="py-4 text-center text-xs text-gray-500">
                        موردی با این فیلتر پیدا نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full table-auto text-right border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="py-3 px-2 text-small font-semibold">ردیف</th>
                    <th className="py-3 px-2 text-small font-semibold whitespace-nowrap">نام و نام خانوادگی</th>
                    <th className="py-3 px-2 text-small font-semibold whitespace-nowrap">زمان ارسال درخواست</th>
                    <th className="py-3 px-2 text-small font-semibold">ایمیل</th>
                    <th className="py-3 px-2 text-small font-semibold">وضعیت</th>
                    <th className="py-3 px-2 text-small font-semibold text-right">جزئیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sitter, index) => (
                    <tr key={sitter.id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-3 px-2 text-small">{index + 1}</td>
                      <td className="py-3 px-2 text-small">{sitter.name}</td>
                      <td className="py-3 px-2 text-small whitespace-nowrap">
                        {sitter.requestedAt}
                      </td>

                      <td className="py-3 px-2 text-small">{sitter.email}</td>
                      <td className="py-3 px-2 text-small">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusColor[sitter.status]}`}>
                          {statusLabel[sitter.status]}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-small text-left whitespace-nowrap">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
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
                      <td colSpan={6} className="py-6 text-center text-small text-gray-500">
                        موردی با این فیلتر پیدا نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </AdminContainer>
      </div>

      {!isMobile && selectedSitter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl w-[95%] max-w-3xl p-6 shadow-xl font-[Alibaba]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">جزییات پت‌سیتر</h2>
              <button
                onClick={() => {
                  setSelectedSitterId(null);
                  setSelectedSitter(null);
                  navigate("/admin/verify-sitter");
                }}
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
              
            </div>
            <div className="space-y-3 text-small">
              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-blue-700">مشخصات</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span><b>نام پت‌یار:</b> {selectedSitter.name}</span>
                  <span><b>جنسیت:</b> زن</span>
                  <span><b>تاریخ تولد:</b> 2005/2/12</span>
                </div>
              </div>
              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-blue-700">اطلاعات تماس</span>
                <div className="mt-2 flex flex-col gap-1">
                  <span><b>ایمیل:</b> {selectedSitter.email}</span>
                  <span><b>شماره تماس:</b> 09123456782</span>
                </div>
              </div>
              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-blue-700">آدرس</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span><b>استان:</b> تهران</span>
                  <span><b>شهر:</b> تهران</span>
                  <span><b>نشانی:</b> خیابان فرهنگ، کوچه ۲۳، پلاک ۱۲۳۴۵</span>
                </div>
              </div>
              <div className="border border-gray-300 rounded-2xl px-4 py-3 text-center text-blue-700 font-bold cursor-pointer hover:bg-blue-50">
                دانلود فایل‌های آپلود شده
              </div>
              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-blue-700">خدمات:</span>
                <p>سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی</p>
              </div>
              <div className="border border-gray-300 rounded-2xl px-4 py-3">
                <span className="font-bold text-blue-700">بیوگرافی:</span>
                <p className="leading-relaxed">پت‌یار با تجربه و علاقه‌مند به نگهداری از حیوانات خانگی.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleChangeStatus("accepted")}
                className={`flex-1 rounded-full py-2 text-small font-bold ${selectedSitter.status === "accepted" ? "bg-green-500 text-white" : "border border-green-500 text-green-700 hover:bg-green-50"}`}
              >
                تایید
              </button>
              <button
                onClick={() => handleChangeStatus("pending")}
                className={`flex-1 rounded-full py-2 text-small font-bold ${selectedSitter.status === "pending" ? "bg-yellow-400 text-white" : "border border-yellow-400 text-yellow-600 hover:bg-yellow-50"}`}
              >
                در انتظار
              </button>
              <button
                onClick={() => handleChangeStatus("rejected")}
                className={`flex-1 rounded-full py-2 text-small font-bold ${selectedSitter.status === "rejected" ? "bg-red-500 text-white" : "border border-red-500 text-red-600 hover:bg-red-50"}`}
              >
                رد
              </button>
            </div>
          </div>
        </div>
        
      )}
      {isMobile && selectedSitter && (
      <Drawer open={openDrawer} onOpenChange={handleDrawerOpenChange}>

<DrawerContent className="h-[90vh] flex flex-col text-right" dir="rtl">

        <DrawerHeader className="text-right shrink-0">
          <DrawerTitle>جزییات پت‌سیتر</DrawerTitle>
          <p className="text-sm text-muted-foreground">
            اطلاعات کامل پت‌سیتر انتخاب‌شده.
          </p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-6">

          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[currentStatus]}`}
            >
              {statusLabel[currentStatus]}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <StatusButton
              status="accepted"
              currentStatus={currentStatus}
              onClick={() => changeStatus("accepted")}
            />
            <StatusButton
              status="pending"
              currentStatus={currentStatus}
              onClick={() => changeStatus("pending")}
            />
            <StatusButton
              status="rejected"
              currentStatus={currentStatus}
              onClick={() => changeStatus("rejected")}
            />
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-admin-700">مشخصات</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <span><b>نام پت‌یار:</b> {selectedSitter.name}</span>
              <span><b>جنسیت:</b> زن</span>
              <span><b>تاریخ تولد:</b> 2005/2/12</span>
            </div>
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-admin-700">اطلاعات تماس</span>
            <div className="mt-2 flex flex-col gap-1">
              <span><b>ایمیل:</b> {selectedSitter.email}</span>
              <span><b>شماره تماس:</b> 09123456782</span>
            </div>
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-admin-700">آدرس</span>
            <p className="mt-2">
              تهران، خیابان فرهنگ، کوچه ۲۳
            </p>
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5 text-center text-admin-700 font-bold hover:bg-admin-50">
            دانلود فایل‌های آپلود شده
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-admin-700">خدمات:</span>
            <p>سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی</p>
          </div>

          <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-admin-700">بیوگرافی:</span>
            <p className="leading-relaxed">
              پت‌یار با تجربه و علاقه‌مند به نگهداری از حیوانات خانگی.
            </p>
          </div>

        </div>

        <div className="p-4 border-t shrink-0">
          <DrawerClose asChild>
            <button className="w-full rounded-xl border py-2 font-bold">
              بستن
            </button>
          </DrawerClose>
        </div>

      </DrawerContent>

    </Drawer>

    )}

  </div></div>
          );}
