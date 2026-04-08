import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, Activity, Users, Clock, 
  TrendingUp, CheckCircle2, Zap, Layers, 
  Rocket, ExternalLink, Calendar, MessageSquare, 
  ShieldCheck, Globe, Fingerprint, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountUp from "react-countup";
import { AppSidebar } from "@/components/layout/AppSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <Activity className="w-8 h-8 stroke-[3px]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  const stats = [
    { label: "Active Nodes", value: "24", icon: <Layers className="w-5 h-5 text-primary" />, trend: "+12%" },
    { label: "Sync Latency", value: "1.2ms", icon: <Activity className="w-5 h-5 text-emerald-500" />, trend: "-0.4ms" },
    { label: "Neural Load", value: "88%", icon: <Zap className="w-5 h-5 text-amber-500" />, trend: "Optimal" },
    { label: "Uptime", value: "99.9%", icon: <Globe className="w-5 h-5 text-blue-500" />, trend: "Stable" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Dashboard | Overview" description="Your central hub for tracking performance, bookings, and analytics." />
      <Header />
      
      <div className="flex min-h-screen relative pt-20">
        <AppSidebar activePath="/dashboard" />
        
        {/* Main Dashboard Area */}
        <main className="flex-1 bg-background relative selection:bg-primary selection:text-primary-foreground">
          {/* Background effects */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/2 opacity-20 blur-[150px] rounded-full" />
          
          <div className="p-4 md:p-6 lg:p-10 xl:p-16">
            <div className="max-w-[1300px] mx-auto space-y-8 md:space-y-16">
              <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 animate-slide-up">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary animate-fade-in">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Dashboard Overview</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-none lowercase italic">
                    Welcome back, <br className="hidden md:block" /><span className="text-primary not-italic">{user?.firstName || 'Creator'}.</span>
                  </h1>
                  <p className="text-sm md:text-lg text-muted-foreground font-bold italic leading-relaxed tracking-tight">Accessing core modules and performance telemetry.</p>
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

              {/* Grid Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <Card className="p-6 sm:p-10 md:p-14 relative overflow-hidden group shadow-2xl border-border/40 bg-secondary/5 backdrop-blur-xl rounded-[32px]">
                  <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                    <Rocket className="w-56 h-56 text-primary" />
                  </div>
                  <div className="relative z-10 space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                           <Zap className="w-4 h-4 fill-primary" />
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Profile Completion</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-foreground italic uppercase">Complete Profile.</h2>
                        <p className="text-base md:text-lg font-bold italic text-muted-foreground/60 leading-relaxed tracking-tight">Finish setting up your creator profile to increase your visibility and trust with clients.</p>
                     </div>
                    <div className="space-y-5">
                      <div className="flex items-center gap-5 p-6 rounded-[24px] bg-background/50 border border-border/20 group/item hover:border-primary/40 transition-all cursor-pointer">
                        <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-inner group-hover/item:scale-110 transition-transform">
                          <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic opacity-80">Connect your calendar</span>
                      </div>
                      <div className="flex items-center gap-5 p-6 rounded-[24px] bg-background/30 border border-border/10 group/item hover:border-primary/30 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl border-2 border-border/50 shadow-inner flex items-center justify-center group-hover/item:border-primary/30 transition-all">
                           <div className="w-2.5 h-2.5 rounded-full bg-border group-hover/item:bg-primary transition-all" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic opacity-40">Add your expertise and skills</span>
                      </div>
                    </div>
                    <Button onClick={() => navigate('/settings')} className="w-full h-14 rounded-xl font-bold bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-xl border-none mt-4">
                      Update Profile Details
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 sm:p-10 md:p-14 bg-primary/5 border-primary/20 relative overflow-hidden group shadow-2xl rounded-[32px]">
                  <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                    <Layers className="w-56 h-56 text-primary" />
                  </div>
                  <div className="relative z-10 space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                           <Layers className="w-4 h-4 fill-primary" />
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Global Community</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-foreground italic uppercase">Global Network.</h2>
                        <p className="text-base md:text-lg font-bold italic text-muted-foreground/60 leading-relaxed tracking-tight">Connect with other top creators and see how they showcase their expertise globally.</p>
                     </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex -space-x-4">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-secondary/50 overflow-hidden ring-2 ring-primary/20">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="Expert" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black italic text-foreground tracking-tighter">1.2K+</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Global Experts</p>
                      </div>
                    </div>
                    <div className="space-y-6 pt-6">
                      {[
                        { label: 'Market Liquidity', value: 'High' },
                        { label: 'Network Stability', value: 'v2.4.1' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">{item.label}</span>
                          <span className="text-[10px] font-black italic text-primary uppercase tracking-[0.4em]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => navigate('/listing')} className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-xl shadow-primary/20 border-none mt-4">
                      Explore Market Listing
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Performance Section */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="lg:col-span-3 space-y-10">
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/20 border border-primary/20 text-[10px] font-black uppercase tracking-[0.6em] text-primary shadow-inner italic">
                    <Zap className="w-4 h-4 fill-primary" />
                    NEW CREATOR PROGRAM
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[0.8] italic uppercase">
                    LAUNCH YOUR <span className="text-primary italic-none group-hover:rotate-3 transition-transform block lg:inline-block">COURSE.</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-foreground font-bold italic max-w-xl leading-relaxed tracking-tight">Scale your earnings to ₹10K+ monthly with <span className="text-primary font-black underline underline-offset-[12px] decoration-primary/30">Zero Commission Fees.</span></p>
                </div>
                <div className="lg:col-span-2 flex flex-col xl:flex-row gap-8 items-center justify-center lg:justify-end">
                  <Button onClick={() => navigate('/createcourse')} className="h-16 px-10 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all border-none group/btn">
                    Get Started Now
                    <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Metrics Visuals */}
              <div className="space-y-12 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary italic">Live Metrics</h3>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase underline decoration-primary/30 underline-offset-8">Engagement Core.</h2>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/10 border border-border/40 backdrop-blur-md">
                     {[ '24h', '7d', '30d' ].map((t, i) => (
                       <button key={t} className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${i===0 ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-primary/10 text-muted-foreground'}`}>
                         {t}
                       </button>
                     ))}
                  </div>
                </div>

                <Card className="p-6 sm:p-10 md:p-16 rounded-[48px] bg-secondary/5 border-border/40 shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
                    <Activity className="w-[500px] h-[500px]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                     {[
                       { label: 'Protocol Views', value: 12480, icon: <TrendingUp />, prefix: '' },
                       { label: 'Token Yield', value: 84200, icon: <Zap />, prefix: '₹' },
                       { label: 'Active Sessions', value: 142, icon: <Users />, prefix: '' }
                     ].map((metric, i) => (
                       <div key={i} className="space-y-6">
                          <div className="flex items-center gap-3 text-primary opacity-60">
                             {metric.icon}
                             <span className="text-[10px] font-bold uppercase tracking-widest">{metric.label}</span>
                          </div>
                           <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                             <span className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground italic leading-none">
                               {metric.prefix}<CountUp end={metric.value} duration={2.5} separator="," />
                             </span>
                             <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                                <TrendingUp className="w-6 h-6" />
                             </div>
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-40 italic">+12.4% from last telemetry cycle</p>
                       </div>
                     ))}
                  </div>
                  <div className="mt-16 pt-16 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-sm font-black italic tracking-wide text-foreground uppercase">Neural Insights Generated</h4>
                        <p className="text-base text-muted-foreground font-medium leading-relaxed">Detailed metrics will begin showing up here once you have traffic or complete your first session.</p>
                     </div>
                     <Button variant="outline" className="h-12 md:h-14 rounded-xl px-10 font-bold text-sm bg-secondary/10 border-border/40 hover:bg-foreground hover:text-background transition-all shadow-sm">
                        Refresh Data
                     </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
