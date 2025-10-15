import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Video, BookOpen, MessageSquare, Calendar, DollarSign } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "1:1 Mentoring Sessions",
      description: "Connect with mentees through personalized one-on-one video calls. Set your availability and let devfolio-marketplace handle the scheduling.",
      benefits: ["Flexible scheduling", "Automated reminders", "Integrated payments"]
    },
    {
      icon: <Video className="w-12 h-12 text-primary" />,
      title: "Webinars & Workshops",
      description: "Host engaging group sessions and workshops. Scale your knowledge sharing while maintaining quality interactions.",
      benefits: ["Group sessions", "Q&A management", "Recording options"]
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Digital Courses",
      description: "Create and sell comprehensive online courses. Deliver structured learning experiences with video content and resources.",
      benefits: ["Course builder", "Progress tracking", "Zero commission"]
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-primary" />,
      title: "Priority DM",
      description: "Offer exclusive access through priority direct messaging. Provide personalized advice and support to your community.",
      benefits: ["Direct communication", "Scheduled responses", "Premium pricing"]
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary" />,
      title: "Consultation Services",
      description: "Provide professional consulting services with integrated booking and payment systems. Perfect for coaches and advisors.",
      benefits: ["Calendar sync", "Auto invoicing", "Client management"]
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Digital Products",
      description: "Sell ebooks, templates, guides and other digital products. Deliver instant access upon purchase.",
      benefits: ["Instant delivery", "Secure payments", "Download tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Monetize Your Expertise
            </h1>
            <p className="text-xl text-muted-foreground">
              From 1:1 mentoring to digital courses, devfolio-marketplace provides all the tools you need to turn your knowledge into income.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
                <div className="mb-6">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already monetizing their expertise with devfolio-marketplace
            </p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              Start Your Page
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
