import { Zap, CheckCircle, TrendingUp, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CTASection = () => {
  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/10 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Content */}
          <div className="animate-slide-up space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <Zap className="w-4 h-4" />
              Quick Launch Protocol
            </div>

            <h2 className="heading-responsive">
              Launch your{" "}
              <span className="text-primary NOT-italic">
                Services
              </span>{" "}
              in minutes.
            </h2>

            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-xl opacity-70">
              Build a stunning website, showcase your skills, and start getting clients — all from one powerful dashboard.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl italic">
                  <CheckCircle className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <div>
                  <p className="font-black text-foreground text-lg italic uppercase tracking-tighter leading-none mb-2">Professional Website</p>
                  <p className="text-muted-foreground text-sm font-bold italic opacity-60">No coding required — drag, drop, and deploy absolute precision.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl italic">
                  <TrendingUp className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <div>
                  <p className="font-black text-foreground text-lg italic uppercase tracking-tighter leading-none mb-2">Instant Client Access</p>
                  <p className="text-muted-foreground text-sm font-bold italic opacity-60">Start receiving verified project inquiries through secure relay nodes.</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="h-16 md:h-20 rounded-[22px] md:rounded-[28px] px-10 md:px-12 font-black text-lg md:text-xl bg-foreground text-background shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest italic border-none group"
              onClick={() => window.location.href = "#launch"}
            >
              Get Started Now
              <Rocket className="ml-4 w-6 h-6 animate-pulse group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Card - Activity Feed */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Card className="neural-card p-10 md:p-12 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                <Rocket className="w-48 h-48 text-primary" />
              </div>
              
              {/* User Header */}
              <div className="bg-background/50 p-6 rounded-[28px] mb-8 border border-border/40 shadow-xl relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-black shadow-2xl italic">
                    AT
                  </div>
                  <div>
                    <p className="font-black text-foreground text-xl tracking-tighter italic uppercase leading-none mb-1">Aman Tiwari</p>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">myportfolio.in/aman</p>
                  </div>
                </div>
              </div>

              {/* Highlighted Stats Box */}
              <div className="bg-primary rounded-[32px] p-10 flex flex-col items-center justify-center mb-8 shadow-2xl shadow-primary/30 relative z-10 transition-transform hover:scale-[1.02] duration-500">
                <Zap className="w-20 h-20 text-primary-foreground mb-6 drop-shadow-2xl animate-pulse stroke-[3px]" />
                <p className="text-primary-foreground font-black text-3xl tracking-tighter italic uppercase">Active Profile</p>
                <p className="text-primary-foreground/70 font-black mt-3 uppercase tracking-[0.3em] text-[10px] italic">Optimized Performance</p>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4 relative z-10">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-6 italic opacity-50">Recent Data Stream</p>
                
                {/* Activity Item 1 */}
                <div className="bg-background/40 backdrop-blur-xl p-6 rounded-[24px] border border-border/40 hover:border-primary/40 hover:bg-background/60 transition-all group/item shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-2.5 animate-ping opacity-75"></div>
                    <div className="flex-1">
                      <p className="font-black text-foreground text-xs uppercase tracking-widest italic opacity-60">New project inquiry</p>
                      <p className="text-primary font-black text-2xl mt-1 tracking-tighter italic leading-none">₹5,000</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-inner">
                      <TrendingUp className="w-6 h-6 stroke-[3px]" />
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="bg-background/40 backdrop-blur-xl p-6 rounded-[24px] border border-border/40 hover:border-primary/40 hover:bg-background/60 transition-all group/item shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mt-2.5 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                    <div className="flex-1">
                      <p className="font-black text-foreground text-xs uppercase tracking-widest italic opacity-60">Review received</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-amber-500 font-black text-2xl tracking-tighter italic leading-none">5.0</span>
                         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-40 ml-1">/ Node Ranking</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                      <CheckCircle className="w-6 h-6 stroke-[3px]" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;