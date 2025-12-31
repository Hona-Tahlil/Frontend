import type { Message } from "./ChatInterface";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FileText, Download } from "lucide-react";
import { Button } from "../ui/button";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`
          max-w-[70%] rounded-2xl px-4 py-2
          ${isUser 
            ? "bg-orange-500 text-white rounded-tr-sm" 
            : "bg-gray-100 text-gray-900 rounded-tl-sm"
          }
        `}
      >
        {message.type === "text" && (
          <p className="break-words">{message.text}</p>
        )}

        {message.type === "image" && message.fileUrl && (
          <div className="space-y-2">
            {message.text && <p className="break-words mb-2">{message.text}</p>}
            {/* <ImageWithFallback
              src={message.fileUrl}
              alt="تصویر ارسالی"
              className="rounded-lg max-w-full h-auto"
            /> */}
          </div>
        )}

        {message.type === "file" && (
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8" />
            <div className="flex-1">
              <p className="text-sm">{message.fileName || "فایل"}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={isUser ? "hover:bg-orange-600" : "hover:bg-gray-200"}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className={`text-xs mt-1 ${isUser ? "text-orange-100" : "text-gray-500"}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
