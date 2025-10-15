import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";

const ProjectsSection = () => {
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
      description: "Workout logging and progress tracking",
      category: "Health",
      icon: "💪",
      pricing: "Freemium"
    },
    {
      id: 7,
      name: "Real Estate Portal",
      description: "Property listings with advanced search filters",
      category: "Real Estate",
      icon: "🏠",
      pricing: "Paid"
    },
    {
      id: 8,
      name: "Job Board Platform",
      description: "Connect employers with job seekers",
      category: "Recruitment",
      icon: "💼",
      pricing: "Freemium"
    }
  ];

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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
