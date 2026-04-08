import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, ArrowRight, MessageSquare, Mail, Phone, Calculator } from "lucide-react";
import SEO from "@/components/layout/SEO";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const enquiryFormRef = useRef<HTMLDivElement>(null);

  const scrollToEnquiry = () => {
    enquiryFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = [
    {
      name: "Standard",
      monthlyPrice: "₹0",
      yearlyPrice: "₹0",
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
      monthlyPrice: "₹999",
      yearlyPrice: "₹799",
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
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
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

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Enquiry received! Our team will contact you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <SEO 
        title="Pricing & Plans | Devfolio" 
        description="Choose the perfect plan for your creator journey. Transparent pricing with no hidden fees, built for experts." 
      />
      <Header />
      
      <main className="pt-32 md:pt-40 pb-24 relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/4 bg-primary/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/4 bg-secondary/10 blur-[150px] rounded-full" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-bold text-primary shadow-sm uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              Simple Pricing
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
              Scale your impact, <br />
              <span className="text-primary italic">Not your costs.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Transparent plans with zero surprises. Choose the path that fits your current stage.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-6 pt-6">
               <span className={cn("text-sm font-bold transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
               <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-16 h-8 rounded-full bg-secondary border border-border/40 p-1 flex items-center relative transition-all"
               >
                  <div className={cn(
                    "w-6 h-6 rounded-full bg-primary shadow-lg transition-transform",
                    isYearly ? "translate-x-8" : "translate-x-0"
                  )} />
               </button>
               <div className="flex items-center gap-2">
                 <span className={cn("text-sm font-bold transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>Yearly</span>
                 <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                    Save 20%
                 </span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "p-10 md:p-12 rounded-[48px] border-border/40 backdrop-blur-3xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl group",
                  plan.popular ? "bg-secondary/20 ring-2 ring-primary/40 shadow-primary/10" : "bg-card/50"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground px-8 py-2.5 rounded-bl-[32px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      Recommended
                    </div>
                  </div>
                )}
                
                <div className="space-y-10 relative z-10">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:rotate-12 transition-transform duration-500">
                      {plan.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black italic tracking-tighter text-foreground uppercase">{plan.name}</h3>
                      <p className="text-sm font-bold text-muted-foreground italic">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-black tracking-tighter text-foreground italic">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      {plan.monthlyPrice !== 'Custom' && (
                        <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                          / {isYearly ? 'month billed yearly' : 'month'}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={plan.name === 'Enterprise' ? scrollToEnquiry : () => window.location.href='/signup/'}
                    className={cn(
                      "w-full h-14 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 border-none",
                      plan.popular 
                        ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/30' 
                        : 'bg-foreground text-background shadow-lg'
                    )}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-8 pt-10 border-t border-border/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">CORE FEATURES:</p>
                    <ul className="space-y-5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4 group/item">
                          <div className="mt-0.5 p-1 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover/item:scale-110 transition-transform">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-sm font-bold text-muted-foreground/80 leading-snug group-hover/item:text-foreground transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Background Decor */}
                <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none duration-1000 group-hover:scale-125">
                   {plan.icon}
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Enquiry Section */}
          <div ref={enquiryFormRef} className="max-w-6xl mx-auto pt-20 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Card className="p-10 md:p-20 rounded-[56px] bg-secondary/10 border-border/40 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
                <HelpCircle className="w-[400px] h-[400px] text-primary" />
              </div>
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                   <div className="inline-flex items-center gap-3 text-primary">
                      <Zap className="w-5 h-5 fill-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">GET SPECIAL QUOTE</span>
                   </div>
                   <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground italic leading-tight uppercase">
                      READY TO <span className="text-primary italic-none">START?</span>
                   </h2>
                   <p className="text-lg md:text-xl text-muted-foreground font-bold italic leading-relaxed tracking-tight">
                      Drop us a quick enquiry and <span className="text-primary underline underline-offset-8">our success team</span> will guide you through the perfect setup for your goals.
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      {[
                        { icon: <MessageSquare className="w-5 h-5" />, label: 'Live Q&A', val: '24/7 Access' },
                        { icon: <Mail className="w-5 h-5" />, label: 'Email Support', val: 'Fast Response' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-sm">
                              {item.icon}
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                              <p className="text-sm font-black text-foreground italic uppercase tracking-wider">{item.val}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-background/40 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-border/40 shadow-2xl">
                   <form onSubmit={handleEnquirySubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 italic">Full Name</Label>
                        <Input id="name" placeholder="Expert Name" required className="h-14 rounded-2xl bg-background border-border/60 focus:ring-primary/20 transition-all font-bold tracking-tight" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 italic">Email Terminal</Label>
                        <Input id="email" type="email" placeholder="expert@devfolio.com" required className="h-14 rounded-2xl bg-background border-border/60 focus:ring-primary/20 transition-all font-bold tracking-tight" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="msg" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 italic">Message Sequence</Label>
                        <Textarea id="msg" placeholder="Tell us about your project..." required className="min-h-[120px] rounded-2xl bg-background border-border/60 focus:ring-primary/20 transition-all font-bold tracking-tight resize-none" />
                      </div>
                      <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-base uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3 overflow-hidden group/btn">
                         Initiate Sequence
                         <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                   </form>
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

