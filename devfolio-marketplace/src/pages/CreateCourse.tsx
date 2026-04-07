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
  Settings, LogOut, ChevronRight, Activity, Trash, Globe, Layers, Fingerprint
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import logo from "../../public/Images/logo.png";

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-[22px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse shadow-sm relative z-10">
            <Plus className="w-8 h-8 stroke-[3px]" />
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Asset Initialization" description="Configure and deploy high-impact expert services to the marketplace directory." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Protocol */}
        <aside className="w-80 border-r border-border/40 bg-secondary/10 backdrop-blur-3xl flex flex-col p-10 relative shrink-0 z-20">
          <div className="flex items-center gap-4 mb-14 animate-fade-in">
            <a href="/" className="group cursor-pointer block">
              <img src={logo} alt="Devfolio Logo" className="h-24 w-auto group-hover:scale-105 transition-transform duration-300" />
            </a>
          </div>

          <div className="flex-1 space-y-12 overflow-y-auto pr-2 custom-scrollbar animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Core Directory</p>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="flex items-center gap-4 px-6 py-4 rounded-[22px] font-black text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all group border-none"
                  >
                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Insights & Scale</p>
              <nav className="space-y-3">
                {analysisItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="flex items-center gap-4 px-6 py-4 rounded-[22px] font-black text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all group border-none"
                  >
                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-10 border-t border-border/20 space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 p-6 rounded-[28px] bg-background/50 shadow-inner border border-border/20 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-xl shadow-sm group-hover:scale-105 transition-transform italic text-primary/70">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-foreground italic uppercase">{user?.firstName || 'Creator'}</p>
                <p className="text-[10px] font-bold truncate text-muted-foreground opacity-60 uppercase tracking-widest">{user?.email?.split('@')[0]}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full h-14 flex items-center gap-4 px-6 rounded-[20px] font-black text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-all justify-start text-[10px] uppercase tracking-[0.3em] italic border-none"
            >
              <LogOut className="w-5 h-5" />
              Disconnect
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-12 md:p-20 bg-background relative custom-scrollbar selection:bg-primary selection:text-primary-foreground">
          {/* Background Mesh Flux */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/2 opacity-20 blur-[150px] rounded-full" />
          
          <div className="max-w-[1000px] mx-auto space-y-20 animate-slide-up">
            <header className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-2 text-primary animate-fade-in">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary/80" />
                <span className="text-xs font-semibold uppercase tracking-wider">Create New Service</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Add Your <br className="hidden md:block" /><span className="text-primary">Expertise.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Showcase your digital solutions — websites, apps, and branding — all in one centralized directory for global discovery.
              </p>
            </header>

            <div className="grid gap-12">
              {/* Service Details Engine */}
              <Card className="p-12 md:p-16 rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                  <Zap className="w-56 h-56 text-primary" />
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 md:mb-10 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  Primary Configuration
                </h2>

                <div className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle" className="text-xs font-semibold text-foreground ml-1">Service Title</Label>
                    <Input
                      id="serviceTitle"
                      placeholder="e.g., Full-Stack Web Development"
                      className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="serviceDescription" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 italic px-2">System Brief (Description)</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="DEFINE THE SCOPE AND INTEGRATED MODULES OF THIS SOLUTION..."
                      className="rounded-[28px] bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest min-h-[180px] p-8 placeholder:opacity-30 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label htmlFor="servicePrice" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 italic px-2">Investment Vector (INR)</Label>
                      <div className="relative">
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-primary text-lg">₹</span>
                        <Input
                          id="servicePrice"
                          type="number"
                          placeholder="4999"
                          className="h-16 pl-14 rounded-[22px] bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-30"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="serviceCategory" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 italic px-2">Industry Sector (Category)</Label>
                      <Input
                        id="serviceCategory"
                        placeholder="E.G., UI ARCHITECTURE"
                        className="h-16 rounded-[22px] px-8 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-30"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 italic px-2">Asset Visualization (Thumbnail)</Label>
                    <div className="mt-2 border-2 border-dashed border-border/40 rounded-[44px] p-20 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group/upload relative overflow-hidden bg-background/50 shadow-inner">
                      <div className="absolute inset-0 opacity-0 group-hover/upload:opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                      <Upload className="w-16 h-16 text-primary/30 mx-auto mb-8 group-hover/upload:scale-110 group-hover/upload:rotate-6 transition-all duration-700" />
                      <p className="text-xl font-black tracking-tighter text-foreground mb-3 italic uppercase">
                        Initialize Media Ingestion
                      </p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-60">
                        Drag & drop or authorize directory access
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-4 text-muted-foreground/30 italic">
                         <Activity className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em]">PNG, JPG, WEBP (MAX 2MB)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Features Engine */}
              <Card className="p-12 md:p-16 rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-8 translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                  <Layers className="w-56 h-56 text-primary" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-8 z-10 relative">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-4 italic uppercase">
                      <Code className="w-6 h-6 text-primary" />
                      Module Attributes
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-12 opacity-50 italic">Define discrete system values</p>
                  </div>
                  <Button className="h-16 rounded-[20px] px-8 font-black text-[10px] uppercase tracking-[0.3em] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-3 italic border-none">
                    <Plus className="w-5 h-5 stroke-[4px]" />
                    Inject Module
                  </Button>
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="border border-border/40 rounded-[32px] p-10 bg-background/50 backdrop-blur-3xl group/feat hover:border-primary/40 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/20">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 rounded-[18px] bg-secondary/50 flex items-center justify-center text-primary font-black italic shadow-inner">01</div>
                         <div className="space-y-1">
                            <h3 className="font-black text-xl tracking-tighter text-foreground italic uppercase">
                               High-Fidelity Interface
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 italic">System Module Alpha</p>
                         </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="rounded-xl h-12 w-12 p-0 hover:bg-secondary/50 transition-all border-none"><Settings className="w-5 h-5 opacity-40 hover:opacity-100" /></Button>
                        <Button variant="ghost" size="sm" className="rounded-xl h-12 w-12 p-0 hover:bg-destructive/10 text-destructive transition-all border-none"><Trash className="w-5 h-5 opacity-40 hover:opacity-100" /></Button>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { icon: <MonitorSmartphone className="w-5 h-5 text-primary" />, text: "Multi-Node Layouts" },
                        { icon: <Code className="w-5 h-5 text-primary" />, text: "SEO-Optimized Logic" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-secondary/10 rounded-[22px] border border-border/10 group/item hover:border-primary/30 transition-all cursor-pointer">
                          <div className="w-12 h-12 rounded-2xl bg-background shadow-inner flex items-center justify-center group-hover/item:scale-110 transition-transform">
                             {item.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic opacity-80">{item.text}</span>
                        </div>
                      ))}
                      <Button variant="outline" className="h-16 rounded-[22px] border-border/40 border-dashed hover:border-primary/40 bg-background/50 font-black text-[10px] uppercase tracking-[0.3em] gap-3 italic transition-all group/add">
                        <Plus className="w-5 h-5 stroke-[4px] opacity-40 group-hover/add:opacity-100 transition-opacity" />
                        Incorporate Static
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Benefits Info Panel */}
              <Card className="p-12 md:p-20 rounded-[56px] bg-foreground text-background border-none relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40" />
                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                    <ShieldCheck className="w-80 h-80 text-background" />
                </div>
                
                <div className="space-y-4 mb-12 relative z-10">
                   <div className="flex items-center gap-3 text-primary animate-pulse">
                      <Zap className="w-5 h-5 fill-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Incentive Stream</span>
                   </div>
                   <h2 className="text-3xl font-black tracking-tighter italic uppercase leading-none">Elite Integration <span className="text-primary NOT-italic block md:inline">Incentives.</span></h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-10 relative z-10">
                  {[
                    { text: "Absolute Equity Retention — Zero Commission Architecture", icon: <Zap className="w-6 h-6 text-primary" /> },
                    { text: "Atomic Signal Processing for Multi-Branch Transfers", icon: <Activity className="w-6 h-6 text-primary" /> },
                    { text: "Universal Stakeholder Management Interface", icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
                    { text: "Autonomous Content Expansion Algorithms", icon: <Sparkles className="w-6 h-6 text-primary" /> },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-6 group/ben cursor-pointer">
                       <div className="w-14 h-14 rounded-[20px] bg-background/10 backdrop-blur-3xl border border-background/20 flex items-center justify-center text-primary group-hover/ben:scale-110 group-hover/ben:rotate-6 transition-all shrink-0 shadow-xl">
                          {benefit.icon}
                       </div>
                       <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60 leading-relaxed italic h-fit">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-10 border-t border-border/20">
              <Button size="lg" className="h-14 md:h-16 flex-1 rounded-xl bg-primary text-primary-foreground text-sm md:text-base font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all gap-3 group">
                Publish Service
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 md:h-16 flex-1 rounded-xl border-border/40 bg-secondary/10 text-sm md:text-base font-bold hover:bg-secondary/20 transition-all shadow-sm">
                Save Draft
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-muted-foreground/30 italic pt-6 animate-fade-in">
               <Fingerprint className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Architect Signature Required</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
