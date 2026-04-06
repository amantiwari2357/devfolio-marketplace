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
          <div className="text-center max-w-5xl mx-auto mb-32 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">
              <Award className="w-4 h-4 animate-pulse" />
              Establishment Protocol
            </div>
            <h1 className="heading-responsive">
              Empowering experts to <span className="text-primary NOT-italic">shape the future.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70">
              We're building the infrastructure for the next generation of knowledge sharing and professional services.
            </p>
          </div>

          {/* Story Protocol Card */}
          <div className="max-w-6xl mx-auto mb-20 md:mb-40 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Card className="neural-card p-8 md:p-24 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-16 opacity-0 group-hover:opacity-5 transition-all duration-1000 translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0">
                <Rocket className="w-96 h-96 text-primary" />
              </div>
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-4 text-primary">
                   <div className="w-12 h-1 bg-primary rounded-full" />
                   <h2 className="text-sm font-black uppercase tracking-[0.4em] italic">Genesis Protocol</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <h3 className="text-xl md:text-3xl font-black tracking-tighter text-foreground leading-none italic uppercase">
                      Our <span className="text-primary NOT-italic">Story.</span>
                    </h3>
                    <div className="space-y-8 text-lg font-bold text-muted-foreground/80 leading-relaxed italic tracking-tight">
                      <p>
                        Devfolio was founded with a single, radical idea: that <span className="text-foreground font-black NOT-italic">expertise should be accessible.</span> We recognized a gap between global experts and the communities that need their guidance.
                      </p>
                      <p>
                        What began as a passion project for a few developers has transformed into a robust ecosystem. Today, we empower creators to productize their knowledge, manage their time efficiently, and build sustainable careers.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-8 lg:pt-16">
                    <p className="text-lg font-bold text-muted-foreground/80 leading-relaxed italic tracking-tight">
                      We don't just provide tools; we provide the foundation for digital entrepreneurship. Our protocol ensures that every interaction is seamless, every session is impactful, and every creator has the room to scale.
                    </p>
                    <div className="pt-8">
                      <Button className="h-16 rounded-[22px] px-12 font-black bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 gap-4 uppercase tracking-[0.2em] border-none italic">
                        Initialize Connection
                        <ArrowRight className="w-5 h-5 stroke-[4px]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Philosophy Grid Protocol */}
          <div className="mb-40 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Fingerprint className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Core Philosophy</span>
                </div>
                 <h3 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase leading-none">
                  Values that <span className="text-primary NOT-italic">drive us.</span>
                </h3>
              </div>
              <p className="text-sm font-bold text-muted-foreground/50 italic uppercase tracking-[0.2em] max-w-xs">Distilled principles forming the DEVFOLIO alignment.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, index) => (
                <Card key={index} className="neural-card p-8 md:p-10 flex flex-col justify-between h-auto min-h-[300px]">
                  <div className="mb-6 p-5 rounded-[20px] bg-secondary/50 text-foreground group-hover:text-primary group-hover:bg-primary/20 transition-all inline-block shadow-inner w-fit group-hover:rotate-6">
                    {value.icon}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-foreground leading-none">{value.title}</h4>
                    <p className="text-sm font-bold text-muted-foreground/70 leading-relaxed italic opacity-80">{value.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Global Impact Protocol */}
          <div className="max-w-6xl mx-auto mb-40 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Card className="p-16 md:p-32 rounded-[64px] bg-foreground text-background border-none relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <Globe className="w-[400px] h-[400px] text-primary" />
              </div>
              
              <div className="relative z-10 space-y-24">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-3 text-primary animate-pulse">
                    <Activity className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Universal Telemetry Flux</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-[0.85]">
                     Numbers that <span className="text-primary NOT-italic">matter.</span>
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-20">
                  <div className="space-y-4 text-center group/stat">
                    <div className="relative inline-block">
                       <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                       <p className="text-5xl md:text-6xl font-black tracking-tighter text-primary relative z-10 italic">10K+</p>
                    </div>
                    <p className="text-background/40 font-black uppercase tracking-[0.4em] text-[10px] italic">Verified Creators</p>
                    <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full group-hover/stat:w-24 transition-all" />
                  </div>
                  <div className="space-y-4 text-center group/stat">
                    <div className="relative inline-block">
                       <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                       <p className="text-5xl md:text-6xl font-black tracking-tighter text-primary relative z-10 italic">500K+</p>
                    </div>
                    <p className="text-background/40 font-black uppercase tracking-[0.4em] text-[10px] italic">Active Sessions</p>
                    <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full group-hover/stat:w-24 transition-all" />
                  </div>
                  <div className="space-y-4 text-center group/stat">
                    <div className="relative inline-block">
                       <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                       <p className="text-5xl md:text-6xl font-black tracking-tighter text-primary relative z-10 italic">150+</p>
                    </div>
                    <p className="text-background/40 font-black uppercase tracking-[0.4em] text-[10px] italic">Nations Reached</p>
                    <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full group-hover/stat:w-24 transition-all" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Join Protocol Section */}
          <div className="relative rounded-[56px] p-16 md:p-32 text-center overflow-hidden border border-border/40 bg-secondary/10 backdrop-blur-3xl animate-slide-up shadow-2xl scroll-mt-32">
            {/* Background neural flux */}
            <div className="absolute inset-0 bg-grid-white/[0.02] opacity-20 -z-10" />
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-[28px] bg-primary/10 text-primary flex items-center justify-center shadow-inner animate-bounce">
                  <Globe className="w-10 h-10" />
                </div>
              </div>
              <h2 className="text-2xl md:text-6xl font-black tracking-tighter italic uppercase leading-[0.85]">
                Become part of the <span className="text-primary italic">global elite.</span>
              </h2>
              <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight max-w-2xl mx-auto leading-relaxed opacity-70">
                Join a community of forward-thinking experts building their legacy on our digital infrastructure.
              </p>
              <div className="pt-10">
                <Button size="lg" className="h-20 rounded-[28px] px-16 font-black text-xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_-15px_rgba(var(--primary-rgb),.4)] uppercase tracking-[0.2em] border-none italic">
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
