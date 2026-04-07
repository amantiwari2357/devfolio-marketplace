import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, DollarSign, Users, TrendingUp, Settings, 
  Home as HomeIcon, BookOpen, MessageSquare, 
  Code, School, Briefcase, LogOut, CheckCircle2, 
  Sparkles, ExternalLink, Activity, Zap, Layers, Rocket, ShieldCheck, Fingerprint, ArrowRight, Globe
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import { AppSidebar } from "@/components/layout/AppSidebar";

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

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Dashboard | Overview" description="Your central hub for tracking performance, bookings, and analytics." />
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/dashboard" />

        {/* Main Logic Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 lg:p-20 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 lg:pt-20">
          {/* Background Mesh Flux */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/2 opacity-20 blur-[150px] rounded-full" />
          
          <div className="max-w-[1300px] mx-auto space-y-16 md:space-y-20">
            <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary animate-fade-in">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary/80" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Dashboard Overview</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Welcome back, <br className="hidden md:block" /><span className="text-primary">{user?.firstName || 'Creator'}.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">Here's what's happening with your projects today.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" className="h-12 md:h-14 rounded-xl px-6 font-bold bg-secondary/10 border-border/40 gap-3 hover:bg-secondary/20 transition-all text-sm shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                  View Public Profile
                </Button>
                <Button className="h-12 md:h-14 rounded-xl px-8 font-bold bg-primary text-primary-foreground shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                  Create Service
                </Button>
              </div>
            </header>

            {/* Strategic Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Card className="neural-card p-10 md:p-14 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                  <Rocket className="w-56 h-56 text-primary" />
                </div>
                <div className="relative z-10 space-y-10">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-primary">
                         <Zap className="w-4 h-4 fill-primary" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Optimization Module</span>
                      </div>
                      <h2 className="text-2xl font-black tracking-tighter text-foreground italic uppercase">Optimize Presence.</h2>
                      <p className="text-base md:text-lg font-bold italic text-muted-foreground/60 leading-relaxed tracking-tight">Complete your architect profile to maximize node conversion and platform discoverability.</p>
                   </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-5 p-6 rounded-[24px] bg-background/50 border border-border/20 group/item hover:border-primary/40 transition-all cursor-pointer">
                      <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-inner group-hover/item:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic opacity-80">Synchronize availability engine</span>
                    </div>
                    <div className="flex items-center gap-5 p-6 rounded-[24px] bg-background/30 border border-border/10 group/item hover:border-primary/30 transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl border-2 border-border/50 shadow-inner flex items-center justify-center group-hover/item:border-primary/30 transition-all">
                         <div className="w-2.5 h-2.5 rounded-full bg-border group-hover/item:bg-primary transition-all" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic opacity-40">Architect your expert identity</span>
                    </div>
                  </div>
                  <Button className="w-full h-20 rounded-[28px] font-black bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-[0.3em] shadow-2xl italic border-none">
                    Initiate Protocol
                  </Button>
                </div>
              </Card>

              <Card className="neural-card p-10 md:p-14 bg-primary/5 border-primary/20 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                  <Globe className="w-56 h-56 text-primary" />
                </div>
                <div className="relative z-10 space-y-10">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-primary">
                         <Layers className="w-4 h-4 fill-primary" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Network Intelligence</span>
                      </div>
                      <h2 className="text-2xl font-black tracking-tighter text-foreground italic uppercase">Global Network.</h2>
                      <p className="text-base md:text-lg font-bold italic text-muted-foreground/60 leading-relaxed tracking-tight">Observe how elite architect nodes scale their knowledge systems across the marketplace.</p>
                   </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-16 rounded-[20px] border-4 border-background bg-secondary/50 flex items-center justify-center font-black text-xs text-primary ring-1 ring-border/20 shadow-xl transition-all hover:-translate-y-3 hover:z-10 cursor-pointer italic">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                      <div className="w-16 h-16 rounded-[20px] border-4 border-background bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-xl ring-1 ring-primary/40 italic">
                        +24
                      </div>
                    </div>
                    <div className="p-6 rounded-[24px] bg-background/50 border border-border/20 text-center shadow-inner group hover:border-primary/40 transition-all cursor-pointer">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 italic">Global Status</p>
                       <p className="text-xs font-black uppercase tracking-tighter italic leading-none text-foreground">Top 1% Rank</p>
                    </div>
                  </div>
                  <div className="pt-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground text-center italic opacity-60">Join the architect's inner circle protocol</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Campaign Engine Protocol */}
            <Card className="rounded-[64px] bg-foreground text-background border-none relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transition-all hover:scale-[1.005] animate-slide-up group" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40" />
              <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <Sparkles className="w-[600px] h-[600px] text-primary" />
              </div>
              <div className="p-10 md:p-16 lg:p-32 relative z-10 grid lg:grid-cols-5 gap-20 items-center text-center lg:text-left">
                <div className="lg:col-span-3 space-y-10">
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/20 border border-primary/20 text-[10px] font-black uppercase tracking-[0.6em] text-primary shadow-inner italic">
                    <Zap className="w-4 h-4 fill-primary" />
                    Seasonal Protocol Influx
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.8] italic uppercase">
                    LAUNCH YOUR <span className="text-primary NOT-italic group-hover:rotate-3 transition-transform block lg:inline-block">COURSE.</span>
                  </h2>
                  <p className="text-lg md:text-xl text-background/60 font-bold italic max-w-xl leading-relaxed tracking-tight">Scale to ₹100K+ this epoch with <span className="text-primary font-black underline underline-offset-[12px] decoration-primary/30">Zero System Commissions.</span></p>
                </div>
                <div className="lg:col-span-2 flex flex-col xl:flex-row gap-8 items-center justify-center lg:justify-end">
                  <Button className="h-20 px-12 rounded-[28px] font-black text-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/50 hover:scale-110 active:scale-95 transition-all uppercase tracking-[0.2em] border-none italic group/btn">
                    Start Launch
                    <ArrowRight className="w-8 h-8 stroke-[4px] ml-4 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-6 bg-primary rounded-full animate-pulse" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                         Performance Metrics
                      </p>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">System Analytics.</h3>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/10 border border-border/40 backdrop-blur-xl w-full md:w-fit shadow-sm overflow-x-auto hide-scrollbar">
                  {["7D", "30D", "3M", "6M"].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className={`h-10 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                        timeRange === range 
                          ? "bg-foreground text-background shadow-md scale-[1.02] border-none" 
                          : "bg-transparent text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { label: "Network Visits", val: "2.4K", icon: <Users className="w-5 h-5" />, trend: "+12%" },
                  { label: "Net Revenue", val: "₹1.2M", icon: <DollarSign className="w-5 h-5" />, trend: "+8.4%" },
                  { label: "Asset Deployment", val: "154", icon: <Activity className="w-5 h-5" />, trend: "-2.1%" },
                  { label: "Conv Efficiency", val: "6.4%", icon: <TrendingUp className="w-5 h-5" />, trend: "+0.8%" },
                ].map((stat, i) => (
                  <Card key={i} className="neural-card p-10 group relative flex flex-col justify-between h-auto min-h-[220px]">
                    <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-x-4 translate-y-[-4px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                       {stat.icon}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic opacity-60">{stat.label}</p>
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black text-primary italic border border-primary/20">
                         {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-5xl font-black tracking-tighter text-foreground leading-none italic">{stat.val}</p>
                       <div className="h-1.5 bg-primary/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/30 w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                       </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-12 md:p-24 rounded-[32px] md:rounded-[40px] bg-secondary/5 border-border/40 border-dashed backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group hover:border-primary/40 transition-all">
                <div className="w-20 h-20 rounded-[28px] bg-secondary/30 flex items-center justify-center text-muted-foreground/40 group-hover:scale-105 transition-all duration-700">
                  <Activity className="w-10 h-10" />
                </div>
                <div className="space-y-4 max-w-lg">
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">No data available yet.</h3>
                   <p className="text-base text-muted-foreground font-medium leading-relaxed">Detailed metrics will begin showing up here once you have traffic or complete your first session.</p>
                </div>
                <Button variant="outline" className="h-12 md:h-14 rounded-xl px-10 font-bold text-sm bg-secondary/10 border-border/40 hover:bg-foreground hover:text-background transition-all shadow-sm">
                   Refresh Data
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
