import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Search, Star, Clock, Users, DollarSign, 
  Plus, Filter, ChevronRight, Home as HomeIcon, 
  Calendar, MessageSquare, TrendingUp, Settings, LogOut, 
  Activity, Sparkles, Zap, Code, Palette, Megaphone,
  Lock, Cpu, Fingerprint, Layers, Rocket, Globe
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import { AppSidebar } from "@/components/layout/AppSidebar";

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

  const categories = [
    { id: "all", label: "Global Sectors", icon: <Globe className="w-3 h-3" /> },
    { id: "consultation", label: "Consultation", icon: <MessageSquare className="w-3 h-3" /> },
    { id: "mentorship", label: "Mentorship", icon: <Users className="w-3 h-3" /> },
    { id: "development", label: "Neural Flow", icon: <Code className="w-3 h-3" /> },
    { id: "design", label: "Synthesis", icon: <Palette className="w-3 h-3" /> },
    { id: "marketing", label: "Broadcast", icon: <Megaphone className="w-3 h-3" /> },
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-inner">
          <Cpu className="w-8 h-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Cataloging System Nodes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Protocol Inventory | Services" description="Distilled asset catalog of high-impact expert services across the DEVFOLIO node." />
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/services" />

        {/* Main Inventory Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 md:pt-16">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary animate-fade-in">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Active Protocol Inventory</span>
                </div>
                <h1 className="heading-responsive">
                  Protocol <span className="text-primary NOT-italic">Inventory.</span>
                </h1>
              </div>
              <Button className="h-16 rounded-[22px] px-10 font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 uppercase tracking-[0.2em] border-none italic">
                <Plus className="w-5 h-5 stroke-[4px]" />
                Initialize Asset
              </Button>
            </header>

            {/* Strategic Filters Matrix */}
            <div className="space-y-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="relative group flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                  <Input
                    placeholder="Scan available nodes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-14 md:h-16 pl-14 rounded-[22px] bg-secondary/10 border-border/40 backdrop-blur-3xl focus:border-primary/50 font-black shadow-inner italic tracking-widest transition-all text-[10px] md:text-xs"
                  />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar lg:max-w-2xl">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-14 px-6 rounded-[18px] font-black text-[10px] uppercase tracking-[0.3em] gap-3 transition-all shrink-0 shadow-xl relative overflow-hidden group ${
                        selectedCategory === cat.id 
                          ? "bg-foreground text-background scale-105 border-none" 
                          : "bg-secondary/10 text-muted-foreground hover:bg-secondary/20 border border-border/40 backdrop-blur-md"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-background/20"} transition-colors`}>
                        {cat.icon}
                      </div>
                      <span className="italic">{cat.label}</span>
                      {selectedCategory === cat.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary animate-pulse" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assets Grid Fabric */}
            {filteredServices.length === 0 ? (
              <Card className="neural-card p-12 md:p-32 text-center flex flex-col items-center justify-center space-y-10 relative overflow-hidden group animate-fade-in shadow-2xl">
                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                
                <div className="w-32 h-32 rounded-[44px] bg-secondary/50 flex items-center justify-center text-primary/30 border border-border/20 shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                  <Rocket className="w-16 h-16" />
                </div>
                
                <div className="space-y-4 max-w-md">
                  <h2 className="text-4xl font-black tracking-tighter text-foreground italic uppercase opacity-40 leading-none">Null Catalog Match.</h2>
                  <p className="text-muted-foreground font-bold italic tracking-widest text-sm uppercase opacity-60 leading-relaxed">
                    No verified nodes match your current scan parameters. Adjust your vectors or clear scan history.
                  </p>
                </div>
                
                <Button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  variant="outline" 
                  className="rounded-[24px] px-16 py-10 font-black text-xs uppercase tracking-[0.4em] border-border/40 hover:bg-foreground hover:text-background transition-all shadow-2xl group-hover:translate-y-[-4px]"
                >
                  Recalibrate Scanner Protocol
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                {filteredServices.map((service: any) => (
                  <Card key={service.id} className="neural-card p-8 md:p-10 hover:border-primary/40 transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),.1)] group relative overflow-hidden flex flex-col shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-y-[-10px] group-hover:translate-y-0">
                       <Zap className="w-20 h-20 text-primary" />
                    </div>

                    <div className="flex items-start justify-between mb-10">
                      <div className="w-20 h-20 rounded-[28px] bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:rotate-6 transition-transform duration-700">
                        {getCategoryIcon(service.category)}
                      </div>
                      <Badge className="rounded-xl px-4 py-2 font-black text-[10px] tracking-[0.3em] uppercase bg-foreground/10 text-foreground border-none backdrop-blur-md">
                        {service.category}
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-6">
                      <h3 className="text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors leading-[0.9] italic uppercase">
                        {service.title}
                      </h3>
                      <p className="text-sm font-bold text-muted-foreground/70 leading-relaxed italic line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-10 pt-10 border-t border-border/20 space-y-8">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
                        <div className="flex items-center gap-3">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{service.rating || "5.0"} Node</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>{service.bookings || "0"} Pulsing</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic mb-1">Equity Extraction</span>
                          <p className="text-4xl font-black tracking-tighter text-foreground italic leading-none">₹{service.price}</p>
                        </div>
                        <Button className="h-16 w-16 rounded-[22px] bg-foreground text-background hover:scale-110 active:scale-95 transition-all shadow-2xl p-0 group-hover:bg-primary group-hover:text-primary-foreground">
                          <ChevronRight className="w-6 h-6" />
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
