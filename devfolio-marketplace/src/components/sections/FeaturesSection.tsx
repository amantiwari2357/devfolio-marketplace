import FeatureCard from "@/components/cards/FeatureCard";
import { Zap, MessageSquare, TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Modern Tech Stack",
    subtitle: "Build fast, reliable, and scalable apps using",
    highlight: "React, Node.js & MongoDB",
    color: "bg-card-pink",
  },
  {
    icon: MessageSquare,
    title: "Seamless Communication",
    subtitle: "Stay connected through transparent project updates and",
    highlight: "real-time collaboration",
    color: "bg-card-purple",
  },
  {
    icon: TrendingUp,
    title: "Performance Driven",
    subtitle: "Delivering websites that are optimized for",
    highlight: "speed, SEO & conversion",
    color: "bg-card-green",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    subtitle: "High-quality websites and apps built with",
    highlight: "budget-friendly packages",
    color: "bg-card-blue",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Ready",
    subtitle: "Launch your online store with payment integration and",
    highlight: "secure checkout system",
    color: "bg-card-beige",
  },
  {
    icon: Users,
    title: "Client Satisfaction",
    subtitle: "Every project is tailored to deliver results and build",
    highlight: "long-term partnerships",
    color: "bg-card-cyan",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Structural Mesh */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 animate-slide-up">
          <h2 className="heading-responsive">
            Why Choose <span className="text-primary">My Services.</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed mt-6">
            Experience the advantage of a tailored digital strategy and cutting-edge technical execution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
