import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Phone, MoreVertical, Ban, AlertTriangle, Info, Star } from "lucide-react";
import type { Chat } from "./ChatInterface";
import { toast } from "sonner";

interface ChatHeaderProps {
  chat: Chat;
  onOpenRequestDetails: () => void;
}

export function ChatHeader({ chat, onOpenRequestDetails }: ChatHeaderProps) {
  const getStatusText = (status: Chat["status"]) => {
    switch (status) {
      case "pending":
        return "منتظر پرداخت";
      case "active":
        return "فعال";
      case "past":
        return "پایان یافته";
    }
  };

  const getStatusColor = (status: Chat["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "past":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleShowPhone = () => {
    toast.success("شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹");
  };

  const handleBlock = () => {
    toast.error("کاربر بلاک شد");
  };

  const handleReport = () => {
    toast.warning("گزارش شما ثبت شد");
  };

  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* User Info */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg">{chat.name}</h3>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">۴.۸</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {/* <Badge className={getStatusColor(chat.status)}>
                {getStatusText(chat.status)}
              </Badge> */}
              <span className="text-xs text-gray-500">تهران، منطقه ۳</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenRequestDetails}
            title="جزئیات درخواست"
          >
            <Info className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleShowPhone}
            title="نمایش شماره تماس"
          >
            <Phone className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleBlock} className="text-red-600 cursor-pointer">
                <Ban className="ml-2 h-4 w-4" />
                بلاک کردن
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReport} className="text-orange-600 cursor-pointer">
                <AlertTriangle className="ml-2 h-4 w-4" />
                گزارش کردن
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
