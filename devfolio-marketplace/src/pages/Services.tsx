import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Search, Star, Clock, Users, DollarSign, 
  Plus, Filter, ChevronRight, Home as HomeIcon, 
  Calendar, MessageSquare, TrendingUp, Settings, LogOut, 
  Activity, Sparkles, Zap, Code, Palette, Megaphone
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, profileRes] = await Promise.all([
          api.get('/services'),
          api.get('/auth/profile')
        ]);
        setServices(servicesRes.data);
        setFilteredServices(servicesRes.data);
        setUser(profileRes.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter((service: any) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((service: any) => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, services]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services", active: true },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  const categories = [
    { id: "all", label: "All Sectors", icon: <Activity className="w-3 h-3" /> },
    { id: "consultation", label: "Consultation", icon: <MessageSquare className="w-3 h-3" /> },
    { id: "mentorship", label: "Mentorship", icon: <Users className="w-3 h-3" /> },
    { id: "development", label: "Development", icon: <Code className="w-3 h-3" /> },
    { id: "design", label: "Design", icon: <Palette className="w-3 h-3" /> },
    { id: "marketing", label: "Marketing", icon: <Megaphone className="w-3 h-3" /> },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'development': return <Code className="w-8 h-8" />;
      case 'design': return <Palette className="w-8 h-8" />;
      case 'marketing': return <Megaphone className="w-8 h-8" />;
      case 'consultation': return <MessageSquare className="w-8 h-8" />;
      default: return <BookOpen className="w-8 h-8" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <BookOpen className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Cataloging Services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Expert Inventory" description="Discover and deploy high-impact expert services tailored to your objectives." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">V</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Service Node</p>
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
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Active Inventory</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  Expert <span className="text-primary italic">Inventory.</span>
                </h1>
              </div>
              <Button className="rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 transition-transform gap-2">
                <Plus className="w-5 h-5" />
                Initialize Asset
              </Button>
            </header>

            {/* Strategic Filters */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative group flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Scan available assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-secondary/30 border-border/50 focus:border-primary/50 font-bold shadow-sm transition-all"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-14 px-6 rounded-2xl font-black text-xs uppercase tracking-widest gap-2 transition-all shrink-0 ${
                        selectedCategory === cat.id 
                          ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                          : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50 border border-border/50"
                      }`}
                    >
                      {cat.icon}
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assets Grid */}
            {filteredServices.length === 0 ? (
              <Card className="p-20 rounded-[40px] bg-secondary/10 border-border/50 text-center flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                <div className="w-24 h-24 rounded-[32px] bg-secondary/50 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                  <Zap className="w-12 h-12" />
                </div>
                
                <div className="space-y-4 max-w-sm">
                  <h2 className="text-3xl font-black tracking-tight text-foreground">Null Inventory Match.</h2>
                  <p className="text-muted-foreground font-medium">
                    No verified assets match your current scan parameters. Adjust your vectors or clear scan history.
                  </p>
                </div>
                
                <Button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  variant="outline" 
                   className="rounded-2xl px-12 py-8 font-black text-xl border-border/50 hover:bg-secondary transition-all"
                >
                  Recalibrate Scanner
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service: any) => (
                  <Card key={service.id} className="p-8 rounded-[40px] bg-secondary/10 border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                       <Zap className="w-16 h-16 text-primary" />
                    </div>

                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {getCategoryIcon(service.category)}
                      </div>
                      <Badge className="rounded-lg px-3 py-1 font-black text-[10px] tracking-widest uppercase bg-secondary/50 text-muted-foreground border-none">
                        {service.category}
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border/50 space-y-6">
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest opacity-60">
                        <div className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{service.rating || "5.0"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>{service.bookings || "0"} Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{service.duration || "1h"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Investment</span>
                          <p className="text-3xl font-black tracking-tight text-foreground">₹{service.price}</p>
                        </div>
                        <Button className="rounded-2xl px-6 py-7 font-black bg-foreground text-background hover:scale-110 active:scale-95 transition-all shadow-xl">
                          Deploy
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

export default Services;
