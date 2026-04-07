import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
  return (
    <Card className="bg-card border border-border/50 p-6 md:p-8 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300 rounded-3xl h-full flex flex-col">
      <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/20 mb-6" />
      
      <p className="text-sm md:text-base text-foreground/80 mb-8 leading-relaxed italic mt-auto">
        "{quote}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/40">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm md:text-base shrink-0 shadow-sm">
          {author ? author[0].toUpperCase() : "A"}
        </div>
        <div>
          <p className="font-bold text-sm md:text-base text-foreground leading-tight truncate">{author}</p>
          <p className="text-xs md:text-sm font-semibold text-primary truncate">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
