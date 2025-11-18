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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto h-[calc(100vh-140px)]">
            <div className="grid grid-cols-12 gap-6 h-full">
              <Card className="col-span-4 flex flex-col">
                <CardContent className="p-4 flex-1 overflow-auto">
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      >
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>{conv.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-sm">{conv.name}</div>
                            <div className="text-xs text-muted-foreground">{conv.time}</div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{conv.message}</div>
                        </div>
                        {conv.unread > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-8 flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Rahul Sharma</div>
                      <div className="text-xs text-muted-foreground">Online</div>
                    </div>
                  </div>
                </div>

                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {currentChat.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{msg.text}</div>
                        <div className={`text-xs mt-1 ${msg.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
