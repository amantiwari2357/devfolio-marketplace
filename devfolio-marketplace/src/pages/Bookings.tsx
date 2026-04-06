import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, User, MapPin, Phone, Mail, 
  Search, Filter, Plus, Home as HomeIcon, BookOpen, 
  MessageSquare, TrendingUp, Settings, LogOut, Activity,
  ChevronRight, MoreHorizontal, Video, Globe,
  Cpu, Zap, Fingerprint, Rocket, ShieldCheck, Layers
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          api.get('/bookings'),
          api.get('/auth/profile')
        ]);
        setBookings(bookingsRes.data);
        setUser(profileRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings", active: true },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-inner">
          <Cpu className="w-8 h-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Synchronizing Temporal Log...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Temporal Log | Bookings" description="Centralized schedule of expert session epochs and authorized consultations." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Protocol */}
        <aside className="w-80 border-r border-border/40 bg-secondary/10 backdrop-blur-3xl flex flex-col p-10 relative z-20">
          <div className="flex items-center gap-4 mb-14 animate-fade-in">
            <div className="w-12 h-12 rounded-[18px] bg-primary flex items-center justify-center shadow-xl shadow-primary/20 transition-all hover:rotate-12">
              <span className="text-primary-foreground font-black text-2xl">B</span>
            </div>
            <div className="group cursor-pointer">
              <h2 className="font-black text-xl tracking-tighter text-foreground leading-[0.85] uppercase">DEVFOLIO<span className="text-primary italic">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">Temporal Node</p>
            </div>
          </div>

          <div className="flex-1 space-y-12 overflow-y-auto pr-2 custom-scrollbar animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Directory Interface</p>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className={`flex items-center gap-4 px-6 py-4 rounded-[22px] font-black transition-all group ${
                      item.active 
                        ? "bg-foreground text-background shadow-2xl shadow-foreground/10 translate-x-2" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <div className={item.active ? "text-primary" : "group-hover:scale-110 transition-transform"}>{item.icon}</div>
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Scale Vector</p>
              <nav className="space-y-3">
                {analysisItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="flex items-center gap-4 px-6 py-4 rounded-[22px] font-black text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all group"
                  >
                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-10 border-t border-border/20 space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 p-5 rounded-[24px] bg-background/50 shadow-inner border border-border/20 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center font-black text-primary text-xl shadow-sm group-hover:scale-105 transition-transform">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-foreground">{user?.firstName || 'Creator Node'}</p>
                <p className="text-[10px] font-bold truncate text-muted-foreground opacity-60 uppercase tracking-widest">{user?.email?.split('@')[0]}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-[22px] font-black text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-all justify-start text-xs uppercase tracking-widest"
            >
              <LogOut className="w-5 h-5" />
              Disconnect
            </Button>
          </div>
        </aside>

        {/* Main Schedule Core */}
        <main className="flex-1 overflow-y-auto p-16 bg-background relative selection:bg-primary selection:text-primary-foreground">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1200px] mx-auto space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary animate-fade-in">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Active Schedule Matrix</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-foreground leading-[0.9] italic">
                  Temporal <span className="text-primary NOT-italic">Log.</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden lg:flex items-center gap-4 px-6 py-4 rounded-xl bg-secondary/10 border border-border/40 backdrop-blur-md group-focus-within:border-primary/40 transition-all shadow-inner">
                    <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
                    <input type="text" placeholder="Scan coordinates..." className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 w-48" />
                 </div>
                 <Button className="h-16 rounded-[22px] px-10 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 uppercase tracking-[0.2em] border-none italic">
                    <Plus className="w-5 h-5" />
                    Archive New Epoch
                 </Button>
              </div>
            </header>

            {bookings.length === 0 ? (
              <Card className="p-32 rounded-[56px] bg-secondary/10 border-border/40 backdrop-blur-3xl text-center flex flex-col items-center justify-center space-y-10 relative overflow-hidden group animate-fade-in shadow-2xl">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                
                <div className="w-32 h-32 rounded-[44px] bg-secondary/50 flex items-center justify-center text-primary/30 border border-border/20 shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                  <Calendar className="w-16 h-16" />
                </div>
                
                <div className="space-y-4 max-w-md">
                  <h2 className="text-4xl font-black tracking-tighter text-foreground italic uppercase opacity-40 leading-none">Zero Node Alignment.</h2>
                  <p className="text-muted-foreground font-bold italic tracking-widest text-sm uppercase opacity-60 leading-relaxed">
                    You haven't initialized any expert sessions yet. Access our verified directory to begin your knowledge transfer.
                  </p>
                </div>
                
                <Button className="rounded-[24px] px-16 py-10 font-black text-xs uppercase tracking-[0.4em] bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl group-hover:translate-y-[-4px] border-none">
                  Sync Universal Directory
                </Button>
              </Card>
            ) : (
              <div className="grid gap-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
                {bookings.map((booking: any) => (
                  <Card key={booking.id} className="p-10 md:p-12 rounded-[48px] bg-secondary/10 border-border/40 backdrop-blur-3xl hover:border-primary/40 transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),.1)] group relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-y-[-20px] group-hover:translate-y-0">
                       <Zap className="w-20 h-20 text-primary" />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-[32px] bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-primary/20 shadow-inner">
                          {booking.serviceType === 'video' ? <Video className="w-10 h-10" /> : <User className="w-10 h-10" />}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-3xl font-black tracking-tighter text-foreground leading-none group-hover:text-primary transition-colors italic uppercase">
                            {booking.serviceName}
                          </h3>
                          <div className="flex items-center gap-3">
                             <div className="p-1 rounded bg-foreground/10 text-muted-foreground">
                                <Zap className="w-3 h-3 fill-foreground/30" />
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">
                                with <span className="text-foreground">{booking.expertName}</span>
                             </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge className={`rounded-xl px-6 py-2.5 font-black text-[10px] tracking-[0.4em] uppercase border-none shadow-xl backdrop-blur-md ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-amber-500/10 text-amber-500 animate-pulse'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-3 ${booking.status === 'confirmed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`} />
                          {booking.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-secondary/20 hover:bg-foreground hover:text-background transition-all shadow-inner">
                           <MoreHorizontal className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 p-10 rounded-[36px] bg-background/50 border border-border/20 mb-12 items-center backdrop-blur-xl shadow-inner group-hover:border-primary/10 transition-all duration-700">
                      <div className="flex items-center gap-6 group/item">
                        <div className="w-14 h-14 rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           <Calendar className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic">Date Epoch</p>
                           <p className="text-lg font-black text-foreground italic">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 group/item">
                        <div className="w-14 h-14 rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           <Clock className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic">Coordinates</p>
                           <p className="text-lg font-black text-foreground italic">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 group/item lg:justify-end">
                        <div className="w-14 h-14 rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           {booking.location === 'Online' ? <Globe className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic">Vector Node</p>
                           <p className="text-lg font-black text-foreground italic">{booking.location || 'Distributed'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row items-center justify-between gap-10 pt-6">
                      <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4 group/link cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-500 shadow-sm border border-border/10">
                             <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover/link:text-foreground transition-all">{booking.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-4 group/link cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-500 shadow-sm border border-border/10">
                             <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover/link:text-foreground transition-all">{booking.contactEmail}</span>
                        </div>
                      </div>
                      <div className="flex gap-6 w-full xl:w-auto">
                        <Button variant="outline" className="flex-1 xl:flex-none h-20 rounded-[24px] px-12 font-black text-[10px] uppercase tracking-[0.4em] bg-secondary/10 border-border/40 hover:bg-foreground hover:text-background transition-all shadow-xl italic">
                           Reschedule Node
                        </Button>
                        <Button className="flex-1 xl:flex-none h-20 rounded-[24px] px-12 font-black text-xs uppercase tracking-[0.4em] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 border-none italic">
                           Enter Session Node
                           <ChevronRight className="w-5 h-5 stroke-[4px]" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
