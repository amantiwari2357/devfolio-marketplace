import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, User, MapPin, Phone, Mail, 
  Search, Filter, Plus, Home as HomeIcon, BookOpen, 
  MessageSquare, TrendingUp, Settings, LogOut, Activity,
  ChevronRight, MoreHorizontal, Video, Globe
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <Calendar className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Synchronizing Schedule...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="My Sessions" description="Manage your scheduled expert sessions and consultations." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">S</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Schedule Node</p>
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
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Active Schedule</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  My <span className="text-primary italic">Sessions.</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/30 border border-border/50">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Filter bookings..." className="bg-transparent border-none focus:ring-0 text-sm font-bold text-foreground placeholder:text-muted-foreground w-40" />
                 </div>
                 <Button className="rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 transition-transform gap-2">
                    <Plus className="w-5 h-5" />
                    Archive New Session
                 </Button>
              </div>
            </header>

            {bookings.length === 0 ? (
              <Card className="p-20 rounded-[40px] bg-secondary/10 border-border/50 text-center flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                <div className="w-24 h-24 rounded-[32px] bg-secondary/50 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                  <Calendar className="w-12 h-12" />
                </div>
                
                <div className="space-y-4 max-w-sm">
                  <h2 className="text-3xl font-black tracking-tight text-foreground">Zero Node Alignment.</h2>
                  <p className="text-muted-foreground font-medium">
                    You haven't initialized any expert sessions yet. Access our verified directory to begin your knowledge transfer.
                  </p>
                </div>
                
                <Button className="rounded-2xl px-12 py-8 font-black text-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-110 transition-all">
                  Browse Expert Directory
                </Button>
              </Card>
            ) : (
              <div className="grid gap-8">
                {bookings.map((booking: any) => (
                  <Card key={booking.id} className="p-8 md:p-10 rounded-[40px] bg-secondary/10 border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                       <Plus className="w-12 h-12 text-primary" />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/20 shadow-inner">
                          {booking.serviceType === 'video' ? <Video className="w-10 h-10" /> : <User className="w-10 h-10" />}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-black tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                             with <span className="text-foreground">{booking.expertName}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={`rounded-lg px-4 py-1.5 font-black text-[10px] tracking-widest uppercase border-none shadow-sm ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {booking.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all">
                           <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 p-6 rounded-3xl bg-background/50 border border-border/50 mb-8 items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-secondary/50 text-primary">
                           <Calendar className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Epoch</p>
                           <p className="text-sm font-bold text-foreground">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-secondary/50 text-primary">
                           <Clock className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Coordinates</p>
                           <p className="text-sm font-bold text-foreground">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-secondary/50 text-primary">
                           {booking.location === 'Online' ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vector</p>
                           <p className="text-sm font-bold text-foreground">{booking.location || 'Online'}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                         <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary/50 flex items-center justify-center text-[10px] font-black text-primary">
                              {booking.contactEmail?.[0]?.toUpperCase()}
                           </div>
                           <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-black text-primary-foreground">
                              +
                           </div>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 group/link cursor-pointer">
                          <Phone className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
                          <span className="text-xs font-bold text-muted-foreground group-hover/link:text-foreground">{booking.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 group/link cursor-pointer">
                          <Mail className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
                          <span className="text-xs font-bold text-muted-foreground group-hover/link:text-foreground">{booking.contactEmail}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none rounded-xl px-8 py-6 font-bold bg-secondary/50 border-border/50 hover:bg-secondary transition-all gap-2">
                           Synchronize (Reschedule)
                        </Button>
                        <Button className="flex-1 sm:flex-none rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                           Enter Session
                           <ChevronRight className="w-5 h-5 ml-2" />
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
