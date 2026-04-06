import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/cards/ProjectCard";
import api from "@/services/api";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticProjects = [
    {
      _id: "1",
      title: "E-Commerce Platform",
      description: "Full-featured online store with payment integration",
      category: "E-Commerce",
      icon: "🛍️",
      pricing: "Paid"
    },
    {
      _id: "2",
      title: "Social Media Dashboard",
      description: "Analytics and management for multiple platforms",
      category: "Business Tools",
      icon: "📊",
      pricing: "Freemium"
    },
    {
      _id: "3",
      title: "Learning Management System",
      description: "Complete LMS with courses and assessments",
      category: "Education",
      icon: "📚",
      pricing: "Paid"
    },
    {
      _id: "4",
      title: "Task Management App",
      description: "Collaborative task tracking and team management",
      category: "Productivity",
      icon: "✅",
      pricing: "Free"
    },
    {
      _id: "5",
      title: "Restaurant Booking",
      description: "Table reservation system with real-time availability",
      category: "Hospitality",
      icon: "🍽️",
      pricing: "Paid"
    },
    {
      _id: "6",
      title: "Fitness Tracker",
      description: "Workout logging and progress tracking",
      category: "Health",
      icon: "💪",
      pricing: "Freemium"
    },
    {
      _id: "7",
      title: "Real Estate Portal",
      description: "Property listings with advanced search filters",
      category: "Real Estate",
      icon: "🏠",
      pricing: "Paid"
    },
    {
      _id: "8",
      title: "Job Board Platform",
      description: "Connect employers with job seekers",
      category: "Recruitment",
      icon: "💼",
      pricing: "Freemium"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/all');
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fall back to static projects if API fails
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24 animate-slide-up">
          <div className="space-y-4">
            <h2 className="heading-responsive">
              Featured <span className="text-primary NOT-italic">Projects.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-2xl opacity-70">
              Explore our collection of professionally designed templates and digital solutions.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="h-14 md:h-16 rounded-2xl md:rounded-[22px] px-8 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-black transition-all shadow-xl shadow-primary/5 uppercase tracking-widest text-[10px] italic border-none"
            onClick={() => navigate("/search")}
          >
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {loading ? (
            <div className="col-span-full flex flex-col justify-center items-center py-20 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-spin text-primary">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">Syncing Prototypes...</p>
            </div>
          ) : (projects.length > 0 ? projects : staticProjects).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
