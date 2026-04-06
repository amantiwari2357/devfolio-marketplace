import { ArrowRight, Code, Palette, TrendingUp, Cog } from "lucide-react";

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
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background overflow-hidden relative">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Transform Your <span className="text-primary">Vision</span> Into Reality
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver cutting-edge software solutions and digital strategy that drive real business growth.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 items-start mb-20">
            {/* Left Card - Services Overview */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border p-10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem]">
                <h3 className="text-3xl font-bold mb-6 text-foreground tracking-tight">
                  Our Digital <span className="text-primary">DNA</span>
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                  We specialize in building modern, scalable digital experiences that drive measurable results.
                </p>
                <p className="text-primary font-bold mb-10 text-lg">
                  From concept to deployment, we handle it all.
                </p>
                
                <div className="space-y-3">
                  <button 
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                    onClick={() => window.location.href = "/services"}
                  >
                    Explore Services
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    className="w-full bg-background border border-border text-foreground hover:bg-secondary font-bold py-4 rounded-xl transition-all"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>

            {/* Right Cards - Services Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card border border-border/50 p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group rounded-3xl"
                  >
                    <div className="mb-6 inline-block p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Key Stats/Features */}
          <div className="bg-secondary/40 border border-border/50 p-12 rounded-[2.5rem] shadow-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Projects Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">8+</div>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;