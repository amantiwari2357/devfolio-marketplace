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
import { AppSidebar } from "@/components/layout/AppSidebar";

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
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/bookings" />

        {/* Main Schedule Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 md:pt-16">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary animate-fade-in">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Active Schedule Matrix</span>
                </div>
                <h1 className="heading-responsive">
                  Temporal <span className="text-primary NOT-italic">Log.</span>
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="hidden lg:flex items-center gap-4 px-6 py-4 rounded-xl bg-secondary/10 border border-border/40 backdrop-blur-md group-focus-within:border-primary/40 transition-all shadow-inner">
                    <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
                    <input type="text" placeholder="Scan coordinates..." className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 w-48" />
                 </div>
                 <Button className="h-14 md:h-16 w-full sm:w-auto rounded-[22px] px-10 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 uppercase tracking-[0.2em] border-none italic">
                    <Plus className="w-5 h-5" />
                    Archive New Epoch
                 </Button>
              </div>
            </header>

            {bookings.length === 0 ? (
              <Card className="neural-card p-12 md:p-32 text-center flex flex-col items-center justify-center space-y-10 relative overflow-hidden group animate-fade-in shadow-2xl">
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
              <div className="grid grid-cols-1 gap-8 md:gap-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
                {bookings.map((booking: any) => (
                  <Card key={booking.id} className="neural-card p-8 md:p-12 hover:border-primary/40 transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),.1)] group relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-y-[-20px] group-hover:translate-y-0">
                       <Zap className="w-20 h-20 text-primary" />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12">
                      <div className="flex items-center gap-4 md:gap-8">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-[24px] md:rounded-[32px] bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-primary/20 shadow-inner">
                          {booking.serviceType === 'video' ? <Video className="w-6 h-6 md:w-10 md:h-10" /> : <User className="w-6 h-6 md:w-10 md:h-10" />}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-3xl font-black tracking-tighter text-foreground leading-none group-hover:text-primary transition-colors italic uppercase">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10 rounded-[28px] md:rounded-[36px] bg-background/50 border border-border/20 mb-12 items-center backdrop-blur-xl shadow-inner group-hover:border-primary/10 transition-all duration-700">
                      <div className="flex items-center gap-6 group/item">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           <Calendar className="w-5 md:w-6 h-5 md:h-6" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic leading-none mb-1">Date Epoch</p>
                           <p className="text-base md:text-lg font-black text-foreground italic">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 group/item">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           <Clock className="w-5 md:w-6 h-5 md:h-6" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic leading-none mb-1">Coordinates</p>
                           <p className="text-base md:text-lg font-black text-foreground italic">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 group/item lg:justify-end">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-[20px] bg-secondary/50 text-primary flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform">
                           {booking.location === 'Online' ? <Globe className="w-5 md:w-6 h-5 md:h-6" /> : <MapPin className="w-5 md:w-6 h-5 md:h-6" />}
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic leading-none mb-1">Vector Node</p>
                           <p className="text-base md:text-lg font-black text-foreground italic">{booking.location || 'Distributed'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row items-center justify-between gap-8 pt-6">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-10">
                        <div className="flex items-center gap-4 group/link cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-500 shadow-sm border border-border/10">
                             <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover/link:text-foreground transition-all truncate max-w-[150px]">{booking.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-4 group/link cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-500 shadow-sm border border-border/10">
                             <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover/link:text-foreground transition-all truncate max-w-[200px]">{booking.contactEmail}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                        <Button variant="outline" className="h-14 md:h-20 rounded-[20px] md:rounded-[24px] px-8 md:px-12 font-black text-[10px] uppercase tracking-[0.4em] bg-secondary/10 border-border/40 hover:bg-foreground hover:text-background transition-all shadow-xl italic border-none">
                           Reschedule Node
                        </Button>
                        <Button className="h-14 md:h-20 rounded-[20px] md:rounded-[24px] px-8 md:px-12 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 border-none italic">
                           Enter Session Node
                           <ChevronRight className="w-4 h-4 md:w-5 md:h-5 stroke-[4px]" />
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
