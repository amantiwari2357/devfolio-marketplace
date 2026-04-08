import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.15),transparent),radial-gradient(circle_at_80%_70%,hsl(var(--accent)/0.15),transparent)]"></div>
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]"></div>
      
      {/* Animated Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline"></div>

      <div className="max-w-md w-full text-center relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="mb-12 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.2)] group hover:scale-110 transition-transform duration-500">
          <Link className="w-10 h-10 text-primary group-hover:animate-pulse" />
        </div>

        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
            V_Node / <span className="text-primary italic">Core_Nexus</span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"></div>
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.4em] italic shadow-sm">
            Elite_Node_Management // System_Active
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => navigate("/login")}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase italic tracking-[0.2em] text-[12px] shadow-2xl shadow-primary/20 transition-all active:scale-95 group"
          >
            Initialize_Access_Terminal
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </Button>
          
          <div className="flex items-center justify-center gap-6 mt-8">
             <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-primary/60 italic">Latency</span>
                <span className="text-[11px] font-black italic">0.04ms</span>
             </div>
             <div className="w-px h-6 bg-white/10"></div>
             <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-primary/60 italic">Nodes</span>
                <span className="text-[11px] font-black italic">1,402</span>
             </div>
             <div className="w-px h-6 bg-white/10"></div>
             <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-primary/60 italic">Status</span>
                <span className="text-[11px] font-black italic text-green-500 animate-pulse">Online</span>
             </div>
          </div>
        </div>

        <p className="mt-16 text-[9px] font-black italic uppercase tracking-widest text-white/20">
          Protocol_V4.0 // Secure_Handshake_Required
        </p>
      </div>
    </div>
  );
};

export default Index;
