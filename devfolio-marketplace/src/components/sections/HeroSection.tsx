import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import ProfileCards from "@/components/cards/ProfileCards";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your All-in-One
              <br />
              Creator <span className="text-primary">Storefront</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
            Helping individuals and brands build modern, responsive websites and powerful digital solutions — all tailored to their business goals.            </p>
            
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 group"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">100k+ reviews</span>
              </div>
              <p className="text-sm text-muted-foreground">1mn+ professionals</p>
            </div>
          </div>
          
          <ProfileCards />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
