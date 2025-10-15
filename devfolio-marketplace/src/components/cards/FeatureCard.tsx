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
    <Card className={`${color} border-none p-8 hover:scale-105 transition-transform duration-300 shadow-sm`}>
      <div className="mb-6">
        <Icon className="w-10 h-10 text-foreground/70" />
      </div>
      
      <h3 className="text-3xl font-bold text-foreground mb-3">{title}</h3>
      
      <p className="text-foreground/80">
        {subtitle}{' '}
        {highlight && <span className="font-semibold">{highlight}</span>}
      </p>
    </Card>
  );
};

export default FeatureCard;
