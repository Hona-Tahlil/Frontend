import React, { useEffect, useRef } from 'react';
import { X } from "lucide-react";
import type { PetSitterFull } from "@/types/PetSitter/PetSitterFull";
import { saveAs } from 'file-saver';


type SitterDetailDialogProps = {
  open: boolean;
  data?: PetSitterFull;
  currentStatus: number;

  onChangeStatus: (newStatus: number) => void;
  loading: boolean;
  error: boolean;
  onClose: () => void;
};

  

const SitterDetailDialog: React.FC<SitterDetailDialogProps> = ({
  data,
  loading,
  error,
  currentStatus,
  onChangeStatus,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => { 
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose(); 
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const downloadFile = (url: string) => {
    if (url) {
      saveAs(url);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl p-6 text-sm">
          در حال دریافت اطلاعات پت‌سیتر...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl p-6 text-sm text-red-600">
          خطا در دریافت اطلاعات پت‌سیتر
        </div>
      </div>
    );
  }
  
  if (!data || !data.personalInfo) return null;
    console.log(data);

  const statusBtnClass = (statusNumber: number, activeClass: string, idleClass: string) =>
    `flex-1 rounded-full py-2 text-small font-bold ${
      currentStatus === statusNumber ? activeClass : idleClass
    }`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-[99%] max-w-3xl max-h-[80vh] p-6 shadow-xl font-[Alibaba] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold">جزییات پت‌سیتر</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>

        </div>
        <div className="space-y-3 text-small">
          <div className="border border-gray-300 rounded-2xl px-4 py-3">
            <span className="font-bold text-blue-700">مشخصات</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span>
              <b>نام پت‌یار:</b>{" "}
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </span>
            <span><b>جنسیت:</b> {data.personalInfo.gender}</span>
            </div>
          </div>
          <div className="border border-gray-300 rounded-2xl px-4 py-3">
            <span className="font-bold text-blue-700">اطلاعات تماس</span>
            <div className="mt-2 flex flex-col gap-1">
            <span><b>ایمیل:</b> {data.personalInfo.email}</span>
            <span><b>شماره تماس:</b> {data.personalInfo.phone || "-"}</span>

            </div>
          </div>
          <div className="border border-gray-300 rounded-2xl px-4 py-3">
            <span className="font-bold text-blue-700">آدرس</span>
            <div className="border border-gray-300 rounded-2xl px-4 py-3">
            <span className="font-bold text-blue-700">آدرس</span>
            <p className="mt-2">
            {data.personalInfo.address.provinceName}،
            {data.personalInfo.address.cityName}
            {data.personalInfo.address.streetAddress && `، ${data.personalInfo.address.streetAddress}`}
            ، پلاک {data.personalInfo.address.houseNumber}
            {data.personalInfo.address.unit && `، واحد ${data.personalInfo.address.unit}`}
          </p>
            
          </div>


          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5 text-center text-blue-700 font-bold cursor-pointer hover:bg-blue-50">
          <button
            onClick={() => downloadFile(data.documents.certificate_files?.[0] || '')}
            disabled={!data.documents.certificate_files?.[0]}
            className={`text-sm font-semibold ${!data.documents.certificate_files?.[0] ? 'text-blue-400' : 'text-blue-600'} disabled:text-gray-400`}
          >
            دانلود گواهینامه‌ها
          </button>
          <br />
          <button
            onClick={() => downloadFile(data.documents.files?.[0] || '')}
            disabled={!data.documents.files?.[0]}
            className={`text-sm font-semibold ${!data.documents.files?.[0] ? 'text-blue-400' : 'text-blue-600'} disabled:text-gray-400`}
          >
            دانلود فایل‌ها
          </button>
            


          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">خدمات:</span>
            <p>
              {data.skills.services.map((s) => s.type).join("، ")}
            </p>

          </div>

          <div className="border border-gray-300 rounded-2xl px-4 py-3 mt-5">
            <span className="font-bold text-blue-700">بیوگرافی:</span>
            <p className="leading-relaxed">{data.skills.bio}</p>

          </div>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
            onClick={() => onChangeStatus(2)}
            className={statusBtnClass(2, "bg-green-500 text-white", "border border-green-500 text-green-700 hover:bg-green-50")}
          >
            تایید
          </button>
          <button
            onClick={() => onChangeStatus(1)}
            className={statusBtnClass(1, "bg-yellow-400 text-white", "border border-yellow-400 text-yellow-600 hover:bg-yellow-50")}
          >
            در انتظار
          </button>
          <button
            onClick={() => onChangeStatus(3)}
            className={statusBtnClass(3, "bg-red-500 text-white", "border border-red-500 text-red-600 hover:bg-red-50")}
          >
            رد
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitterDetailDialog;
