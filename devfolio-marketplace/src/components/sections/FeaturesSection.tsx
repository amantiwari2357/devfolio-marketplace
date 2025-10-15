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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="font-bold text-fuchsia-600">Why Choose</span> My Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
