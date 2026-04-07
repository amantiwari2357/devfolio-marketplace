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
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 animate-slide-up">
             <h2 className="heading-responsive">
              Transform Your <span className="text-primary">Vision</span> Into Reality.
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed mt-6">
              We deliver cutting-edge software solutions and digital strategy that drive real business growth.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start mb-16 md:mb-24 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {/* Left Card - Services Overview */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-border/60 p-6 md:p-10 relative overflow-hidden group shadow-md rounded-[32px] h-full flex flex-col">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                  <ArrowRight className="w-40 h-40 text-primary" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                  Our Digital <span className="text-primary">DNA.</span>
                </h3>
                <p className="text-sm md:text-base font-medium text-muted-foreground mb-6 leading-relaxed">
                  We specialize in building modern, scalable digital experiences that drive measurable results.
                </p>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8 shadow-sm">
                   <p className="text-primary font-semibold text-xs md:text-sm leading-relaxed">
                    From concept to deployment, we handle it all.
                  </p>
                </div>
                
                <div className="space-y-3 mt-auto">
                  <Button 
                    className="w-full h-12 rounded-xl font-bold bg-foreground text-background shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm group"
                    onClick={() => window.location.href = "/services"}
                  >
                    Explore Services
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform stroke-[2.5px]" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl font-semibold text-sm bg-background border-border/40 hover:bg-secondary/40 transition-all shadow-sm"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Get in Touch
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Cards - Services Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 md:gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-card border border-border/50 p-6 md:p-8 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden rounded-3xl"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity">
                      <Icon className="w-24 h-24 text-primary" />
                    </div>
                    <div className="mb-5 w-12 h-12 md:w-14 md:h-14 bg-primary/10 border border-primary/20 text-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-all">
                      <Icon size={24} className="stroke-[2px]" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Key Stats/Features */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Card className="bg-foreground text-background p-8 md:p-12 relative overflow-hidden group shadow-xl border-none rounded-[32px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-5xl font-bold text-primary tracking-tight">50+</div>
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-70">Projects Delivered</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-5xl font-bold text-primary tracking-tight">100%</div>
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-70">Client Success</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-5xl font-bold text-primary tracking-tight">8+</div>
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-70">Years Tenure</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-5xl font-bold text-primary tracking-tight">24/7</div>
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-70">Global Relay</p>
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