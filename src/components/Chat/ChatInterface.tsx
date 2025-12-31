import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessages } from "./ChatMessages";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { RequestDetailsDialog } from "./RequestDetailsDialog";
// import { QuickMessagesDialog } from "./QuickMessagesDialog";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unread: number;
  status: "pending" | "active" | "past";
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  type: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "سارا احمدی",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "ممنون از همکاری شما!",
    timestamp: "۱۰:۳۰",
    isOnline: true,
    unread: 0,
    status: "active"
  },
  {
    id: "2",
    name: "علی رضایی",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    lastMessage: "سلام، درخواست شما تایید شد",
    timestamp: "دیروز",
    isOnline: false,
    unread: 2,
    status: "active"
  },
  {
    id: "3",
    name: "مریم کریمی",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "چه ساعتی مناسبه؟",
    timestamp: "پریروز",
    isOnline: false,
    unread: 0,
    status: "pending"
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    text: "سلام، من درخواست نگهداری از پت شما رو دارم",
    sender: "other",
    timestamp: "۱۰:۰۰",
    type: "text"
  },
  {
    id: "2",
    text: "سلام! بله، درخواست شما رو دیدم. چه زمانی نیاز دارید؟",
    sender: "user",
    timestamp: "۱۰:۰۵",
    type: "text"
  },
  {
    id: "3",
    text: "فردا از ساعت ۹ صبح تا ۵ بعدازظهر",
    sender: "other",
    timestamp: "۱۰:۰۷",
    type: "text"
  },
  {
    id: "4",
    text: "عالیه! من اون زمان در دسترسم. این عکس محل من هست:",
    sender: "user",
    timestamp: "۱۰:۱۰",
    type: "image",
    fileUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    text: "ممنون! پس فردا می‌بینمتون 🐾",
    sender: "other",
    timestamp: "۱۰:۱۵",
    type: "text"
  }
];

export function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRequestDetailsOpen, setIsRequestDetailsOpen] = useState(false);
  const [isQuickMessagesOpen, setIsQuickMessagesOpen] = useState(false);

  const handleSendMessage = (text: string, type: "text" | "image" | "file" = "text", fileUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      type,
      fileUrl
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen flex bg-white">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-80 lg:w-96 bg-white border-l border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <ChatSidebar
          chats={mockChats}
          selectedChat={selectedChat}
          onSelectChat={(chat) => {
            setSelectedChat(chat);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <ChatHeader
          chat={selectedChat}
          onOpenRequestDetails={() => setIsRequestDetailsOpen(true)}
        />
        <ChatMessages messages={messages} />
        <ChatInput
          onSendMessage={handleSendMessage}
          onOpenQuickMessages={() => setIsQuickMessagesOpen(true)}
        />
      </div>

      {/* Dialogs */}
      <RequestDetailsDialog
        open={isRequestDetailsOpen}
        onOpenChange={setIsRequestDetailsOpen}
      />
      
    </div>
  );
}
