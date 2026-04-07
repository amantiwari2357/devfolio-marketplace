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
          <div className="animate-slide-up space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Zap className="w-4 h-4 fill-primary" />
              Quick Launch Protocol
            </div>

            <h2 className="heading-responsive">
              Launch your{" "}
              <span className="text-primary">
                Services
              </span>{" "}
              in minutes.
            </h2>

            <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
              Build a stunning website, showcase your skills, and start getting clients — all from one powerful dashboard.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-base md:text-lg leading-tight mb-1">Professional Website</p>
                  <p className="text-muted-foreground text-xs md:text-sm font-medium">No coding required — drag, drop, and deploy with absolute precision.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-base md:text-lg leading-tight mb-1">Instant Client Access</p>
                  <p className="text-muted-foreground text-xs md:text-sm font-medium">Start receiving verified project inquiries through secure relay nodes.</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto h-12 md:h-14 rounded-xl px-8 font-bold text-sm md:text-base bg-foreground text-background shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group"
              onClick={() => window.location.href = "#launch"}
            >
              Get Started Now
              <Rocket className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Card - Activity Feed */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Card className="bg-card border border-border/50 p-6 md:p-10 relative overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-[32px]">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                <Rocket className="w-48 h-48 text-primary" />
              </div>
              
              {/* User Header */}
              <div className="bg-secondary/40 p-5 md:p-6 rounded-2xl mb-6 border border-border/60 shadow-sm relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-lg md:text-xl font-bold shadow-md">
                  AT
                </div>
                <div>
                  <p className="font-bold text-foreground text-base md:text-lg leading-tight mb-1">Aman Tiwari</p>
                  <p className="text-xs font-semibold text-primary">myportfolio.in/aman</p>
                </div>
              </div>

              {/* Highlighted Stats Box */}
              <div className="bg-primary rounded-2xl md:rounded-[24px] p-6 md:p-8 flex flex-col items-center justify-center mb-6 shadow-lg relative z-10 transition-transform hover:-translate-y-1 duration-300">
                <Zap className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground mb-4 drop-shadow-md fill-primary-foreground/20" />
                <p className="text-primary-foreground font-bold text-xl md:text-2xl text-center">Active Profile</p>
                <p className="text-primary-foreground/90 font-semibold uppercase tracking-wider text-[10px] md:text-xs mt-2 text-center">Optimized Performance</p>
              </div>

              {/* Activity Feed */}
              <div className="space-y-3 relative z-10">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">Recent Activity</p>
                
                {/* Activity Item 1 */}
                <div className="bg-card p-4 md:p-5 rounded-xl md:rounded-[20px] border border-border/60 hover:border-primary/40 transition-all group/item shadow-sm flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-muted-foreground text-[10px] md:text-xs uppercase tracking-wide">New project inquiry</p>
                    <p className="text-foreground font-bold text-lg md:text-xl mt-0.5 leading-none">₹5,000</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="bg-card p-4 md:p-5 rounded-xl md:rounded-[20px] border border-border/60 hover:border-primary/40 transition-all group/item shadow-sm flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-muted-foreground text-[10px] md:text-xs uppercase tracking-wide">Review received</p>
                    <div className="flex items-end gap-1.5 mt-0.5">
                       <span className="text-foreground font-bold text-lg md:text-xl leading-none">5.0</span>
                       <span className="text-xs font-semibold text-amber-500 mb-0.5">/ 5.0</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
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