import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, Send, User, Clock, ShieldCheck, 
  Sparkles, Zap, Headset, Home as HomeIcon, 
  Calendar, BookOpen, TrendingUp, Settings, LogOut, Activity
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const PriorityDM = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, profileRes] = await Promise.all([
          api.get('/messages/priority'),
          api.get('/auth/profile')
        ]);
        setMessages(messagesRes.data);
        setUser(profileRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await api.post('/messages/priority', {
        content: newMessage,
        priority: true
      });
      setMessages(prev => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm", active: true },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <MessageSquare className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Establishing Secure Link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Priority Protocol" description="Direct communication with our elite support engineering team." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">P</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Priority Node</p>
            </div>
          </div>

          <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Core Directory</p>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                      item.active 
                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Insights & Scale</p>
              <nav className="space-y-2">
                {analysisItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-background shadow-inner border border-border/20">
              <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center font-black text-primary">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-foreground">{user?.firstName || 'Creator'}</p>
                <p className="text-[10px] font-medium truncate text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-destructive hover:bg-destructive/10 hover:text-destructive transition-all justify-start"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Disconnect</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-12 bg-background relative">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          
          <div className="max-w-6xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Secure Protocol</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  Priority <span className="text-primary italic">Protocol.</span>
                </h1>
              </div>
              <Badge className="rounded-xl px-6 py-3 font-black text-xs tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm animate-pulse">
                 High-Urgency Lane
              </Badge>
            </header>

            <div className="grid lg:grid-cols-3 gap-10 h-[calc(100vh-280px)]">
              {/* Messages Engine */}
              <Card className="lg:col-span-2 rounded-[40px] bg-secondary/10 border-border/50 flex flex-col overflow-hidden relative group">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                <div className="p-8 border-b border-border/50 bg-background/50 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                      <Headset className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="font-black text-lg tracking-tight text-foreground">Support Intelligence</h2>
                       <p className="text-[10px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Node Active
                       </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-border" />)}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar scroll-smooth">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                      <div className="w-20 h-20 rounded-[32px] bg-secondary/50 flex items-center justify-center text-primary/30">
                        <MessageSquare className="w-10 h-10" />
                      </div>
                      <div className="space-y-2 max-w-xs">
                        <h3 className="text-xl font-black tracking-tight text-foreground/40">Zero Information Flow.</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed italic">Initiate a message packet to established high-priority communication.</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-6 py-5 rounded-3xl relative ${
                            message.isFromUser
                              ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/20 rounded-tr-none'
                              : 'bg-background/80 border border-border/50 text-foreground backdrop-blur-xl rounded-tl-none shadow-xl'
                          }`}
                        >
                          <p className="text-sm font-bold leading-relaxed">{message.content}</p>
                          <div className={`flex items-center gap-2 mt-4 opacity-60 text-[10px] font-black uppercase tracking-widest ${message.isFromUser ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                            <Clock className="w-3 h-3" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input Module */}
                <div className="p-8 bg-background/5 border-t border-border/50 z-10">
                  <div className="relative group">
                    <Input
                      placeholder="Input message packet..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="h-16 pl-6 pr-20 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold shadow-2xl transition-all"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon" 
                      className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                      <Send className="w-5 h-5 mx-0.5" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Support Intel Space */}
              <div className="space-y-8 h-full overflow-y-auto pr-2 custom-scrollbar">
                <Card className="p-8 rounded-[32px] bg-secondary/10 border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <Zap className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-3">
                     <Sparkles className="w-5 h-5 text-primary" />
                     Elite Benefits
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Zap className="w-4 h-4 text-amber-500" />, text: "24/7 Epoch Response" },
                      { icon: <Headset className="w-4 h-4 text-blue-500" />, text: "Direct Vector Path" },
                      { icon: <ShieldCheck className="w-4 h-4 text-green-500" />, text: "Priority Resolution" },
                      { icon: <Sparkles className="w-4 h-4 text-purple-500" />, text: "High-Tier Assistance" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-background shadow-inner border border-border/10">
                         <div className="p-2 rounded-lg bg-secondary/50">{item.icon}</div>
                         <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 rounded-[32px] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 text-center space-y-4 relative overflow-hidden group">
                  <div className="absolute bottom-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                     <Clock className="w-48 h-48" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Telemetry Pulsation</p>
                    <h3 className="text-3xl font-black tracking-tighter leading-tight">Within 2h<span className="italic opacity-60">Avg.</span></h3>
                    <p className="text-xs font-bold opacity-80 mt-4">Typical synchronization window for elite support.</p>
                  </div>
                </Card>

                <Card className="p-8 rounded-[32px] bg-foreground text-background border-none relative overflow-hidden text-center space-y-6 group">
                   <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="relative z-10">
                     <h3 className="text-2xl font-black tracking-tight mb-3">Complex Query?</h3>
                     <p className="text-xs font-bold text-background/60 leading-relaxed mb-6 italic">If your inquiry requires higher architectural access, contact our compliance node.</p>
                     <Button className="w-full rounded-xl py-6 font-black bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-xl">
                       Verify Compliance
                     </Button>
                   </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriorityDM;
