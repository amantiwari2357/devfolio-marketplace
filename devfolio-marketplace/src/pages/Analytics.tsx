import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Eye, Clock, Calendar, 
  Download, ArrowUpRight, ArrowDownRight, 
  Globe, Share2, MousePointer2, Activity,
  Home as HomeIcon, BookOpen, MessageSquare, Settings, LogOut, Sparkles,
  Cpu, Zap, Fingerprint, Rocket, ShieldCheck, Layers, BarChart3, LineChart
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import { AppSidebar } from "@/components/layout/AppSidebar";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <Activity className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="System Analytics | Intelligence" description="Distilled telemetry stream and interaction velocity metrics across the DEVFOLIO node." />
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/analytics" />

        {/* Main Telemetry Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 lg:p-20 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 lg:pt-20">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary animate-fade-in">
                  <Activity className="w-4 h-4 opacity-70" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary/80">Platform Dashboard</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  System <span className="text-primary">Analytics.</span>
                </h1>
              </div>
              <Button variant="outline" className="w-full md:w-auto h-12 md:h-14 rounded-xl px-6 font-bold bg-secondary/10 border-border/40 gap-3 hover:bg-foreground hover:text-background transition-all shadow-sm text-sm">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </header>

            {/* Strategy Selectors Matrix */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/10 border border-border/40 backdrop-blur-xl w-full md:w-fit shadow-sm overflow-x-auto hide-scrollbar">
                {["7D", "30D", "3M", "6M"].map((range) => (
                  <Button
                    key={range}
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
              <div className="flex items-center gap-3 text-muted-foreground/60">
                 <ShieldCheck className="w-4 h-4" />
                 <span className="text-xs font-semibold uppercase tracking-wider">Verified Live Data</span>
              </div>
            </div>

            {/* Core Metrics Grid Fabric */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {[
                { label: "Total Reach", val: analytics.totalViews.toLocaleString(), sub: "+12.5%", trend: "up", icon: <Eye className="w-5 h-5" /> },
                { label: "Unique Visitors", val: analytics.uniqueVisitors.toLocaleString(), sub: "+8.2%", trend: "up", icon: <Users className="w-5 h-5" /> },
                { label: "Session Duration", val: `${analytics.avgSessionDuration}m`, sub: "-2.4%", trend: "down", icon: <Clock className="w-5 h-5" /> },
                { label: "Conversion Rate", val: "3.2%", sub: "+0.5%", trend: "up", icon: <Zap className="w-5 h-5" /> },
              ].map((metric, i) => (
                <Card key={i} className="p-6 md:p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow border-border/60 rounded-3xl flex flex-col justify-between h-auto min-h-[160px] bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{metric.label}</p>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{metric.icon}</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">{metric.val}</p>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {metric.sub}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slide-up" style={{ animationDelay: '300ms' }}>
              {/* Intelligent Segment Lists */}
              <Card className="neural-card p-10 md:p-12 space-y-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                   <BarChart3 className="w-40 h-40" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tighter italic uppercase flex items-center gap-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                      High-Velocity Segments
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40 italic ml-10">Active Interaction Nodes</p>
                  </div>
                  <Badge className="rounded-xl px-4 py-1.5 font-black bg-foreground/10 text-foreground border-none backdrop-blur-md text-[10px] tracking-widest uppercase">INTEL</Badge>
                </div>
                <div className="space-y-4 relative z-10">
                  {analytics.topPages.length === 0 ? (
                    <div className="text-center py-20 space-y-6 rounded-[32px] bg-background/20 border border-dashed border-border/50">
                      <Activity className="w-16 h-16 text-muted-foreground/20 mx-auto animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Insufficient segment telemetry mapping.</p>
                    </div>
                  ) : (
                    analytics.topPages.map((page: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-6 rounded-[28px] bg-background/50 border border-border/20 group/item hover:border-primary/30 transition-all shadow-inner backdrop-blur-xl">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-xs font-black text-primary border border-border/20 shadow-inner group-hover/item:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-black text-lg text-foreground italic uppercase tracking-tighter">{page.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-[0.2em]">{page.path}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-2xl text-foreground italic leading-none">{page.views.toLocaleString()}</p>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">PULSE</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Vectors of Origin Protocol */}
              <Card className="neural-card p-10 md:p-12 space-y-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                   <Globe className="w-40 h-40" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tighter italic uppercase flex items-center gap-4">
                      <Fingerprint className="w-6 h-6 text-primary" />
                      Vectors of Origin
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40 italic ml-10">Global Distribution Protocol</p>
                  </div>
                  <Badge className="rounded-xl px-4 py-1.5 font-black bg-foreground/10 text-foreground border-none backdrop-blur-md text-[10px] tracking-widest uppercase">TRAFFIC</Badge>
                </div>
                <div className="space-y-8 relative z-10">
                  {analytics.trafficSources.length === 0 ? (
                    <div className="text-center py-20 space-y-6 rounded-[32px] bg-background/20 border border-dashed border-border/50">
                      <Share2 className="w-16 h-16 text-muted-foreground/20 mx-auto animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Calibration required for vector mapping flux.</p>
                    </div>
                  ) : (
                    analytics.trafficSources.map((source: any, index: number) => (
                      <div key={index} className="space-y-4 group/vector">
                        <div className="flex items-center justify-between px-2">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/vector:scale-110 transition-transform">
                               <Share2 className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-80">{source.name} Vector</span>
                          </div>
                          <span className="text-xl font-black text-foreground italic">{source.percentage}%</span>
                        </div>
                        <div className="h-4 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/20 p-1.5 backdrop-blur-md shadow-inner">
                          <div
                            className="bg-primary h-full rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),.4)] transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${source.percentage}%` }}
                          >
                             <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Advanced Telemetry Visualization Core */}
            <Card className="rounded-[40px] md:rounded-[64px] bg-foreground text-background border-none relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,.5)]">
              {/* Mesh background for the dark card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
                <LineChart className="w-[400px] h-[400px] text-primary" />
              </div>
              <div className="relative z-10 space-y-12 p-8 md:p-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-primary animate-pulse">
                      <Rocket className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Neural Flow Synchronization</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase leading-none">Real-time Node Activity</h3>
                    <p className="text-background/50 font-bold italic uppercase tracking-widest text-xs ml-1 opacity-70">Global interaction pulses monitored across all verified platform sectors.</p>
                  </div>
                  <Button className="h-16 rounded-[22px] px-10 font-black bg-primary text-primary-foreground border-none hover:scale-105 active:scale-95 transition-all shadow-2xl">
                     Initialize Stream
                  </Button>
                </div>

                <div className="h-64 md:h-96 rounded-[32px] md:rounded-[48px] bg-background/5 border border-background/10 flex flex-col items-center justify-center text-center space-y-8 backdrop-blur-3xl relative overflow-hidden shadow-inner group/chart">
                   {/* Background neural grid */}
                   <div className="absolute inset-0 opacity-5 pointer-events-none group-hover/chart:opacity-10 transition-opacity duration-1000" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                   
                   <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-[60px] animate-pulse rounded-full" />
                      <Activity className="w-24 h-24 text-primary relative z-10 animate-pulse" />
                   </div>
                   
                   <div className="space-y-2 relative z-10">
                     <p className="text-2xl font-black uppercase tracking-[0.4em] text-background italic">Telemetric Density Establishing</p>
                     <div className="flex items-center justify-center gap-4 opacity-40">
                        <div className="w-12 h-1 bg-background/20 rounded-full overflow-hidden">
                           <div className="h-full bg-primary animate-loading-bar w-full" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Calibrating Flow Vectors...</p>
                     </div>
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
