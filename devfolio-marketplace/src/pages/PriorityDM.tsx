import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, Send, User, Clock, ShieldCheck, 
  Sparkles, Zap, Headset, Home as HomeIcon, 
  Calendar, BookOpen, TrendingUp, Settings, LogOut, Activity,
  Lock, Cpu, Fingerprint, Layers, Rocket, CheckCircle2
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import { AppSidebar } from "@/components/layout/AppSidebar";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[22px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Support...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Priority Protocol | DM" description="Authorized high-urgency communication channel with the DEVFOLIO support architect layer." />
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/priority-dm" />

        {/* Main Communications Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 lg:pt-16">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary animate-fade-in">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-primary/80" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Support Channel</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Priority <span className="text-primary">Support.</span>
                </h1>
              </div>
              <Badge className="h-10 md:h-12 rounded-xl px-4 md:px-6 font-bold text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm flex items-center gap-2 w-fit">
                 <Zap className="w-4 h-4 fill-amber-500" />
                 Priority Access
              </Badge>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 h-auto lg:h-[calc(100vh-280px)] animate-slide-up" style={{ animationDelay: '100ms' }}>
              {/* Message Matrix Node */}
              <Card className="lg:col-span-2 rounded-[32px] md:rounded-[48px] bg-secondary/10 border-border/40 backdrop-blur-3xl flex flex-col overflow-hidden relative group shadow-2xl transition-all hover:border-primary/20 h-[500px] lg:h-full">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                <div className="p-6 md:p-10 border-b border-border/20 bg-background/40 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[22px] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20 group-hover:rotate-6 transition-transform">
                      <Headset className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="space-y-1">
                       <h2 className="font-bold text-lg md:text-xl tracking-tight text-foreground leading-none">Support Agent</h2>
                       <p className="text-xs font-semibold tracking-wider text-green-500 flex items-center gap-2 uppercase">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm" />
                          Online
                       </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                     {[1, 2, 3].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-border/40 group-hover:bg-primary/40 transition-colors" />)}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar scroll-smooth relative z-10">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-8 text-center animate-fade-in">
                      <div className="w-24 h-24 rounded-[40px] bg-secondary/50 flex items-center justify-center text-primary/30 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        <MessageSquare className="w-10 h-10" />
                      </div>
                      <div className="space-y-3 max-w-sm">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground opacity-60 leading-tight">No Messages Yet.</h3>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">Send a message to start your priority support session.</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                      >
                        <div
                          className={`max-w-[85%] md:max-w-[75%] px-6 md:px-10 py-5 md:py-8 rounded-[24px] md:rounded-[32px] relative shadow-2xl transition-all hover:scale-[1.02] ${
                            message.isFromUser
                              ? 'bg-primary text-primary-foreground shadow-primary/20 rounded-tr-none'
                              : 'bg-background/80 border border-border/20 text-foreground backdrop-blur-2xl rounded-tl-none'
                          }`}
                        >
                          <p className={`text-base md:text-lg font-bold leading-relaxed italic ${message.isFromUser ? 'selection:bg-background selection:text-foreground' : ''}`}>
                            {message.content}
                          </p>
                          <div className={`flex items-center gap-3 mt-4 md:mt-6 opacity-40 text-[10px] font-black uppercase tracking-[0.3em] ${message.isFromUser ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                            <Clock className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Packet Input Interface */}
                <div className="p-6 md:p-10 bg-background/20 backdrop-blur-2xl border-t border-border/20 z-10 shrink-0">
                  <div className="relative group/input">
                    <Input
                      placeholder="Input information packet..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="h-16 md:h-20 pl-6 md:pl-10 pr-20 md:pr-24 rounded-[20px] md:rounded-[24px] bg-background border-border/30 focus:border-primary/50 font-black italic shadow-inner tracking-widest transition-all text-xs"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon" 
                      className="absolute right-2 md:right-3 top-2 md:top-3 h-12 md:h-14 w-12 md:w-14 rounded-[14px] md:rounded-[18px] bg-foreground text-background hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-foreground/20 border-none"
                    >
                      <Send className="w-5 md:w-6 h-5 md:w-6 rotate-[5deg] group-hover/input:rotate-0 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Protocol Specs Space */}
              <div className="space-y-6 md:space-y-10 h-auto lg:h-full lg:overflow-y-auto pr-2 custom-scrollbar animate-fade-in pb-10 md:pb-0" style={{ animationDelay: '300ms' }}>
                <Card className="p-8 md:p-10 rounded-[32px] md:rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-3xl relative overflow-hidden group hover:border-primary/20 transition-all">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                     <Rocket className="w-24 h-24 text-primary" />
                  </div>
                  <h3 className="text-sm font-black tracking-[0.4em] italic mb-10 flex items-center gap-4 text-primary uppercase">
                     <Sparkles className="w-5 h-5 fill-primary" />
                     Elite Protocol
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    {[
                      { icon: <Zap className="w-4 h-4 fill-amber-500" />, text: "24/7 Response Epoch", color: "bg-amber-500/10" },
                      { icon: <Cpu className="w-4 h-4 text-blue-500" />, text: "Direct Vector Path", color: "bg-blue-500/10" },
                      { icon: <ShieldCheck className="w-4 h-4 text-green-500" />, text: "Conflict Resolution", color: "bg-green-500/10" },
                      { icon: <Rocket className="w-4 h-4 fill-purple-500" />, text: "Elite Assistance", color: "bg-purple-500/10" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[20px] md:rounded-[24px] bg-background/50 shadow-inner border border-border/10 group/row hover:border-primary/20 transition-all">
                         <div className={`p-3 md:p-4 rounded-[14px] md:rounded-[18px] ${item.color} shadow-sm group-hover/row:rotate-12 transition-transform`}>{item.icon}</div>
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 italic">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-10 md:p-12 rounded-[32px] md:rounded-[44px] bg-primary text-primary-foreground shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),.4)] text-center space-y-6 relative overflow-hidden group border-none">
                  <div className="absolute bottom-0 right-0 p-12 md:p-16 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                     <Clock className="w-40 h-40 md:w-56 md:h-56" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-2 italic">Avg. Pulse Interval</p>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">Under 2hr<span className="text-xl md:text-2xl NOT-italic opacity-40 ml-2 italic">Avg.</span></h3>
                    <div className="w-12 h-1 bg-background/20 mx-auto rounded-full group-hover:w-full transition-all duration-700" />
                    <p className="text-[10px] md:text-xs font-bold opacity-80 mt-4 md:mt-6 leading-relaxed italic uppercase tracking-widest">Standard synchronization window for authorized support packets.</p>
                  </div>
                </Card>

                <Card className="p-10 md:p-12 rounded-[32px] md:rounded-[44px] bg-foreground text-background border-none relative overflow-hidden transition-all hover:scale-[1.02] shadow-[0_40px_100px_-20px_rgba(0,0,0,.3)] group">
                   <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="relative z-10 space-y-6 md:space-y-8">
                     <div className="space-y-4 text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-background/20 mx-auto flex items-center justify-center p-2 group-hover:rotate-12 transition-transform">
                            <Fingerprint className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter italic leading-none uppercase">Need Access?</h3>
                        <p className="text-[10px] md:text-xs font-bold text-background/60 leading-relaxed italic uppercase tracking-widest">If your inquiry requires higher architectural clearance, contact the compliance node.</p>
                     </div>
                     <Button className="w-full h-16 md:h-20 rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl border-none">
                       Synchronize Compliance
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
