import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon, Filter } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-featured online store with payment integration",
      category: "E-Commerce",
      icon: "🛍️",
      pricing: "Paid"
    },
    {
      id: 2,
      name: "Social Media Dashboard",
      description: "Analytics and management for multiple platforms",
      category: "Business Tools",
      icon: "📊",
      pricing: "Freemium"
    },
    {
      id: 3,
      name: "Learning Management System",
      description: "Complete LMS with courses and assessments",
      category: "Education",
      icon: "📚",
      pricing: "Paid"
    },
    {
      id: 4,
      name: "Task Management App",
      description: "Collaborative task tracking and team management",
      category: "Productivity",
      icon: "✅",
      pricing: "Free"
    },
    {
      id: 5,
      name: "Restaurant Booking",
      description: "Table reservation system with real-time availability",
      category: "Hospitality",
      icon: "🍽️",
      pricing: "Paid"
    },
    {
      id: 6,
      name: "Fitness Tracker",
      description: "Comprehensive health and activity monitoring",
      category: "Health & Fitness",
      icon: "💪",
      pricing: "Freemium"
    }
  ];

  const categories = ["All", "E-Commerce", "Business Tools", "Education", "Productivity", "Health & Fitness"];

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
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;