import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon, Filter, Rocket, Sparkles, Activity, Layers, Command, ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/layout/SEO";

const Search = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/projects/all');
      const data = await response.json();
      
      const transformedProjects = (data.projects || []).map((project: any) => ({
        id: project._id,
        _id: project._id,
        name: project.title,
        title: project.title,
        description: project.description,
        category: project.category,
        icon: project.icon,
        pricing: project.pricing,
        features: project.features || [],
        technologies: project.technologies || [],
        timeline: project.timeline,
        priceRange: project.priceRange,
        liveUrl: project.liveUrl,
        price: project.price
      }));
      
      setProjects(transformedProjects);
      setFilteredProjects(transformedProjects);
      
      const uniqueCategories = ["All", ...new Set(transformedProjects.map((p: any) => p.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProjects(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProjects(searchQuery, category);
  };

  const filterProjects = (query: string, category: string) => {
    let filtered = projects;

    if (query) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.technologies?.some((tech: string) =>
            tech.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((project) => project.category === category);
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Search Network | Directory" description="Explore the decentralized ecosystem of high-fidelity projects and services." />
      <Header />
      
      <main className="pt-32 pb-32 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/2 opacity-20 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 max-w-[1400px]">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
          >
            <span className="w-10 h-10 rounded-xl bg-secondary/10 border border-border/40 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Back</span>
          </button>

          <div className="max-w-4xl mx-auto mb-20 text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
               <span className="px-4 py-2 rounded-full bg-secondary/10 border border-border/40 text-xs font-semibold text-muted-foreground flex items-center gap-2 shadow-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  Project Directory
               </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight animate-slide-up">
               Search <span className="text-primary">Directory.</span>
            </h1>
            <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in">
               Discover projects, services, and expert portfolios across the network.
            </p>

            <div className="relative mt-12 group max-w-3xl mx-auto animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-[36px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative flex gap-4 p-2 rounded-[32px] bg-secondary/10 border border-border/50 backdrop-blur-2xl shadow-2xl">
                <div className="relative flex-1 group/input">
                  <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary drop-shadow-sm transition-transform group-hover/input:scale-110" />
                  <Input
                    placeholder="Search by module, logic, or architect..."
                    className="pl-16 h-16 rounded-2xl bg-background border-none focus:ring-0 shadow-inner text-sm font-bold placeholder:font-medium placeholder:italic text-foreground"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-20 pointer-events-none group-focus-within:opacity-0 transition-opacity">
                     <Command className="w-3.5 h-3.5" />
                     <span className="text-[10px] font-black uppercase">K</span>
                  </div>
                </div>
                <Button size="lg" className="rounded-2xl h-16 px-10 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    category === selectedCategory 
                    ? "bg-foreground text-background shadow-md scale-105 border-none" 
                    : "bg-secondary/10 text-muted-foreground border border-border/40 hover:bg-secondary/20 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[400px] rounded-[32px] bg-secondary/5 border border-border/20 animate-pulse flex items-center justify-center">
                   <Layers className="w-12 h-12 text-muted-foreground/10" />
                </div>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className="animate-fade-in"
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center space-y-6">
                <div className="w-24 h-24 rounded-[40px] bg-secondary/10 flex items-center justify-center text-muted-foreground/30 mx-auto transform rotate-12">
                   <Rocket className="w-12 h-12" />
                </div>
                <div>
                   <h3 className="text-2xl font-black tracking-tight text-foreground/40 italic">Null Address.</h3>
                   <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-40 mt-2">Try adjusting your search criteria</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;