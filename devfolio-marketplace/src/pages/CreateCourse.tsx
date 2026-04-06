import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, Code, MonitorSmartphone, Plus, 
  Sparkles, Zap, ShieldCheck, Home as HomeIcon, 
  Calendar, MessageSquare, TrendingUp, BookOpen, 
  Settings, LogOut, ChevronRight, Activity, Trash
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const CreateCourse = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <Plus className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Accessing Initialization Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Asset Initialization" description="Configure and deploy high-impact expert services to the marketplace directory." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative shrink-0">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">I</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Init Node</p>
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
        <main className="flex-1 overflow-y-auto p-12 bg-background relative custom-scrollbar">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          
          <div className="max-w-4xl mx-auto space-y-12">
            <header className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Asset Initialization Vector</span>
              </div>
              <h1 className="text-6xl font-black tracking-tight text-foreground leading-[0.9]">
                Add Your <br /><span className="text-primary italic">Expertise.</span>
              </h1>
              <p className="text-lg font-medium text-muted-foreground italic leading-relaxed pt-2">
                Showcase your digital solutions — websites, apps, and branding — all in one centralized directory node.
              </p>
            </header>

            <div className="grid gap-10">
              {/* Service Details Engine */}
              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Zap className="w-32 h-32 text-primary" />
                </div>
                
                <h2 className="text-2xl font-black tracking-tight text-foreground mb-10 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-primary" />
                  Primary Configuration
                </h2>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="serviceTitle" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Asset Identifier (Title)</Label>
                    <Input
                      id="serviceTitle"
                      placeholder="Ex. Elite Performance Engineering"
                      className="h-16 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-6 shadow-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="serviceDescription" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">System Brief (Description)</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Define the scope and integrated modules of this solution..."
                      className="rounded-[24px] bg-background border-border/50 focus:border-primary/50 font-medium p-6 min-h-[160px] shadow-sm"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="servicePrice" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Investment Vector (INR)</Label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-foreground">₹</span>
                        <Input
                          id="servicePrice"
                          type="number"
                          placeholder="4999"
                          className="h-16 pl-12 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="serviceCategory" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Industry Sector (Category)</Label>
                      <Input
                        id="serviceCategory"
                        placeholder="e.g., UI Architecture, Kernel Dev"
                        className="h-16 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-6 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Asset Visualization (Thumbnail)</Label>
                    <div className="mt-2 border-2 border-dashed border-border/50 rounded-[32px] p-16 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group/upload relative overflow-hidden bg-background/50">
                      <div className="absolute inset-0 opacity-0 group-hover/upload:opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                      <Upload className="w-12 h-12 text-primary/40 mx-auto mb-6 group-hover/upload:scale-110 transition-transform duration-500" />
                      <p className="text-foreground font-black tracking-tight mb-2">
                        Initialize Media Ingestion
                      </p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Drag & drop or authorize directory access
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground/60 mt-6 italic">
                        PNG, JPG or WEBP (Max Payload. 2MB)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Features Engine */}
              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Sparkles className="w-32 h-32 text-primary" />
                </div>
                
                <div className="flex items-center justify-between mb-10 z-10 relative">
                  <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-3">
                    <Code className="w-6 h-6 text-primary" />
                    Module Attributes
                  </h2>
                  <Button className="rounded-xl px-6 py-5 font-black text-[10px] uppercase tracking-widest bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform gap-2">
                    <Plus className="w-4 h-4" />
                    Inject Module
                  </Button>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="border border-border/50 rounded-[32px] p-8 bg-background/50 backdrop-blur-xl group/feat hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/20">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary">01</div>
                         <h3 className="font-black text-lg tracking-tight text-foreground">
                            High-Fidelity Interface
                         </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0 hover:bg-secondary"><Settings className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0 hover:bg-destructive/10 text-destructive"><Trash className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { icon: <MonitorSmartphone className="w-4 h-4 text-primary" />, text: "Multi-Node Layouts" },
                        { icon: <Code className="w-4 h-4 text-primary" />, text: "SEO-Optimized Logic" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-secondary/10 rounded-2xl border border-border/10 group/item hover:border-primary/20 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-inner group-item:scale-110 transition-transform">
                             {item.icon}
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.text}</span>
                        </div>
                      ))}
                      <Button variant="outline" className="h-14 rounded-2xl border-border/50 border-dashed hover:border-primary/30 bg-background/50 font-black text-[10px] uppercase tracking-widest gap-2">
                        <Plus className="w-3 h-3" />
                        Incorporate Static
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Benefits Info Panel */}
              <Card className="p-10 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                    <ShieldCheck className="w-64 h-64 text-background" />
                </div>
                
                <h2 className="text-3xl font-black tracking-tight mb-8 relative z-10">Elite Integration <span className="text-primary italic">Incentives.</span></h2>
                <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                  {[
                    { text: "Absolute Equity Retention — Zero Commission Architecture", icon: <Zap className="w-5 h-5 text-primary" /> },
                    { text: "Atomic Signal Processing for Multi-Branch Transfers", icon: <Activity className="w-5 h-5 text-primary" /> },
                    { text: "Universal Stakeholder Management Interface", icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
                    { text: "Autonomous Content Expansion Algorithms", icon: <Sparkles className="w-5 h-5 text-primary" /> },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 group/ben">
                       <div className="w-10 h-10 rounded-xl bg-background/10 backdrop-blur-md border border-background/20 flex items-center justify-center text-primary group-ben:scale-110 transition-transform shrink-0">
                          {benefit.icon}
                       </div>
                       <p className="text-xs font-black uppercase tracking-widest opacity-60 leading-relaxed italic h-fit">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-border/50">
              <Button size="lg" className="h-20 flex-1 rounded-[24px] bg-primary text-primary-foreground text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-3">
                Deploy Configuration
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-20 flex-1 rounded-[24px] border-border/50 bg-secondary/10 text-lg font-black uppercase tracking-widest hover:bg-secondary/20 transition-all italic">
                Store as Draft Node
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer /> {/* Hid footer on dashboard style pages */}
    </div>
  );
};

export default CreateCourse;
