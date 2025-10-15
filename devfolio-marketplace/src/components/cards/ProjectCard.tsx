import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
    pricing: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Check if user is logged in (you can replace this with actual auth check)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn) {
      navigate(`/project/${project.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50"
      onClick={handleClick}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {project.icon}
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {project.pricing}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
