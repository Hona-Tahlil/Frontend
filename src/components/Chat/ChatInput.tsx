import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Paperclip, MessageSquare, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (text: string, type?: "text" | "image" | "file", fileUrl?: string) => void;
  onOpenQuickMessages: () => void;
}

export function ChatInput({ onSendMessage, onOpenQuickMessages }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("فایل آپلود شد");
      onSendMessage(`فایل: ${file.name}`, "file");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage("", "image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => imageInputRef.current?.click()}
              title="ارسال عکس"
            >
              <ImageIcon className="h-5 w-5 text-gray-600" />
            </Button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="ارسال فایل"
            >
              <Paperclip className="h-5 w-5 text-gray-600" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenQuickMessages}
              title="پیام‌های آماده"
            >
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="پیام خود را بنویسید..."
              className="rounded-full border-gray-300 focus:border-orange-500"
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-10 w-10 p-0"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
