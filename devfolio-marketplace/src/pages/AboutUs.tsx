import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Target, Heart, Zap } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Creator First",
      description: "We put creators at the center of everything we do. Your success is our success."
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Simple & Powerful",
      description: "Complex features made simple. All the tools you need without the complexity."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Community Driven",
      description: "Built with feedback from thousands of creators across the globe."
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the latest in creator technology."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              About devfolio-marketplace
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering creators to monetize their expertise and build meaningful connections with their audience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  devfolio-marketplace was founded with a simple mission: to democratize access to expertise and enable knowledge sharing at scale. We believe that everyone has valuable knowledge to share, and that knowledge should be accessible to those who seek it.
                </p>
                <p>
                  What started as a simple booking platform has evolved into a comprehensive creator economy platform. Today, thousands of creators across the globe use devfolio-marketplace to share their knowledge, build their brand, and generate income.
                </p>
                <p>
                  We're proud to be a part of the creator economy revolution, helping experts from all walks of life turn their passion into a sustainable business.
                </p>
              </div>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 bg-card border-border text-center">
                  <div className="mb-6 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-12 bg-card border-border">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">10K+</p>
                  <p className="text-muted-foreground">Active Creators</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">500K+</p>
                  <p className="text-muted-foreground">Sessions Booked</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">150+</p>
                  <p className="text-muted-foreground">Countries</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-dark-section text-dark-foreground rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of a global community of creators who are building their future
            </p>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
              Get Started Today
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
