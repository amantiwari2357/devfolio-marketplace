import { Card } from "@/components/ui/card";

interface ExpertCardProps {
  name: string;
  role: string;
  image: string | null;
}

const ExpertCard = ({ name, role }: ExpertCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group">
      <div className="aspect-square bg-gradient-to-br from-card-purple to-card-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Card>
  );
};

export default ExpertCard;
