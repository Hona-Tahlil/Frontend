import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { StatusButton } from "@/components/Custom/Button/StatusButton";
// import type { Sitter, SitterStatus } from "@/data/sitterConstants";
import { X } from "lucide-react";
// import { statusColor, statusLabel } from "@/data/sitterConstants";
import type { PetSitterFull } from "@/types/PetSitter/PetSitterFull";

type SitterDetailsDrawerProps = {
  open: boolean;
  data?: PetSitterFull;
  currentStatus: number;
  loading: boolean;
  error: boolean;
  onChangeStatus: (newStatus: number) => void;
  onClose: () => void;
};

const SitterDetailsDrawer: React.FC<SitterDetailsDrawerProps> = ({
  open,
  data,
  loading,
  error,
  currentStatus,
  onChangeStatus,
  onClose,
}) => {
  const statusBtnClass = (statusNumber: number, activeClass: string, idleClass: string) =>
    `flex-1 rounded-full py-2 text-small font-bold ${
      currentStatus === statusNumber ? activeClass : idleClass
    }`;


  
  

  return (
    <Drawer
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DrawerContent className="h-[90vh] flex flex-col text-right" dir="rtl">
        <DrawerHeader className="text-right shrink-0">
          <DrawerTitle>جزییات پت‌سیتر</DrawerTitle>
          <p className="text-sm text-muted-foreground">اطلاعات کامل پت‌سیتر انتخاب‌شده.</p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {loading && (
            <div className="py-10 text-center text-sm text-gray-500">
              در حال دریافت اطلاعات...
            </div>
          )}

          {error && (
            <div className="py-10 text-center text-sm text-red-600">
              خطا در دریافت اطلاعات پت‌سیتر
            </div>
          )}

          {!loading && !error && data && (
            <>
              <div className="mb-4">
                <span
                  className={[
                    "px-3 py-1 rounded-full text-xs font-bold",
                    currentStatus === 1
                      ? "bg-yellow-100 text-yellow-600"
                      : currentStatus === 2
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600",
                  ].join(" ")}
                >
                  {currentStatus === 1
                    ? "در انتظار"
                    : currentStatus === 2
                    ? "قبول شده"
                    : "رد شده"}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onChangeStatus(2)}
                  className={statusBtnClass(
                    2,
                    "bg-green-500 text-white",
                    "border border-green-500 text-green-700 hover:bg-green-50"
                  )}
                >
                  تایید
                </button>

                <button
                  onClick={() => onChangeStatus(1)}
                  className={statusBtnClass(
                    1,
                    "bg-yellow-400 text-white",
                    "border border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  )}
                >
                  در انتظار
                </button>

                <button
                  onClick={() => onChangeStatus(3)}
                  className={statusBtnClass(
                    3,
                    "bg-red-500 text-white",
                    "border border-red-500 text-red-600 hover:bg-red-50"
                  )}
                >
                  رد
                </button>
              </div>

              {/* مشخصات */}
              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">مشخصات</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <b>نام پت‌یار:</b> {data.personalInfo.firstName}{" "}
                    {data.personalInfo.lastName}
                  </span>
                  <span>
                    <b>جنسیت:</b> {data.personalInfo.gender}
                  </span>
                </div>
              </div>

              {/* اطلاعات تماس */}
              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">اطلاعات تماس</span>
                <div className="mt-2 flex flex-col gap-1">
                  <span>
                    <b>ایمیل:</b> {data.personalInfo.email}
                  </span>
                  <span>
                    <b>شماره تماس:</b> {data.personalInfo.phone || "-"}
                  </span>
                </div>
              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">آدرس</span>
                <p className="mt-2">
                {data.personalInfo.address.provinceName}،
                {data.personalInfo.address.cityName}
                {data.personalInfo.address.streetAddress && `، ${data.personalInfo.address.streetAddress}`}
                ، پلاک {data.personalInfo.address.houseNumber}
                {data.personalInfo.address.unit && `، واحد ${data.personalInfo.address.unit}`}
              </p>

              </div>

              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">فایل‌های آپلود شده</span>

                <div className="mt-2 space-y-2">
                  {!!data.documents?.files?.length && (
                    <div>
                      <div className="text-xs text-gray-500 mb-1">مدارک</div>
                      <ul className="list-disc pr-5 space-y-1">
                        {data.documents.files.map((url, i) => (
                          <li key={i} className="text-sm break-all">
                            <a className="text-blue-600 underline" href={url} target="_blank" rel="noreferrer">
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!!data.documents?.certificate_files?.length && (
                    <div>
                      <div className="text-xs text-gray-500 mb-1">گواهی‌ها</div>
                      <ul className="list-disc pr-5 space-y-1">
                        {data.documents.certificate_files.map((url, i) => (
                          <li key={i} className="text-sm break-all">
                            <a className="text-blue-600 underline" href={url} target="_blank" rel="noreferrer">
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!data.documents?.files?.length &&
                    !data.documents?.certificate_files?.length && (
                      <div className="text-sm text-gray-500">فایلی ثبت نشده است.</div>
                    )}
                </div>
              </div>

              {/* خدمات */}
              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">خدمات:</span>
                <p className="mt-1">
                  {data.skills.services?.length
                    ? data.skills.services.map((s) => s.type).join("، ")
                    : "-"}
                </p>
              </div>

              {/* بیو */}
              <div className="border border-charcoal-100 rounded-2xl px-4 py-3 mt-5">
                <span className="font-bold text-admin-700">بیوگرافی:</span>
                <p className="leading-relaxed mt-1">{data.skills.bio || "-"}</p>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t shrink-0">
          <DrawerClose asChild>
            <button className="w-full rounded-xl border py-2 font-bold">
              بستن
            </button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SitterDetailsDrawer;
