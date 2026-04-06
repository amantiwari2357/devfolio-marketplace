import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOASTS = [
  { name: "Sarah J.", action: "purchased Node Core Strategy", time: "Just now" },
  { name: "Michael T.", action: "deployed a new Storefront", time: "1 min ago" },
  { name: "Elena R.", action: "booked a high-ticket retainer", time: "2 mins ago" },
  { name: "David K.", action: "upgraded to Enterprise", time: "5 mins ago" },
  { name: "Sophia L.", action: "secured a new client node", time: "12 mins ago" }
];

export function LiveProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || !isVisible) return;

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Schedule next toast
      setTimeout(() => {
        setToastIndex((current) => (current + 1) % TOASTS.length);
        setIsVisible(true);
      }, 15000 + Math.random() * 10000); // Random delay 15-25s

    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const currentToast = TOASTS[toastIndex];

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 z-50 transition-all duration-700 ease-out transform",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="bg-background/80 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-4 flex items-start gap-4 pr-10 relative max-w-[300px] group">
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 text-muted-foreground/50 hover:text-foreground transition-colors opacity-0 md:opacity-100 md:group-hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-primary" />
        </div>
        
        <div className="pt-0.5">
          <p className="text-xs text-foreground/90 leading-tight mb-1">
            <span className="font-black text-foreground relative inline-block">
               {currentToast.name}
               <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary/30 -z-10 translate-y-[-2px]"></span>
            </span> {currentToast.action}
          </p>
          <p className="text-[9px] uppercase tracking-widest font-black text-primary/70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {currentToast.time}
          </p>
        </div>
      </div>
    </div>
  );
}
