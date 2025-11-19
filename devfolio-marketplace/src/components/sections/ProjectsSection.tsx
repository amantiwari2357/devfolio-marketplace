import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        const response = await fetch('http://localhost:5000/api/projects/all');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        }
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
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-bold mb-4 text-6xl text-pretty text-fuchsia-950">Our Projects</h2>
            <p className="text-lg text-muted-foreground">
              Explore our collection of professionally designed templates
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/search")}
          >
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
