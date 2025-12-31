import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { Chat } from "./ChatInterface";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat;
  onSelectChat: (chat: Chat) => void;
}

type ChatFilter = "all" | "pending" | "active" | "past";


export function ChatSidebar({ chats, selectedChat, onSelectChat }: ChatSidebarProps) {
    const [filter, setFilter] = useState<ChatFilter>("all");

  const filteredChats = filter === "all" 
    ? chats 
    : chats.filter(chat => chat.status === filter);


    

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl mb-4">پیام‌ها</h2>
        
        {/* Filter Tabs */}
        <Tabs
          value={filter}
          onValueChange={(value) => {
            if (
              value === "all" ||
              value === "pending" ||
              value === "active" ||
              value === "past"
            ) {
              setFilter(value);
            }
          }}
          className="w-full"
        >
        

          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="all" className="text-xs">همه</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">در انتظار</TabsTrigger>
            <TabsTrigger value="active" className="text-xs">فعال</TabsTrigger>
            <TabsTrigger value="past" className="text-xs">گذشته</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`
              w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors
              border-b border-gray-100 text-right
              ${selectedChat.id === chat.id ? "bg-orange-50" : ""}
            `}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={selectedChat.id === chat.id ? "" : ""}>{chat.name}</span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {/* {chat.unread > 0 && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white mr-2 min-w-[20px] h-5 rounded-full">
                    {chat.unread}
                  </Badge>
                )} */}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
