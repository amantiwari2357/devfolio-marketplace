import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Search, Star, Users, 
  Plus, ChevronRight, 
  MessageSquare, 
  Code, Palette, Megaphone,
  Rocket, Globe, X, ArrowLeft
} from "lucide-react";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useNavigate } from "react-router-dom";

// Default services when API doesn't return any
const defaultServices = [
  {
    id: "1",
    title: "Custom Website Development",
    description: "From portfolio sites to dynamic business platforms — fast, responsive, and SEO-friendly websites that help your brand stand out.",
    category: "development",
    price: 15000,
    rating: 4.9,
    bookings: 24,
  },
  {
    id: "2",
    title: "Full Stack Application",
    description: "Modern web applications using React, Node.js, and MongoDB — ensuring performance, scalability, and security.",
    category: "development",
    price: 25000,
    rating: 5.0,
    bookings: 18,
  },
  {
    id: "3",
    title: "UI/UX Design & Prototyping",
    description: "Crafting intuitive and user-centered designs that enhance engagement and bring your product vision to life.",
    category: "design",
    price: 8000,
    rating: 4.8,
    bookings: 31,
  },
  {
    id: "4",
    title: "1-on-1 Career Consultation",
    description: "Personalized 60-min session to review your portfolio, career goals, and help you plan your next move in tech.",
    category: "consultation",
    price: 2000,
    rating: 4.9,
    bookings: 56,
  },
  {
    id: "5",
    title: "Brand Identity & Digital Presence",
    description: "From domain setup to SEO and analytics — build a strong digital presence that converts visitors into clients.",
    category: "marketing",
    price: 12000,
    rating: 4.7,
    bookings: 15,
  },
  {
    id: "6",
    title: "Mentorship Program (4 weeks)",
    description: "Weekly 1-on-1 mentoring sessions with code reviews, project guidance, and career advice tailored to your goals.",
    category: "mentorship",
    price: 5000,
    rating: 5.0,
    bookings: 42,
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await api.get('/services').catch(() => ({ data: [] }));
        const data = Array.isArray(servicesRes.data) ? servicesRes.data : [];
        const finalServices = data.length > 0 ? data : defaultServices;
        setServices(finalServices);
        setFilteredServices(finalServices);
      } catch {
        setServices(defaultServices);
        setFilteredServices(defaultServices);
      }

      try {
        const profileRes = await api.get('/auth/profile');
        setUser(profileRes.data);
      } catch {
        // Handle gracefully
      }

      setLoading(false);
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

  const handleCreateNavigate = () => {
    navigate('/createcourse');
  };

  const categories = [
    { id: "all", label: "All Services", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "consultation", label: "Consultation", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: "mentorship", label: "Mentorship", icon: <Users className="w-3.5 h-3.5" /> },
    { id: "development", label: "Development", icon: <Code className="w-3.5 h-3.5" /> },
    { id: "design", label: "Design", icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "marketing", label: "Marketing", icon: <Megaphone className="w-3.5 h-3.5" /> },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'development': return <Code className="w-6 h-6 md:w-8 md:h-8" />;
      case 'design': return <Palette className="w-6 h-6 md:w-8 md:h-8" />;
      case 'marketing': return <Megaphone className="w-6 h-6 md:w-8 md:h-8" />;
      case 'consultation': return <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />;
      case 'mentorship': return <Users className="w-6 h-6 md:w-8 md:h-8" />;
      default: return <BookOpen className="w-6 h-6 md:w-8 md:h-8" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.id === category)?.label || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <BookOpen className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Services | DevFolio Marketplace" description="Explore expert services — development, design, consultation, mentorship and more." />
      <Header />
      
      <div className="flex min-h-screen relative pt-20">
        <AppSidebar activePath="/services" />

        {/* Main Content */}
        <main className="flex-1 bg-background relative selection:bg-primary selection:text-primary-foreground">
          {/* Background blur */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-1/2 bg-primary/3 opacity-30 blur-[150px] rounded-full" />

          {/* Mobile Header (Hidden as site header is visible) */}
          {/* <div className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/30">
            ... 
          </div> */}

          <div className="p-4 md:p-8 lg:p-12 xl:p-16">
            <div className="max-w-[1200px] mx-auto space-y-8 md:space-y-12">

              {/* Desktop Header */}
              <header className="flex items-center justify-between animate-slide-up">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="w-5 h-5 text-primary/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Explore Capabilities</span>
                  </div>
                  <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight">
                    Expert <span className="text-primary">Services.</span>
                  </h1>
                </div>
                <Button
                  onClick={handleCreateNavigate}
                  className="h-14 rounded-xl px-8 font-bold bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all gap-3 text-sm hidden md:flex"
                >
                  <Plus className="w-5 h-5 stroke-[3px]" />
                  Create Service
                </Button>
              </header>

              {/* Search & Filters */}
              <div className="space-y-4 md:space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="relative group">
                  <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 md:w-6 md:h-6 group-focus-within:text-primary transition-all" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 md:h-14 pl-12 md:pl-16 rounded-2xl bg-secondary/10 border-border/40 focus:border-primary/50 font-medium text-sm transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      variant="outline"
                      className={`h-10 md:h-12 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold text-xs md:text-sm gap-2 transition-all shrink-0 ${
                        selectedCategory === cat.id 
                          ? "bg-foreground text-background border-foreground shadow-lg scale-[1.02]" 
                          : "bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground border-border/40"
                      }`}
                    >
                      <div className={`${selectedCategory === cat.id ? "text-primary-foreground" : ""}`}>
                        {cat.icon}
                      </div>
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              {filteredServices.length === 0 ? (
                <Card className="p-8 md:p-16 text-center flex flex-col items-center justify-center space-y-6 rounded-3xl border-border/40 animate-fade-in">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-secondary/50 flex items-center justify-center text-primary/30 border border-border/20">
                    <Rocket className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-3 max-w-sm">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">No services found</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {searchTerm
                        ? `No services match "${searchTerm}". Try a different keyword.`
                        : "No services in this category yet. Create one to get started!"}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {searchTerm && (
                      <Button
                        onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                        variant="outline"
                        className="rounded-xl px-6 h-11 font-semibold text-sm"
                      >
                        Clear Filters
                      </Button>
                    )}
                    <Button
                      onClick={handleCreateNavigate}
                      className="rounded-xl px-6 h-11 font-semibold text-sm bg-primary text-primary-foreground gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Service
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                  {filteredServices.map((service: any) => (
                    <Card
                      key={service.id}
                      className="rounded-2xl md:rounded-3xl border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col"
                    >
                      <div className="p-5 md:p-6 lg:p-8 flex-1 space-y-4 md:space-y-5">
                        <div className="flex items-start justify-between">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/15 group-hover:scale-105 transition-transform">
                            {getCategoryIcon(service.category)}
                          </div>
                          <Badge className="rounded-lg px-3 py-1.5 font-semibold text-[10px] md:text-xs tracking-wide uppercase bg-secondary/60 text-foreground/70 border-none">
                            {getCategoryLabel(service.category)}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span className="font-semibold">{service.rating || "5.0"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span className="font-semibold">{service.bookings || 0} booked</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 md:px-6 lg:px-8 py-4 md:py-5 border-t border-border/20 bg-secondary/5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Starting at</p>
                          <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">₹{service.price?.toLocaleString()}</p>
                        </div>
                        <Button
                          size="icon"
                          onClick={handleCreateNavigate}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-md hover:scale-105 active:scale-95"
                        >
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Services;
