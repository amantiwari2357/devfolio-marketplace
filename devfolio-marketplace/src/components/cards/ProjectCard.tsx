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

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden rounded-[32px] border-border/40 bg-secondary/10 backdrop-blur-xl transition-all duration-500 cursor-pointer hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 active:scale-[0.98]",
        className
      )}
      onClick={handleClick}
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary backdrop-blur-md border border-primary/20 shadow-inner">
            <ArrowRight className="w-5 h-5" />
         </div>
      </div>

      <CardHeader className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner">
            <span role="img" aria-label="Icon" className="drop-shadow-sm select-none">
               {project.icon || "🚀"}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <CardTitle className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-tight">
            {project.title || project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs font-medium text-muted-foreground italic leading-relaxed">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8 pt-0">
        <div className="flex items-center justify-between pt-6 border-t border-border/10">
          <div className="flex items-center gap-2">
             <div className="px-4 py-1.5 rounded-xl bg-background border border-border/20 text-[10px] font-black uppercase tracking-widest shadow-inner">
               {project.category}
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
             <span className="text-xs font-black uppercase tracking-widest text-foreground/80 italic">
               {project.price === 0 ? 'Free' : project.price ? `$${project.price}` : (project.pricing || "Authorized")}
             </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
