import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
  return (
    <Card className="bg-card border-border p-6 hover:shadow-xl transition-all duration-300">
      <Quote className="w-8 h-8 text-muted-foreground/30 mb-4" />
      
      <p className="text-foreground mb-6 leading-relaxed">
        {quote}
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-card-purple to-card-blue" />
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
