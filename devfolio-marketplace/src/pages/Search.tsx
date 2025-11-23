import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon, Filter } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
      
      // Transform backend data to match ProjectCard props
      const transformedProjects = (data.projects || []).map((project: any) => ({
        id: project._id,
        name: project.title,
        description: project.description,
        category: project.category,
        icon: project.icon,
        pricing: project.pricing,
        features: project.features || [],
        technologies: project.technologies || [],
        timeline: project.timeline,
        priceRange: project.priceRange,
        liveUrl: project.liveUrl
      }));
      
      setProjects(transformedProjects);
      setFilteredProjects(transformedProjects);
      
      // Extract unique categories
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

    // Filter by search query
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

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((project) => project.category === category);
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl font-bold mb-6 text-center text-foreground">
              Browse Projects
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-8">
              Discover amazing projects across various categories
            </p>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, expertise, or skill..."
                  className="pl-12 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button size="lg" variant="outline" className="gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No projects found matching your criteria</p>
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