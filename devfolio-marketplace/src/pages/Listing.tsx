import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Listing = () => {
  const benefits = [
    "Get discovered by thousands of potential clients",
    "Showcase your expertise and services",
    "Manage bookings with integrated calendar",
    "Accept payments seamlessly",
    "Build your personal brand",
    "Analytics and insights dashboard"
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Set up your devfolio-marketplace page with your expertise, services, and availability in minutes."
    },
    {
      number: "02",
      title: "Set Your Services",
      description: "Define your offerings - from 1:1 sessions to courses. You control the pricing."
    },
    {
      number: "03",
      title: "Go Live",
      description: "Share your devfolio-marketplace link and start accepting bookings. It's that simple!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              List Your Services on devfolio-marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of experts who are building their online presence and earning from their expertise
            </p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              Get Listed Today
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Why List on devfolio-marketplace?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Perfect for:</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Career Coaches & Mentors
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Consultants & Advisors
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Content Creators
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Industry Experts
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Course Instructors
                </li>
              </ul>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Get Started in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="p-8 bg-card border-border text-center">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-dark-section text-dark-foreground rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create your devfolio-marketplace page today and start monetizing your expertise
            </p>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
              Create Your Page
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Listing;
