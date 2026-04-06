import { Zap, CheckCircle, TrendingUp, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Quick Launch</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
              Launch your{" "}
              <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">
                website & services
              </span>{" "}
              in minutes
            </h2>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-medium max-w-xl">
              Build a stunning website, showcase your skills, and start getting clients — all from one powerful dashboard.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Professional Website</p>
                  <p className="text-muted-foreground text-sm font-medium">No coding required — drag, drop, and deploy</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Instant Client Access</p>
                  <p className="text-muted-foreground text-sm font-medium">Start receiving verified project inquiries today</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Built-in Analytics</p>
                  <p className="text-muted-foreground text-sm font-medium">Track your growth and performance in real-time</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="rounded-2xl px-10 py-8 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all gap-3"
              onClick={() => window.location.href = "#launch"}
            >
              Get Started Now
              <Rocket className="w-6 h-6 animate-pulse" />
            </Button>
          </div>

          {/* Right Card - Activity Feed */}
          <div className="relative">
            <div className="bg-secondary/40 border border-border/50 p-10 rounded-[3rem] shadow-sm relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              {/* User Header */}
              <div className="bg-card p-6 rounded-3xl mb-8 border border-border/50 shadow-sm relative z-10 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20">
                    AT
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg tracking-tight">Aman Tiwari</p>
                    <p className="text-sm text-primary font-bold">myportfolio.in/aman</p>
                  </div>
                </div>
              </div>

              {/* Highlighted Stats Box */}
              <div className="bg-primary rounded-3xl p-10 flex flex-col items-center justify-center mb-8 shadow-2xl shadow-primary/30 relative z-10">
                <Zap className="w-16 h-16 text-primary-foreground mb-4 drop-shadow-md animate-pulse" />
                <p className="text-primary-foreground font-black text-2xl tracking-tight">Active Profile</p>
                <p className="text-primary-foreground/80 font-bold mt-2 uppercase tracking-widest text-xs">Getting Real Results</p>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4 relative z-10">
                <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6 inline-block pb-1 border-b-2 border-primary/20">Recent Activity</p>
                
                {/* Activity Item 1 */}
                <div className="bg-card/80 backdrop-blur-md p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-2 animate-ping shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm">New project inquiry</p>
                      <p className="text-primary font-black text-xl mt-1 tracking-tight">₹5,000</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="bg-card/80 backdrop-blur-md p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mt-2 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm">Review received</p>
                      <div className="flex items-center gap-1 mt-1">
                         <span className="text-amber-500 font-black text-xl">5.0</span>
                         <span className="text-muted-foreground text-xs font-bold uppercase ml-1">/ Perfect Rating</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;