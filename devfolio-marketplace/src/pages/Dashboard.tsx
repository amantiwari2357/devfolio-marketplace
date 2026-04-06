import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, DollarSign, Users, TrendingUp, Settings, 
  Home as HomeIcon, BookOpen, MessageSquare, 
  Code, School, Briefcase, LogOut, CheckCircle2, 
  Sparkles, ExternalLink, Activity
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
      <SEO title="Expert Dashboard" description="Manage your creator business, track performance, and connect with your audience." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-110">
              <span className="text-primary-foreground font-black text-xl">D</span>
            </div>
            <div className="group cursor-pointer">
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Control Node</p>
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
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          
          <div className="max-w-6xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Active Node</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  Hi, {user?.firstName || 'User'}<span className="text-primary italic">.</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-xl px-6 py-6 font-bold bg-secondary/30 border-border/50 gap-2 hover:bg-secondary/50 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  devfolio.io/{user?.email?.split('@')[0] || 'profile'}
                </Button>
                <Button className="rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
                  Deploy Assets
                </Button>
              </div>
            </header>

            {/* Strategic Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Activity className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Optimize your presence.</h2>
                  <p className="text-muted-foreground font-medium">Complete these nodes to maximize expert conversion.</p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-bold opacity-80">Sync availability engine</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-border shadow-inner" />
                      <span className="text-sm font-bold opacity-80">Architect your expert profile</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full md:w-auto rounded-xl px-8 py-6 font-black bg-foreground text-background hover:scale-105 transition-all">
                    Initiate Optimization
                  </Button>
                </div>
              </Card>

              <Card className="p-10 rounded-[40px] bg-primary/5 border-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Users className="w-32 h-32 text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Global Inspiration.</h2>
                  <p className="text-muted-foreground font-medium">Observe how top experts scale their knowledge systems.</p>
                  <div className="flex -space-x-4 pt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-secondary/50 flex items-center justify-center font-black text-xs text-primary ring-1 ring-border/20">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground flex items-center justify-center font-black text-xs">
                      +12
                    </div>
                  </div>
                  <p className="text-sm font-bold opacity-80">Join the top 1% creators circle</p>
                </div>
              </Card>
            </div>

            {/* Campaign Module */}
            <Card className="rounded-[40px] bg-foreground text-background border-none relative overflow-hidden shadow-2xl shadow-primary/10 transition-all hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                <Sparkles className="w-96 h-96 text-primary" />
              </div>
              <div className="p-12 md:p-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    Seasonal Accelerator
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                    Launch Your <span className="text-primary italic">Course.</span>
                  </h2>
                  <p className="text-xl text-background/60 font-medium">Scale to ₹50K+ sales this cycle with <span className="text-primary font-black underline underline-offset-4 decoration-primary/30">0% Commission</span> fee.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end">
                  <Button className="rounded-2xl px-12 py-8 font-black text-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all">
                    Start Launch
                  </Button>
                  <Button variant="outline" className="rounded-2xl px-12 py-8 font-black text-xl border-background/20 text-background hover:bg-background/10 transition-all">
                    Consult Expert
                  </Button>
                </div>
              </div>
            </Card>

            {/* Performance Engine */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Performance Engine</p>
                <div className="p-1.5 rounded-2xl bg-secondary/30 border border-border/50 flex gap-1">
                  {["7D", "30D", "3M", "6M"].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
                        timeRange === range 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "bg-transparent text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: "Total Visits", val: "2.4K", icon: <Users className="w-4 h-4" /> },
                  { label: "Net Revenue", val: "₹1.2M", icon: <DollarSign className="w-4 h-4" /> },
                  { label: "Sales Count", val: "154", icon: <Activity className="w-4 h-4" /> },
                  { label: "Conversion", val: "6.4%", icon: <TrendingUp className="w-4 h-4" /> },
                ].map((stat, i) => (
                  <Card key={i} className="p-8 rounded-3xl bg-secondary/10 border-border/50 group hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">{stat.icon}</div>
                    </div>
                    <p className="text-3xl font-black tracking-tight text-foreground">{stat.val}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-20 rounded-[40px] bg-secondary/5 border-border/20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-secondary/50 flex items-center justify-center text-muted-foreground mb-4">
                  <Activity className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-foreground">Intelligence pending deployment.</h3>
                <p className="text-muted-foreground font-medium max-w-sm">Detailed telemetry nodes will appear once your first expert session is established.</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
