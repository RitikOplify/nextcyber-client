import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-100.67px)] gap-5">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}
