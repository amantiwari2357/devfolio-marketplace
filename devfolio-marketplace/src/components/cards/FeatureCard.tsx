import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, subtitle, highlight, color }: FeatureCardProps) => {
  return (
    <Card className={`${color} border border-border/10 p-6 md:p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-sm rounded-3xl h-full flex flex-col`}>
      <div className="mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-background/50 flex items-center justify-center shadow-sm">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-foreground/80" />
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3 tracking-tight">{title}</h3>
      
      <p className="text-sm md:text-base text-foreground/80 leading-relaxed mt-auto">
        {subtitle}{' '}
        {highlight && <span className="font-bold text-foreground">{highlight}</span>}
      </p>
    </Card>
  );
};

export default FeatureCard;
