import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, Target, Heart, Zap, Award, Globe, Rocket, 
  ShieldCheck, Fingerprint, Layers, Cpu, Sparkles,
  ArrowRight, Activity, MessageSquare
} from "lucide-react";
import SEO from "@/components/layout/SEO";

const AboutUs = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Creator First",
      description: "We put creators at the center of everything we do. Your success is our core mission."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Simplicity",
      description: "Complex features made intuitive. Powerful tools without the steep learning curve."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community",
      description: "Built with continuous feedback from thousands of experts across the globe."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the next generation of creator technology."
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Our Mission | DEVFOLIO Protocol" 
        description="Learn about Devfolio Marketplace's journey to empower creators and experts through technology and community." 
      />
      <Header />
      
      <main className="section-spacing overflow-hidden selection:bg-primary selection:text-primary-foreground relative pt-32 md:pt-40">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 relative">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-4 md:space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary shadow-sm">
              <Award className="w-4 h-4" />
              Award-Winning Platform
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Empowering experts to <span className="text-primary">shape the future.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              We're building the infrastructure for the next generation of knowledge sharing and professional services.
            </p>
          </div>

          {/* Story Protocol Card */}
          <div className="max-w-5xl mx-auto mb-16 md:mb-24 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Card className="p-8 md:p-12 relative overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-[32px] md:rounded-[40px] bg-card border-border/60">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
                <Rocket className="w-32 h-32 md:w-64 md:h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-3 text-primary">
                   <div className="w-8 h-1 bg-primary rounded-full shadow-sm" />
                   <h2 className="text-xs font-bold uppercase tracking-widest text-primary/80">Our Vision</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                      Our <span className="text-primary">Story.</span>
                    </h3>
                    <div className="space-y-4 text-sm md:text-base font-medium text-muted-foreground leading-relaxed">
                      <p>
                        Devfolio was founded with a single, radical idea: that <span className="text-foreground font-bold">expertise should be accessible.</span> We recognized a gap between global experts and the communities that need their guidance.
                      </p>
                      <p>
                        What began as a passion project for a few developers has transformed into a robust ecosystem. Today, we empower creators to productize their knowledge, manage their time efficiently, and build sustainable careers.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6 lg:pt-14">
                    <p className="text-base font-medium text-muted-foreground leading-relaxed">
                      We don't just provide tools; we provide the foundation for digital entrepreneurship. Our protocol ensures that every interaction is seamless, every session is impactful, and every creator has the room to scale.
                    </p>
                    <div className="pt-4">
                      <Button className="h-12 rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md gap-2">
                        Initialize Connection
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Philosophy Grid Protocol */}
          <div className="mb-24 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Fingerprint className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Core Philosophy</span>
                </div>
                 <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Values that <span className="text-primary">drive us.</span>
                </h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground max-w-xs leading-relaxed">Distilled principles forming the Devfolio alignment.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="neural-card p-6 md:p-8 flex flex-col justify-between h-auto">
                  <div className="mb-6 p-4 rounded-xl bg-secondary/50 text-foreground group-hover:text-primary group-hover:bg-primary/20 transition-all inline-block shadow-sm w-fit group-hover:rotate-6">
                    {value.icon}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-foreground leading-none">{value.title}</h4>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Global Impact Protocol */}
          <div className="max-w-5xl mx-auto mb-16 md:mb-24 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Card className="p-8 md:p-16 rounded-[32px] md:rounded-[40px] bg-foreground text-background border-none relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <Globe className="w-48 h-48 md:w-64 md:h-64 text-primary" />
              </div>
              
              <div className="relative z-10 space-y-12 md:space-y-16">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                    <Activity className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest">Global Reach</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                     Numbers that <span className="text-primary">matter.</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12">
                  <div className="space-y-2 md:space-y-3 text-center group/stat">
                    <p className="text-4xl md:text-5xl font-bold text-primary">10K+</p>
                    <p className="text-background/80 font-medium text-sm">Verified Creators</p>
                    <div className="w-12 h-1.5 bg-primary/20 mx-auto rounded-full group-hover/stat:w-20 group-hover/stat:bg-primary/50 transition-all duration-300" />
                  </div>
                  <div className="space-y-2 md:space-y-3 text-center group/stat">
                    <p className="text-4xl md:text-5xl font-bold text-primary">500K+</p>
                    <p className="text-background/80 font-medium text-sm">Active Sessions</p>
                    <div className="w-12 h-1.5 bg-primary/20 mx-auto rounded-full group-hover/stat:w-20 group-hover/stat:bg-primary/50 transition-all duration-300" />
                  </div>
                  <div className="space-y-2 md:space-y-3 text-center group/stat">
                    <p className="text-4xl md:text-5xl font-bold text-primary">150+</p>
                    <p className="text-background/80 font-medium text-sm">Nations Reached</p>
                    <div className="w-12 h-1.5 bg-primary/20 mx-auto rounded-full group-hover/stat:w-20 group-hover/stat:bg-primary/50 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Join Protocol Section */}
          <div className="relative rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center overflow-hidden border border-border/60 bg-secondary/10 backdrop-blur-xl animate-slide-up shadow-lg scroll-mt-32">
            {/* Background neural flux */}
            <div className="absolute inset-0 bg-grid-white/[0.02] opacity-30 -z-10" />
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-primary/5 blur-[80px] rounded-full point-events-none" />
            
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 relative z-10">
              <div className="flex justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Become part of the <span className="text-primary">global elite.</span>
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                Join a community of forward-thinking experts building their legacy on our digital infrastructure.
              </p>
              <div className="pt-4 md:pt-6">
                <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 rounded-xl px-8 md:px-10 font-bold text-sm md:text-base bg-primary text-primary-foreground hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md">
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
