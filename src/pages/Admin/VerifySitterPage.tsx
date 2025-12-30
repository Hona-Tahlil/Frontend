import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { useDesktop, useTablet, useMobile } from "@/hooks/ResponsiveHooks"; 
import { useLocation } from "react-router-dom";
import type { Sitter, SitterStatus } from "@/data/sitterConstants";
import SitterDetailDialog from "@/components/SitterDetailDialog";
import SitterDetailsDrawer from "@/components/SitterDetailsDrawer";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { managePetSittersService } from "@/services/petSitterService";
import type { ManagePetSittersPayload, ManagePitSittersResponse, PetSitterListItem } from "@/types/PetSitter/searchTypes";
import { changePetSitterStatusService } from "@/services/Sitter/verifySitterService";
import type { ChangePetSitterStatusPayload } from "@/types/PetSitter/changeStatusTypes";



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
import { useQuery } from "@tanstack/react-query";
import { getPetSitterDetailsService } from "@/services/Sitter/verifySitterService";



export default function VerifySitterPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isDesktop = useDesktop();
  const isTablet = useTablet();
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [sitters, setSitters] = useState<PetSitterListItem[]>([]);
  const [filter, setFilter] = useState<"all" | SitterStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedSitterId, setSelectedSitterId] = useState<number | null>(null);
  const [selectedSitter, setSelectedSitter] = useState<PetSitterListItem | null>(null);
  const { id } = useParams();
  const queryClient = useQueryClient();


  const {
    data: sitterDetailsRes,
    isLoading: sitterDetailsLoading,
    error: sitterDetailsError,
  } = useQuery({
    queryKey: ["pet-sitter-details", id],
    queryFn: () => getPetSitterDetailsService(Number(id)),
    enabled: Boolean(id), 
  });
  
  const sitterDetails = sitterDetailsRes?.data;

  const {
    mutate: fetchSitters,
    data: sittersData,
    isPending: sittersLoading,
    error: sittersError,
  } = useMutation({
    mutationFn: (payload: ManagePetSittersPayload) => managePetSittersService(payload),
  });
  const pagination = sittersData?.data?.pagination;


  const [page, setPage] = useState(1);
  const pageSize = 10;


  const { mutate: changeStatus, isPending: changingStatus } = useMutation({
    mutationFn: (payload: ChangePetSitterStatusPayload) =>
      changePetSitterStatusService(payload),
  
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet-sitter-details", id] });
  
      fetchSitters({
        page,
        count: pageSize,
        filters: [{ field: "pet_sitters.status", op: "=", value: 1 }],
        sorts: [{ field: "updated_at", dir: "DESC" }],
      });
    },
  });
  
  


  useEffect(() => {
    fetchSitters({
      page,
      count: pageSize,
      filters: [
        { field: "pet_sitters.status", op: "=", value: 1 },
      ],
      sorts: [{ field: "updated_at", dir: "DESC" }],
    });
  }, [page, fetchSitters]);
  
  
  


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

  useEffect(() => {
    const list = sittersData?.data?.data ?? []; 
    if (list.length) {
      setSitters(
        list.map((x) => ({
          id: x.id,
          user_id: x.user_id, 
          first_name: x.first_name, 
          last_name: x.last_name, 
          email: x.email,
          phone_number: x.phone_number,
          status: x.status, 
          onboarding_step: x.onboarding_step,
          created_at: x.created_at.split(" +")[0],
        }))
      );
    }
  }, [sittersData]);
  
  
  useEffect(() => {
    if (!id) return;
    if (!sittersData?.data?.data) return;  
    const sitter = sittersData.data.data.find((s) => s.id === Number(id)) ?? null;
    if (!sitter) return;
  
    setSelectedSitter(sitter);
    setCurrentStatus(sitter.status); 

  
    if (isMobile) setOpenDrawer(true);
    else setSelectedSitterId(sitter.id); 
  }, [id, sittersData, isMobile]);
  

  const isDialogOpen =
  Boolean(id) &&
  !isMobile &&
  !sitterDetailsLoading &&
  !!sitterDetails;


  const [currentStatus, setCurrentStatus] = useState<number>(1);


  

  const handleOpenDetails = (id: number) => {
    navigate(`/admin/verify-sitter/${id}`);
  };
  


  useEffect(() => {
    if (!id) return;
  
    const sitter = sitters.find((s) => s.id === Number(id)) ?? null;
    if (!sitter) return;
  
    setSelectedSitter(sitter);
    setCurrentStatus(sitter.status); 

    if (isMobile) setOpenDrawer(true);
    else setSelectedSitterId(sitter.id); 
  }, [id, sitters, isMobile]);
  
  
  
  const statusMap: Record<"pending" | "accepted" | "rejected", number> = {
    pending: 1,
    accepted: 2,
    rejected: 3,
  };
  

  const filtered = sitters.filter((sitter) => {
    const matchesStatus = filter === "all" ? true : sitter.status === statusMap[filter];
    const q = search.trim().toLowerCase();

    const fullName = `${sitter.first_name} ${sitter.last_name}`.toLowerCase();
    const email = sitter.email.toLowerCase();
    const phone = (sitter.phone_number || "").toLowerCase();
    const createdAt = sitter.created_at.toLowerCase();

    const statusText =
    sitter.status === 1
      ? "در انتظار pending"
      : sitter.status === 2
      ? "قبول شده accepted"
      : sitter.status === 3
      ? "رد شده rejected"
      : "unknown";

    const matchesSearch =
    q === ""
      ? true
      : [fullName, email, phone, createdAt , statusText.toLowerCase()].some((field) =>
          field.includes(q),
        );

    return matchesStatus && matchesSearch;
  });

  const handleChangeStatus = (newStatus: number) => {
    if (!sitterDetails) return;
  
    // setSitters((prev) =>
    //   prev.map((s) =>
    //     s.id === selectedSitterId
    //       ? { ...s, status: newStatus }
    //       : s
    //   )
    // );
    changeStatus({
      petSitterUserID: sitterDetails.personalInfo.id,
      status: newStatus,
    });
  };


  const statusColor: Record<string, string> = {
    "1": "bg-yellow-100 text-yellow-600",  
    "2": "bg-green-100 text-green-600",    
    "3": "bg-red-100 text-red-600",       
  };



  
  
  

  return (
  <div className="min-h-screen font-[Alibaba] flex flex-col md:flex-row overflow-x-hidden" dir="rtl">
  <div className="fixed hidden md:block w-[260px] shrink-0 overflow-x-hidden">
      <AdminSidebar activeItemId="verify-sitter" />
  </div>
  <div className={"flex-1 min-w-0 overflow-x-hidden w-screen md:w-auto md:-ml-[260px]"}>

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
                      <td className="py-1.5 px-1 break-words"> {sitter.first_name} {sitter.last_name}</td>
                      <td className="py-1.5 px-1 text-[10px] break-all">
                        {sitter.created_at}
                      </td>

                      <td className="py-1.5 px-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${statusColor[sitter.status]}`}>
                        {sitter.status === 1
                          ? "در انتظار"
                          : sitter.status === 2
                          ? "فبول شده"
                          : sitter.status === 3
                          ? "رد شده"
                          : "unknown"}
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
                      <td className="py-3 px-2 text-small"> {sitter.first_name} {sitter.last_name}</td>
                      <td className="py-3 px-2 text-small whitespace-nowrap">
                        {sitter.created_at}
                      </td>

                      <td className="py-3 px-2 text-small">{sitter.email}</td>
                      <td className="py-3 px-2 text-small">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusColor[sitter.status]}`}>
                        {sitter.status === 1
                          ? "در انتظار"
                          : sitter.status === 2
                          ? "قبول شده"
                          : sitter.status === 3
                          ? "رد شده"
                          : "unknown"}
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
          {pagination && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border text-sm disabled:opacity-40"
            >
              قبلی
            </button>

            <span className="text-sm">
              صفحه {pagination.currentPage} از {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border text-sm disabled:opacity-40"
            >
              بعدی
            </button>
          </div>
          )}

        </AdminContainer>

      </div>

      {isDialogOpen && !isMobile && Boolean(id) &&(
        <SitterDetailDialog
        open={isDialogOpen}
        data={sitterDetails}   
        loading={sitterDetailsLoading}
        error={!!sitterDetailsError}
        currentStatus={sitterDetails?.status ?? 1}
        onChangeStatus={handleChangeStatus}
        onClose={() => {
          navigate("/admin/verify-sitter");
        }}
      />

      )}

      {isMobile && selectedSitterId && (
        <SitterDetailsDrawer
        open={openDrawer}
        data={sitterDetails} 
        loading={sitterDetailsLoading}
        error={!!sitterDetailsError}
        currentStatus={sitterDetails?.status ?? 1}
        onChangeStatus={handleChangeStatus}
        onClose={() => {
          setOpenDrawer(false);
          navigate("/admin/verify-sitter");
        }}
      />

      )}


    </div>
  </div>
);}
