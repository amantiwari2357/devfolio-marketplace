import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent),radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.05),transparent)] bg-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
      
      <div className="text-center relative animate-in fade-in zoom-in duration-500">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-destructive/10 border border-destructive/20 shadow-2xl shadow-destructive/5 group hover:scale-110 transition-transform duration-500">
           <div className="text-4xl font-black italic uppercase tracking-tighter text-destructive">404</div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground italic uppercase mb-3">V_Node / Termination</h1>
        <p className="text-[10px] md:text-sm font-bold text-muted-foreground/60 uppercase tracking-[0.3em] mb-10 italic">Sector_404 // Signal_Registry_Null</p>
        
        <div className="flex flex-col items-center gap-4">
           <a 
            href="/dashboard" 
            className="inline-flex h-12 items-center px-10 rounded-xl bg-primary text-[11px] font-black uppercase italic tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
          >
            Reinitialize_System_Link
          </a>
          <p className="text-[9px] font-black italic uppercase tracking-widest text-muted-foreground/30 mt-4">
             Error_Trace: {location.pathname} // Timestamp: {new Date().getTime()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
