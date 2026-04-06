import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, DollarSign, Users, TrendingUp, Settings, 
  Home as HomeIcon, BookOpen, MessageSquare, 
  Code, School, Briefcase, LogOut, CheckCircle2, 
  Sparkles, ExternalLink, Activity, Zap, Layers, Rocket
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7D");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard", active: true },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Control Node | Dashboard" description="Authorized administrative view of the expert performance metrics and system telemetry." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Protocol */}
        <aside className="w-80 border-r border-border/40 bg-secondary/10 backdrop-blur-3xl flex flex-col p-10 relative z-20">
          <div className="flex items-center gap-4 mb-14 animate-fade-in">
            <div className="w-12 h-12 rounded-[18px] bg-primary flex items-center justify-center shadow-xl shadow-primary/20 transition-all hover:rotate-12">
              <span className="text-primary-foreground font-black text-2xl">D</span>
            </div>
            <div className="group cursor-pointer">
              <h2 className="font-black text-xl tracking-tighter text-foreground leading-[0.85] uppercase">DEVFOLIO<span className="text-primary italic">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">Expert Node</p>
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

        {/* Main Logic Core */}
        <main className="flex-1 overflow-y-auto p-16 bg-background relative selection:bg-primary selection:text-primary-foreground">
          {/* Background visuals */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/2 opacity-20 blur-[150px] rounded-full" />
          
          <div className="max-w-[1200px] mx-auto space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary animate-fade-in">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Active Telemetry Node</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-foreground leading-[0.9] italic">
                  Systems Online, {user?.firstName || 'User'}<span className="text-primary NOT-italic">.</span>
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" className="h-14 rounded-2xl px-8 font-black bg-secondary/30 border-border/50 gap-3 hover:bg-secondary/50 transition-all text-xs uppercase tracking-widest shadow-xl">
                  <ExternalLink className="w-4 h-4" />
                  devfolio.io/{user?.email?.split('@')[0] || 'profile'}
                </Button>
                <Button className="h-14 rounded-2xl px-10 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all text-xs uppercase tracking-widest">
                  Deploy Assets
                </Button>
              </div>
            </header>

            {/* Strategic Widgets */}
            <div className="grid md:grid-cols-2 gap-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Card className="p-12 rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Rocket className="w-40 h-40 text-primary" />
                </div>
                <div className="relative z-10 space-y-8">
                   <div className="space-y-3">
                      <h2 className="text-3xl font-black tracking-tighter text-foreground italic">Optimize Presence.</h2>
                      <p className="text-muted-foreground font-bold italic leading-relaxed">Complete your architect profile to maximize node conversion.</p>
                   </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-background/50 border border-border/20 group hover:border-primary/30 transition-all">
                      <div className="p-2 rounded-xl bg-primary/20 text-primary shadow-inner">
                        <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest opacity-80">Synchronize availability engine</span>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-background/30 border border-border/10 group hover:border-primary/20 transition-all">
                      <div className="w-9 h-9 rounded-xl border-2 border-border/50 shadow-inner flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-border" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest opacity-40 italic">Architect your expert identity</span>
                    </div>
                  </div>
                  <Button className="w-full h-16 rounded-[22px] font-black bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest shadow-2xl">
                    Initiate Protocol
                  </Button>
                </div>
              </Card>

              <Card className="p-12 rounded-[44px] bg-primary/5 border-primary/20 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Users className="w-40 h-40 text-primary" />
                </div>
                <div className="relative z-10 space-y-8">
                   <div className="space-y-3">
                      <h2 className="text-3xl font-black tracking-tighter text-foreground italic">Global Network.</h2>
                      <p className="text-muted-foreground font-bold italic leading-relaxed">Observe how elite architect nodes scale their knowledge systems.</p>
                   </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-14 h-14 rounded-2xl border-4 border-background bg-secondary/50 flex items-center justify-center font-black text-xs text-primary ring-1 ring-border/20 shadow-xl transition-all hover:-translate-y-2 hover:z-10">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                      <div className="w-14 h-14 rounded-2xl border-4 border-background bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-xl ring-1 ring-primary/40">
                        +24
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-background/50 border border-border/20 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Status</p>
                       <p className="text-xs font-black uppercase tracking-tighter italic leading-none">Top 1% Rank</p>
                    </div>
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest opacity-60 text-center pt-4">Join the architect's inner circle</p>
                </div>
              </Card>
            </div>

            {/* Campaign Engine */}
            <Card className="rounded-[48px] bg-foreground text-background border-none relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.01] animate-slide-up group" style={{ animationDelay: '200ms' }}>
              <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Sparkles className="w-[500px] h-[500px] text-primary" />
              </div>
              <div className="p-16 md:p-24 relative z-10 grid lg:grid-cols-5 gap-16 items-center text-center lg:text-left">
                <div className="lg:col-span-3 space-y-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/20 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-inner">
                    <Zap className="w-3.5 h-3.5 fill-primary" />
                    Seasonal Protocol
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] italic">
                    LAUNCH YOUR <span className="text-primary NOT-italic group-hover:rotate-6 transition-transform block lg:inline-block">COURSE.</span>
                  </h2>
                  <p className="text-2xl text-background/60 font-medium italic max-w-xl leading-relaxed">Scale to ₹100K+ this epoch with <span className="text-primary font-black underline underline-offset-8 decoration-primary/30">Zero System Commissions.</span></p>
                </div>
                <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-end">
                  <Button className="h-24 px-14 rounded-[32px] font-black text-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all uppercase tracking-widest border-none">
                    Start Launch
                  </Button>
                  <Button variant="outline" className="h-24 px-14 rounded-[32px] font-black text-2xl border-background/20 text-background hover:bg-background/10 transition-all uppercase tracking-widest">
                    Audit Node
                  </Button>
                </div>
              </div>
            </Card>

            {/* Metrics Engine */}
            <div className="space-y-10 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-6 bg-primary rounded-full animate-pulse" />
                   <p className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground flex items-center gap-3">
                      Performance Engine
                      <Activity className="w-4 h-4 opacity-30" />
                   </p>
                </div>
                <div className="p-2 rounded-[22px] bg-secondary/10 border border-border/50 flex gap-2 backdrop-blur-md">
                  {["7D", "30D", "3M", "6M"].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className={`h-11 px-6 rounded-[14px] font-black text-xs transition-all tracking-widest ${
                        timeRange === range 
                          ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                          : "bg-transparent text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "Network Visits", val: "2.4K", icon: <Users className="w-4 h-4" />, trend: "+12%" },
                  { label: "Net Revenue", val: "₹1.2M", icon: <DollarSign className="w-4 h-4" />, trend: "+8.4%" },
                  { label: "Asset Deployment", val: "154", icon: <Activity className="w-4 h-4" />, trend: "-2.1%" },
                  { label: "Conv Efficiency", val: "6.4%", icon: <TrendingUp className="w-4 h-4" />, trend: "+0.8%" },
                ].map((stat, i) => (
                  <Card key={i} className="p-10 rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-xl group hover:border-primary/40 hover:shadow-2xl transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                       {stat.icon}
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">{stat.label}</p>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border/20 text-[10px] font-black text-primary italic">
                         {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-2">
                       <p className="text-4xl font-black tracking-tight text-foreground leading-none">{stat.val}</p>
                       <div className="w-10 h-1 bg-primary/10 rounded-full group-hover:w-full transition-all duration-700" />
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-32 rounded-[60px] bg-secondary/5 border-border/20 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <div className="w-24 h-24 rounded-[40px] bg-secondary/50 flex items-center justify-center text-muted-foreground/30 shadow-inner group-hover:rotate-12 transition-transform">
                  <Activity className="w-12 h-12" />
                </div>
                <div className="space-y-4 max-w-md">
                   <h3 className="text-4xl font-black tracking-tighter text-foreground italic">Telemetry pending deployment.</h3>
                   <p className="text-muted-foreground font-bold italic leading-relaxed opacity-60">Detailed telemetry nodes will appear across your dashboard once your first expert session is established.</p>
                </div>
                <Button variant="outline" className="h-16 px-10 rounded-2xl border-border/50 font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all shadow-xl">
                   Synchronize All Nodes
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
