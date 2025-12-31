import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog";
//   import { Badge } from "./ui/badge";
  import {
    Clock,
    Bone,
    CreditCard,
    MapPin,
    Calendar,
  } from "lucide-react";
  
  interface RequestDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export function RequestDetailsDialog({
    open,
    onOpenChange,
  }: RequestDetailsDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات درخواست</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-4 py-4">
            {/* Service Type */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bone className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">نوع خدمت</p>
                <p className="">نگهداری از سگ</p>
              </div>
            </div>
  
            {/* Time */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">زمان خدمت</p>
                <p className="">
                  ۱۴۰۳/۰۹/۱۵ - ساعت ۹:۰۰ تا ۱۷:۰۰
                </p>
              </div>
            </div>
  
            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">تاریخ</p>
                <p className="">فردا - ۲۲ آذر ۱۴۰۳</p>
              </div>
            </div>
  
            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">موقعیت</p>
                <p className="">تهران، منطقه ۳، خیابان ولیعصر</p>
              </div>
            </div>
  
            {/* Payment */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  وضعیت پرداخت
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="">۵۰۰,۰۰۰ تومان</p>
                  {/* <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    پرداخت شده
                  </Badge> */}
                </div>
              </div>
            </div>
  
            {/* Pet Info */}
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500 mb-2">
                اطلاعات پت
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="mb-1">
                  <span className="text-gray-600">نام:</span> مکس
                </p>
                <p className="mb-1">
                  <span className="text-gray-600">نژاد:</span>{" "}
                  گلدن رتریور
                </p>
                <p className="mb-1">
                  <span className="text-gray-600">سن:</span> ۳ سال
                </p>
                <p>
                  <span className="text-gray-600">وزن:</span> ۲۸
                  کیلوگرم
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }