import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, TrendingUp, Star, Clock, Zap, ArrowUpRight } from "lucide-react";

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearchOverlay = ({ isOpen, onClose }: MobileSearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 top-[80px] z-[90] bg-background/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Dropdown Overlay */}
      <div className="fixed top-[80px] left-0 right-0 z-[100] px-4 pt-6 pb-8 bg-background border-b border-border rounded-b-3xl shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 flex flex-col">
      {/* Neural Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full pointer-events-none animate-pulse delay-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.03),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              autoFocus
              placeholder="Search Devfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-xl bg-secondary/50 border border-border/50 pl-12 pr-4 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>
          <Button 
             variant="ghost" 
             size="icon" 
             onClick={onClose}
             className="h-12 w-12 rounded-xl bg-secondary/50 border border-border/50 shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-300">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Quick Filters
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <TrendingUp className="w-4 h-4" />, label: "Top Rated" },
                { icon: <Star className="w-4 h-4" />, label: "Elite Profiles" },
                { icon: <Clock className="w-4 h-4" />, label: "Newest" },
                { icon: <Zap className="w-4 h-4" />, label: "Instant Connect" }
              ].map((filter, i) => (
                <button 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/30 hover:border-primary/40 transition-all group"
                >
                   <div className="p-2 rounded-lg bg-background text-primary shadow-sm group-hover:scale-105 transition-transform">
                     {filter.icon}
                   </div>
                   <span className="text-sm font-semibold">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trending Topics</h4>
            <div className="space-y-2">
              {["React Architecture", "Next.js Performance", "AI Integration"].map((trend, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/30 hover:border-primary/30 transition-all cursor-pointer group shadow-sm">
                  <span className="text-sm font-medium">{trend}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default MobileSearchOverlay;
