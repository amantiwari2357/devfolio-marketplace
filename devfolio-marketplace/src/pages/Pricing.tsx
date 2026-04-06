import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      price: "₹0",
      period: "forever",
      description: "Ideal for emerging creators",
      features: [
        "Unlimited 1:1 sessions",
        "Global calendar sync",
        "Secure payment gateway",
        "5% transaction fee",
        "Community support",
        "Basic insights"
      ],
      cta: "Start for Free",
      popular: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Professional",
      price: "₹999",
      period: "per month",
      description: "For rapid growth",
      features: [
        "Everything in Standard",
        "0% platform commission",
        "Priority 24/7 support",
        "Advanced deep-analytics",
        "Full brand customization",
        "HD Webinar hosting",
        "Unlimited course tracks",
        "Priority DM access"
      ],
      cta: "Go Professional",
      popular: true,
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "bespoke",
      description: "For high-scale agencies",
      features: [
        "Everything in Professional",
        "Dedicated success manager",
        "Custom domain white-label",
        "API & Webhook access",
        "SSO & Directory sync",
        "Advanced CRM integration",
        "Multi-seat collaboration",
        "SLA compliance"
      ],
      cta: "Contact Solutions",
      popular: false,
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Pricing & Plans" 
        description="Choose the perfect plan for your creator journey. Transparent pricing with no hidden fees, built for experts." 
      />
      <Header />
      
      <main className="section-spacing pt-32 md:pt-40 relative">
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Flexible Licensing Protocol
            </div>
            <h1 className="heading-responsive">
              Simple, <span className="text-primary NOT-italic">Transparent.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight max-w-3xl mx-auto opacity-70 mt-8">
              Scale your impact without complexity. Every plan is built to maximize your potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-40 animate-slide-up">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`neural-card p-10 md:p-12 relative overflow-hidden transition-all duration-700 hover:scale-[1.02] ${
                  plan.popular ? 'ring-2 ring-primary bg-secondary/20 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground px-8 py-3 rounded-bl-[32px] text-[10px] font-black uppercase tracking-[0.3em] italic">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-[22px] bg-secondary/50 flex items-center justify-center text-primary shadow-inner group-hover:rotate-6 transition-all">
                      {plan.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black tracking-tighter text-foreground italic uppercase leading-none">{plan.name}</h3>
                      <p className="text-sm font-bold text-muted-foreground/60 italic leading-snug">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl md:text-6xl font-black tracking-tighter text-foreground italic">{plan.price}</span>
                      <span className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em] opacity-40 italic">/ {plan.period}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full h-16 rounded-[22px] font-black text-lg transition-all shadow-2xl hover:scale-[1.05] active:scale-[0.95] uppercase tracking-[0.2em] italic border-none ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground shadow-primary/30' 
                        : 'bg-foreground text-background shadow-foreground/20'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-6 pt-10 border-t border-border/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Neural Features</p>
                    <ul className="space-y-5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4 group/item">
                          <div className="mt-1 p-0.5 rounded-full bg-primary/20 text-primary group-hover/item:scale-125 transition-transform">
                            <Check className="w-3.5 h-3.5 stroke-[4]" />
                          </div>
                          <span className="text-sm font-bold text-foreground/80 leading-tight italic opacity-90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Help/FAQ Section */}
          <div className="max-w-5xl mx-auto">
            <Card className="p-12 md:p-16 rounded-[40px] bg-secondary/30 border-border/50 relative overflow-hidden text-center group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <HelpCircle className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
                    Have more <span className="text-primary italic">questions?</span>
                  </h2>
                  <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                    Our platform specialists are available 24/7 to help you architecturalize your creator business.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="rounded-2xl px-12 py-8 font-black text-lg bg-primary text-primary-foreground hover:scale-105 transition-all shadow-2xl shadow-primary/30">
                    Consult an Expert
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-2xl px-12 py-8 font-black text-lg bg-transparent border-border/50 hover:bg-secondary/50 transition-all">
                    Browse Knowledge Base
                  </Button>
                </div>
                <div className="pt-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">No strings attached. Pure guidance.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
