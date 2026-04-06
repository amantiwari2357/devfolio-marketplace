import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, Fingerprint, Zap } from "lucide-react";
import SEO from "@/components/layout/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <SEO title="404 | Node Not Found" description="The requested resource could not be located on the DEVFOLIO network." />
      
      {/* Background Mesh Flux */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[200px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/5 opacity-20 blur-[150px] rounded-full" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="text-center space-y-12 max-w-3xl px-8 animate-slide-up">
        <div className="flex items-center justify-center gap-4 text-primary animate-pulse">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Signal Disruption Detected</span>
        </div>

        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full animate-pulse" />
          <h1 className="text-[200px] md:text-[280px] font-black tracking-tighter text-foreground/5 leading-none relative z-10 italic select-none">
            404
          </h1>
        </div>

        <div className="space-y-6 -mt-24 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground italic uppercase leading-[0.85]">
            Node <span className="text-primary NOT-italic">Not Found.</span>
          </h2>
          <p className="text-lg md:text-xl font-bold text-muted-foreground/60 italic leading-relaxed tracking-tight max-w-xl mx-auto">
            The requested pathway <span className="text-foreground font-black uppercase text-sm bg-secondary/20 px-3 py-1 rounded-lg">{location.pathname}</span> does not exist on the DEVFOLIO network graph.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Button asChild className="h-20 px-16 rounded-[28px] bg-primary text-primary-foreground text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 italic border-none group">
            <a href="/">
              <ArrowLeft className="w-6 h-6 stroke-[4px] group-hover:-translate-x-2 transition-transform" />
              Return to Origin
            </a>
          </Button>
          <Button asChild variant="outline" className="h-20 px-16 rounded-[28px] border-border/40 bg-secondary/10 text-xl font-black uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all italic border-none shadow-xl">
            <a href="/explore">
              Explore Network
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 text-muted-foreground/20 pt-8">
          <Fingerprint className="w-5 h-5" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <Zap className="w-5 h-5" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <Activity className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
