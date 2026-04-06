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
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Sparkles className="w-4 h-4" />
              Flexible Licensing
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
              Simple, <span className="text-primary italic">Transparent.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Scale your impact without complexity. Every plan is built to maximize your potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-10 rounded-[40px] bg-card border-border/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${
                  plan.popular ? 'ring-2 ring-primary bg-secondary/20 shadow-xl' : 'hover:border-primary/20 bg-secondary/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-bl-3xl text-xs font-black uppercase tracking-[0.2em]">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      {plan.icon}
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground font-medium">{plan.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tighter text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground font-bold text-sm uppercase tracking-widest">/ {plan.period}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full rounded-2xl py-8 font-black text-lg transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground shadow-primary/20' 
                        : 'bg-foreground text-background shadow-foreground/10'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">What's included</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <div className="mt-1 p-0.5 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                            <Check className="w-3.5 h-3.5 stroke-[4]" />
                          </div>
                          <span className="text-sm font-bold text-foreground/80 leading-tight">{feature}</span>
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
