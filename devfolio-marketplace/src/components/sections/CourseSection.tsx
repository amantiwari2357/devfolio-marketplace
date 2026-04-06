import { ArrowRight, Code, Palette, TrendingUp, Cog } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourseSection = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Build scalable, high-performance applications tailored to your business needs"
    },
    {
      icon: Palette,
      title: "UI/UX & Branding Design",
      description: "Create stunning visual identities that captivate and convert your audience"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Drive traffic, boost rankings, and grow your online presence exponentially"
    },
    {
      icon: Cog,
      title: "Enterprise Solutions",
      description: "Admin panels, CRM systems, and automation tools for seamless operations"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-secondary/30 to-background overflow-hidden relative">
      {/* Structural Mesh */}
      <div className="absolute top-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 animate-slide-up">
             <h2 className="heading-responsive">
              Transform Your <span className="text-primary NOT-italic">Vision</span> Into Reality.
            </h2>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed opacity-70 mt-8">
              We deliver cutting-edge software solutions and digital strategy that drive real business growth.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 md:gap-16 items-start mb-20 md:mb-32 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {/* Left Card - Services Overview */}
            <div className="lg:col-span-1">
              <Card className="neural-card p-10 md:p-12 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                  <ArrowRight className="w-48 h-48 text-primary" />
                </div>
                
                <h3 className="text-3xl font-black tracking-tighter text-foreground mb-6 italic uppercase leading-none">
                  Our Digital <span className="text-primary NOT-italic">DNA.</span>
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed font-bold italic tracking-tight opacity-70">
                  We specialize in building modern, scalable digital experiences that drive measurable results.
                </p>
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 mb-10">
                   <p className="text-primary font-black text-sm uppercase tracking-widest italic leading-relaxed">
                    From concept to deployment, we handle it all.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full h-16 rounded-[22px] font-black bg-foreground text-background shadow-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest italic border-none group"
                    onClick={() => window.location.href = "/services"}
                  >
                    Explore Services
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform stroke-[3px]" size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-16 rounded-[22px] font-black text-xs uppercase tracking-widest italic bg-secondary/30 border-border/40 hover:bg-secondary/50 transition-all"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Get in Touch
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Cards - Services Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={index}
                    className="neural-card p-8 md:p-10 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                      <Icon className="w-32 h-32 text-primary" />
                    </div>
                    <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all italic">
                      <Icon size={28} className="stroke-[2.5px]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors tracking-tighter uppercase italic leading-none">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground text-sm font-bold italic leading-relaxed tracking-tight opacity-70">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Key Stats/Features */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Card className="neural-card p-10 md:p-16 relative overflow-hidden group shadow-2xl border-none bg-foreground text-background">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-30" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic">50+</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Projects Delivered</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic">100%</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Client Success</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic">8+</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Years Tenure</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic">24/7</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Global Relay</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;