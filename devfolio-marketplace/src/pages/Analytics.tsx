import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Eye, Clock, Calendar, 
  Download, ArrowUpRight, ArrowDownRight, 
  Globe, Share2, MousePointer2, Activity,
  Home as HomeIcon, BookOpen, MessageSquare, Settings, LogOut, Sparkles
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    topPages: [],
    trafficSources: [],
    dailyStats: []
  });
  const [timeRange, setTimeRange] = useState("7D");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, profileRes] = await Promise.all([
          api.get(`/analytics?period=${timeRange}`),
          api.get('/auth/profile')
        ]);
        setAnalytics(analyticsRes.data);
        setUser(profileRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics", active: true },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <Activity className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Synchronizing Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Expert Telemetry" description="Analyze your reach, engagement, and conversion metrics in real-time." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">A</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Intelligence Node</p>
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
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
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
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Telemetry Stream</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  Expert <span className="text-primary italic">Telemetry.</span>
                </h1>
              </div>
              <Button variant="outline" className="rounded-xl px-6 py-6 font-bold bg-secondary/30 border-border/50 gap-2 hover:bg-secondary/50 transition-all">
                <Download className="w-4 h-4" />
                Capture Intel (Export)
              </Button>
            </header>

            {/* Strategy Selectors */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-secondary/30 border border-border/50 w-fit">
              {["7D", "30D", "3M", "6M"].map((range) => (
                <Button
                  key={range}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${
                    timeRange === range 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-transparent text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {range}
                </Button>
              ))}
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Reach", val: analytics.totalViews.toLocaleString(), sub: "+12.5%", trend: "up", icon: <Eye className="w-4 h-4" /> },
                { label: "Unique Nodes", val: analytics.uniqueVisitors.toLocaleString(), sub: "+8.2%", trend: "up", icon: <Users className="w-4 h-4" /> },
                { label: "Session Pulsation", val: `${analytics.avgSessionDuration}m`, sub: "-2.4%", trend: "down", icon: <Clock className="w-4 h-4" /> },
                { label: "Conversion Rate", val: "3.2%", sub: "+0.5%", trend: "up", icon: <TrendingUp className="w-4 h-4" /> },
              ].map((metric, i) => (
                <Card key={i} className="p-8 rounded-[32px] bg-secondary/10 border-border/50 group hover:border-primary/30 transition-all relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{metric.label}</p>
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">{metric.icon}</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black tracking-tight text-foreground">{metric.val}</p>
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.sub}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Intelligent Lists */}
              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    High-Velocity Segments
                  </h3>
                  <Badge variant="secondary" className="rounded-lg font-black bg-primary/10 text-primary border-none">TOP NODES</Badge>
                </div>
                <div className="space-y-4">
                  {analytics.topPages.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto opacity-20">
                        <Activity className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-muted-foreground">Insufficient segment telemetry.</p>
                    </div>
                  ) : (
                    analytics.topPages.map((page: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/50 group hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-xs font-black text-primary border border-border/50">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-black text-sm text-foreground">{page.name}</p>
                            <p className="text-[10px] font-medium text-muted-foreground tracking-wider">{page.path}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-foreground">{page.views.toLocaleString()}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">INTEL PULSE</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    Vectors of Origin
                  </h3>
                  <Badge variant="secondary" className="rounded-lg font-black bg-primary/10 text-primary border-none">TRAFFIC</Badge>
                </div>
                <div className="space-y-6">
                  {analytics.trafficSources.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto opacity-20">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-muted-foreground">Calibration required for vector mapping.</p>
                    </div>
                  ) : (
                    analytics.trafficSources.map((source: any, index: number) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest opacity-80">{source.name}</span>
                          </div>
                          <span className="text-xs font-black text-primary">{source.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/50 p-0.5">
                          <div
                            className="bg-primary h-full rounded-full shadow-lg shadow-primary/20 transition-all duration-1000"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Advanced Telemetry Visualization */}
            <Card className="p-10 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <Activity className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">Real-time Node Activity</h3>
                    <p className="text-background/60 font-medium">Monitoring global interaction pulses across all verified sectors.</p>
                  </div>
                  <div className="hidden md:flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Live Stream</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 rounded-3xl bg-background/5 border border-background/10 flex flex-col items-center justify-center text-center space-y-4 backdrop-blur-sm relative overflow-hidden">
                   {/* Background grid for "chart" feel */}
                   <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                   
                   <TrendingUp className="w-16 h-16 text-primary opacity-20" />
                   <div className="space-y-1">
                     <p className="text-sm font-black uppercase tracking-widest text-background/80">Pending Visualization</p>
                     <p className="text-xs font-medium text-background/40">Telemetric density is currently establishing equilibrium.</p>
                   </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
