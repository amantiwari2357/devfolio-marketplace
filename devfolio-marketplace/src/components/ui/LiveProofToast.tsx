import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOASTS = [
  { name: "Aryan K.", location: "Mumbai", action: "launched a new Storefront", time: "Just now", seed: "Aryan" },
  { name: "Neha S.", location: "Delhi", action: "booked a Strategy Epoch", time: "2 mins ago", seed: "Neha" },
  { name: "Rohan M.", location: "Bangalore", action: "purchased Portfolio Dev Kit", time: "5 mins ago", seed: "Rohan" },
  { name: "Priya V.", location: "Hyderabad", action: "upgraded to Enterprise Node", time: "12 mins ago", seed: "Priya" },
  { name: "Amit R.", location: "Pune", action: "unlocked UI/UX Optimization", time: "15 mins ago", seed: "Amit" },
  { name: "Siddharth B.", location: "Chennai", action: "secured a Client Retainer", time: "22 mins ago", seed: "Sid" }
];

export function LiveProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Longer initial delay for premium feel (45s)
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || !isVisible) return;

    // Show for 6 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Much longer delay between toasts (2-4 minutes)
      const nextDelay = (120 + Math.random() * 120) * 1000;
      
      setTimeout(() => {
        setToastIndex((current) => (current + 1) % TOASTS.length);
        setIsVisible(true);
      }, nextDelay);

    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const currentToast = TOASTS[toastIndex];

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 z-50 transition-all duration-1000 ease-in-out transform",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90 pointer-events-none"
      )}
    >
      <div className="bg-background/40 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rounded-[24px] p-4 flex items-center gap-4 pr-12 relative max-w-[340px] group overflow-hidden">
        {/* Animated Glow Backer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50 pointer-events-none" />
        
        <button 
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss Notification"
          className="absolute top-4 right-4 text-muted-foreground/30 hover:text-primary transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Avatar with Status */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-secondary/50 border border-white/20 overflow-hidden shadow-inner transform group-hover:scale-110 transition-transform duration-500">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentToast.seed}&backgroundColor=transparent`} 
              alt={currentToast.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background border-2 border-background flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex flex-col">
            <p className="text-[14px] leading-[1.3] text-foreground font-medium mb-1">
              <span className="font-black text-foreground">{currentToast.name}</span>
              <span className="text-muted-foreground/80"> from </span>
              <span className="font-bold text-foreground/90">{currentToast.location}</span>
            </p>
            <p className="text-[12px] font-bold text-muted-foreground line-clamp-1 italic">
              {currentToast.action}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/80 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/10">
              {currentToast.time}
            </span>
            <div className="h-1 flex-1 bg-secondary/30 rounded-full overflow-hidden">
               <div className="h-full bg-primary/40 animate-progress-glow" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
