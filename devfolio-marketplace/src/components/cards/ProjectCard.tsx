import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    _id?: string;
    id?: number;
    title?: string;
    name?: string;
    description: string;
    category: string;
    icon?: string;
    pricing?: string;
    price?: number;
  };
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project._id || project.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const projectTitle = project.title || project.name || "Project";

  return (
    <Card 
      role="button"
      tabIndex={0}
      aria-label={`View details for ${projectTitle}`}
      className={cn(
        "group relative overflow-hidden rounded-[32px] bg-card border-border/60 shadow-md hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute top-0 right-0 p-4 md:p-6 opacity-0 md:group-hover:opacity-100 transition-all transform translate-x-4 md:group-hover:translate-x-0">
         <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary backdrop-blur-md border border-primary/20 shadow-sm">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
         </div>
      </div>

      <CardHeader className="p-6 md:p-8 space-y-4 md:space-y-5">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
            <span role="img" aria-label="Icon" className="drop-shadow-md select-none">
               {project.icon || "🚀"}
            </span>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <CardTitle className="text-sm md:text-base font-black tracking-tight text-foreground transition-colors group-hover:text-primary leading-tight">
            {project.title || project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs font-bold text-muted-foreground leading-relaxed">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-border/10">
          <div className="flex items-center gap-2 max-w-[60%]">
             <div className="px-3 py-1.5 rounded-lg bg-secondary/50 text-foreground text-xs font-semibold truncate">
               {project.category}
             </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
             <Zap className="w-3.5 h-3.5 text-primary" />
             <span className="text-xs font-bold text-primary">
               {project.price === 0 ? 'Free' : project.price ? `$${project.price}` : (project.pricing || "Authorized")}
             </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
