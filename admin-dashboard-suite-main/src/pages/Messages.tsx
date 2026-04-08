import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const conversations = [
  { id: 1, name: "Rahul Sharma", message: "When will my order arrive?", time: "10:30 AM", unread: 2, avatar: "RS" },
  { id: 2, name: "Priya Patel", message: "Thanks for the quick delivery!", time: "09:45 AM", unread: 0, avatar: "PP" },
  { id: 3, name: "Amit Kumar", message: "Can I change my order?", time: "Yesterday", unread: 1, avatar: "AK" },
  { id: 4, name: "Sneha Singh", message: "Product quality is amazing", time: "Yesterday", unread: 0, avatar: "SS" },
];

const currentChat = [
  { id: 1, sender: "customer", text: "Hello! I wanted to know about my order status", time: "10:25 AM" },
  { id: 2, sender: "admin", text: "Hi! Let me check that for you. Can you provide your order ID?", time: "10:26 AM" },
  { id: 3, sender: "customer", text: "Sure, it's #ORD-001", time: "10:27 AM" },
  { id: 4, sender: "admin", text: "Your order is on the way and will be delivered by tomorrow.", time: "10:30 AM" },
];

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConversation = conversations.find(c => c.id === selectedChat) || conversations[0];

  return (
    <div className="min-h-screen bg-background flex overflow-hidden font-sans">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-hidden flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex flex-col h-full space-y-6">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Communication Hub</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Data Exchange & Secure Transmission Stream</p>
              </div>
            </div>

            {/* Chat Layout Container */}
            <div className="flex-1 min-h-0 relative flex bg-card/30 backdrop-blur-md rounded-2xl border border-border/40 overflow-hidden shadow-2xl">
              
              {/* Sidebar / Conversation Registry */}
              <div className={`w-full md:w-80 border-r border-border/20 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-border/20 bg-muted/5">
                  <div className="relative">
                    <Input 
                      placeholder="Search Registry..." 
                      className="h-9 bg-muted/20 border-border/30 pl-3 text-[10px] font-bold uppercase tracking-widest italic"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setSelectedChat(conv.id);
                        setShowMobileChat(true);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                        selectedChat === conv.id 
                        ? 'bg-primary/10 border-l-2 border-primary shadow-inner' 
                        : 'hover:bg-muted/50 border-l-2 border-transparent hover:border-border/50'
                      }`}
                    >
                      <Avatar className="w-10 h-10 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                        <AvatarFallback className="font-black text-[10px] uppercase italic text-primary/80">{conv.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className={`text-[11px] font-black uppercase tracking-tight italic ${selectedChat === conv.id ? 'text-primary' : 'text-foreground'}`}>{conv.name}</div>
                          <div className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter">{conv.time}</div>
                        </div>
                        <div className="text-[10px] font-medium text-muted-foreground/60 truncate italic mt-0.5">{conv.message}</div>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-lg shadow-primary/20">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Window / Transmission Stream */}
              <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/20 bg-muted/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden h-8 w-8 text-muted-foreground mr-1"
                      onClick={() => setShowMobileChat(false)}
                    >
                      <Send className="w-4 h-4 rotate-180" />
                    </Button>
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-primary/20 shadow-lg">
                        <AvatarFallback className="font-black text-[10px] uppercase italic text-primary">{activeConversation.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full ring-1 ring-green-500/50"></div>
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase italic tracking-widest text-foreground">{activeConversation.name}</div>
                      <div className="text-[9px] font-bold text-green-500 uppercase tracking-[0.2em] mt-0.5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">Active_Signal</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest px-3 py-1 bg-muted/20 border border-border/30 rounded-full">Encrypted_Line</div>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
                  {currentChat.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[70%] relative group ${
                          msg.sender === "admin" ? "items-end" : "items-start"
                        } flex flex-col gap-1`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm font-medium shadow-lg transition-all hover:scale-[1.01] ${
                            msg.sender === "admin"
                              ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20"
                              : "bg-muted/80 backdrop-blur-sm border border-border/50 text-foreground rounded-tl-none shadow-muted/50"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`text-[9px] font-bold uppercase tracking-widest px-1 ${msg.sender === "admin" ? "text-primary/60" : "text-muted-foreground/40"}`}>
                          {msg.time} {msg.sender === "admin" ? "// SYNCED" : "// RECEIVED"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border/20 bg-muted/5">
                  <div className="flex gap-2 max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Initalize message transmission..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="h-11 bg-background border-border/40 pl-4 text-xs font-medium italic focus:ring-primary/20 focus:border-primary/40 transition-all pr-12"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest hidden sm:block">
                        SHIFT + ENTER
                      </div>
                    </div>
                    <Button size="icon" className="h-11 w-11 shadow-lg shadow-primary/20 group hover:scale-105 active:scale-95 transition-all">
                      <Send className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
