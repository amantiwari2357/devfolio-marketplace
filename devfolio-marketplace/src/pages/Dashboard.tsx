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
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";

const RealTimeCounter = ({ initialValue, isCurrency = false, isPercent = false, suffix = "" }: { initialValue: number, isCurrency?: boolean, isPercent?: boolean, suffix?: string }) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    if (isPercent) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setValue(prev => prev + (isCurrency ? Math.floor(Math.random() * 1500) + 500 : Math.floor(Math.random() * 3) + 1));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isCurrency, isPercent]);

  return (
    <CountUp 
      start={initialValue} 
      end={value} 
      duration={2} 
      decimals={isPercent ? 1 : 0}
      prefix={isCurrency ? "₹" : ""}
      suffix={suffix || (isPercent ? "%" : "")}
      separator=","
      preserveValue={true}
    />
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7D");
  const [user, setUser] = useState<any>(null);

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
      <Header />
      
      <div className="relative pt-20 flex">
        <AppSidebar activePath="/dashboard" />
        {/* Main Logic Core */}
        <main className="flex-1 p-6 md:p-16 lg:p-20 min-h-[calc(100vh-80px)] bg-background relative selection:bg-primary selection:text-primary-foreground">
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
                <Button onClick={() => navigate('/profile')} variant="outline" className="h-12 md:h-14 rounded-xl px-6 font-bold bg-secondary/10 border-border/40 gap-3 hover:bg-secondary/20 transition-all text-sm shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                  View Public Profile
                </Button>
                <Button onClick={() => navigate('/createcourse')} className="h-12 md:h-14 rounded-xl px-8 font-bold bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all text-sm">
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
                  <Button onClick={() => navigate('/settings')} className="w-full h-14 rounded-xl font-bold bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-xl border-none mt-4">
                    Update Profile Details
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
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-14 h-14 rounded-2xl border-2 border-background bg-secondary/50 flex items-center justify-center font-bold text-xs text-primary shadow-sm hover:-translate-y-2 hover:z-10 cursor-pointer transition-transform">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                      <div className="w-14 h-14 rounded-2xl border-2 border-background bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                        +99
                      </div>
                    </div>
                    <Button onClick={() => navigate('/search')} variant="outline" className="w-full max-w-[140px] h-14 rounded-xl border-border/40 hover:bg-secondary/20 transition-all font-bold text-xs">
                       View Network
                    </Button>
                  </div>
                  <div className="pt-2">
                     <p className="text-xs font-semibold text-muted-foreground text-center opacity-80">Connect with other top creators globally.</p>
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
                  <Button onClick={() => navigate('/createcourse')} className="h-16 px-10 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all border-none group/btn">
                    Launch Course
                    <ArrowRight className="w-6 h-6 stroke-[3px] ml-3 group-hover/btn:translate-x-2 transition-transform" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Network Visits", initialValue: 2478, icon: <Users className="w-5 h-5" />, trend: "+12%", isCurrency: false, isPercent: false },
                  { label: "Net Revenue", initialValue: 1250400, icon: <DollarSign className="w-5 h-5" />, trend: "+8.4%", isCurrency: true, isPercent: false },
                  { label: "Bookings", initialValue: 154, icon: <Activity className="w-5 h-5" />, trend: "+2.1%", isCurrency: false, isPercent: false },
                  { label: "Conv Efficiency", initialValue: 6.4, icon: <TrendingUp className="w-5 h-5" />, trend: "+0.8%", isCurrency: false, isPercent: true },
                ].map((stat, i) => (
                  <Card key={i} className="p-8 rounded-3xl bg-secondary/10 border-border/40 backdrop-blur-xl group relative flex flex-col justify-between h-auto min-h-[180px] shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-all duration-500 translate-x-2 translate-y-[-2px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                       {stat.icon}
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500 border border-emerald-500/20">
                         {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-4xl font-bold tracking-tight text-foreground leading-none">
                          <RealTimeCounter 
                            initialValue={stat.initialValue} 
                            isCurrency={stat.isCurrency} 
                            isPercent={stat.isPercent} 
                          />
                       </p>
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
      <Footer />
    </div>
  );
};

export default Dashboard;
