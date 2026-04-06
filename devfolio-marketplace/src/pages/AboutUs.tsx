import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Target, Heart, Zap, Award, Globe, Rocket } from "lucide-react";
import SEO from "@/components/layout/SEO";

const AboutUs = () => {
  const values = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Creator First",
      description: "We put creators at the center of everything we do. Your success is our core mission."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Simplicity",
      description: "Complex features made intuitive. Powerful tools without the steep learning curve."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Community",
      description: "Built with continuous feedback from thousands of experts across the globe."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the next generation of creator technology."
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Our Story & Mission" 
        description="Learn about Devfolio Marketplace's journey to empower creators and experts through technology and community." 
      />
      <Header />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Hero Section */}
        <div className="container mx-auto px-4 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />
          
          <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Award className="w-4 h-4" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-foreground leading-[1.1]">
              Empowering experts to <span className="text-primary italic">shape the future.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              We're building the infrastructure for the next generation of knowledge sharing and professional services.
            </p>
          </div>

          {/* Story Card */}
          <div className="max-w-5xl mx-auto mb-32">
            <Card className="p-8 md:p-16 rounded-[40px] bg-secondary/30 border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Rocket className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-12 space-y-8">
                  <h2 className="text-4xl font-black tracking-tight text-foreground">
                    Our <span className="text-primary">Story.</span>
                  </h2>
                  <div className="space-y-6 text-lg font-medium text-muted-foreground/90 leading-relaxed">
                    <p>
                      Devfolio was founded with a single, radical idea: that <span className="text-foreground font-bold">expertise should be accessible.</span> We recognized a gap between global experts and the communities that need their guidance.
                    </p>
                    <p>
                      What began as a passion project for a few developers has transformed into a robust ecosystem. Today, we empower creators to productize their knowledge, manage their time efficiently, and build sustainable careers.
                    </p>
                    <p>
                      We don't just provide tools; we provide the foundation for digital entrepreneurship.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Button className="rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20">
                      Join the movement
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="mb-32">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Core Philosophy</h2>
              <h3 className="text-4xl font-black tracking-tight">Values that <span className="text-primary">drive us.</span></h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-8 rounded-3xl bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5">
                  <div className="mb-8 p-4 rounded-2xl bg-secondary/50 text-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all inline-block">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-black mb-4 tracking-tight">{value.title}</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="max-w-5xl mx-auto mb-32">
            <Card className="p-12 md:p-20 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-16">
                <div className="text-center">
                  <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Real World Impact</h2>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight">Numbers that <span className="text-primary">matter.</span></h3>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="space-y-2 text-center group">
                    <p className="text-6xl font-black tracking-tighter text-primary group-hover:scale-110 transition-transform">10K+</p>
                    <p className="text-background/60 font-black uppercase tracking-widest text-[10px]">Active Creators</p>
                    <div className="w-12 h-1 bg-primary/30 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-2 text-center group">
                    <p className="text-6xl font-black tracking-tighter text-primary group-hover:scale-110 transition-transform">500K+</p>
                    <p className="text-background/60 font-black uppercase tracking-widest text-[10px]">Session Hours</p>
                    <div className="w-12 h-1 bg-primary/30 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-2 text-center group">
                    <p className="text-6xl font-black tracking-tighter text-primary group-hover:scale-110 transition-transform">150+</p>
                    <p className="text-background/60 font-black uppercase tracking-widest text-[10px]">Nations Reached</p>
                    <div className="w-12 h-1 bg-primary/30 mx-auto rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-[40px] p-12 md:p-24 text-center overflow-hidden border border-border/50 bg-secondary/30">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-center">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Globe className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Become part of the <span className="text-primary italic font-serif">global elite.</span></h2>
              <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto px-4 leading-relaxed">
                Join a community of forward-thinking experts building their legacy on our infrastructure.
              </p>
              <div className="pt-8">
                <Button size="lg" className="rounded-xl px-12 py-8 font-black text-lg bg-primary text-primary-foreground hover:scale-105 transition-all shadow-2xl shadow-primary/30">
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
