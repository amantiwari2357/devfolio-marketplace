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
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Pricing Plans
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Simple, <span className="text-primary">Transparent.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-3xl mx-auto">
              Scale your impact without complexity. Every plan is built to maximize your potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-32 animate-slide-up">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-10 md:p-12 rounded-[40px] bg-secondary/10 border-border/40 backdrop-blur-3xl relative overflow-hidden transition-all duration-700 hover:scale-[1.02] ${
                  plan.popular ? 'ring-2 ring-primary bg-secondary/20 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-bl-3xl text-xs font-bold shadow-md">
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
                      <h3 className="text-2xl font-bold text-foreground leading-none">{plan.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-sm font-medium">/ {plan.period}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full h-12 md:h-14 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] border-none ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                        : 'bg-foreground text-background shadow-md'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-6 pt-8 border-t border-border/20">
                    <p className="text-sm font-semibold text-foreground/80">Included features:</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group/item">
                          <div className="mt-0.5 p-1 rounded-full bg-primary/20 text-primary transition-transform">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">{feature}</span>
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
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    Have more <span className="text-primary">questions?</span>
                  </h2>
                  <p className="text-base text-muted-foreground font-medium max-w-2xl mx-auto">
                    Our support team is available 24/7 to help you set up your creator business.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="rounded-xl px-8 h-12 md:h-14 font-bold text-sm md:text-base bg-primary text-primary-foreground transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                    Consult an Expert
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 md:h-14 font-bold text-sm md:text-base bg-transparent border-border/50 hover:bg-secondary/50 transition-all hover:-translate-y-0.5">
                    Browse Knowledge Base
                  </Button>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-muted-foreground">No strings attached. Pure guidance.</p>
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
