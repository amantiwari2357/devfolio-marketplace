import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, TrendingUp, Settings, 
  Home as HomeIcon, BookOpen, MessageSquare, 
  LogOut, Menu, X 
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
} from "@/components/ui/sheet";
import api from "@/services/api";
import logo from "../../../public/Images/logo.png";

interface navItem {
  label: string;
  icon: JSX.Element;
  href: string;
  active?: boolean;
}

export const AppSidebar = ({ activePath }: { activePath: string }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems: navItem[] = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems: navItem[] = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 md:p-10">
      <div className="flex items-center gap-4 mb-14">
        <a href="/" className="group cursor-pointer block">
          <img src={logo} alt="Devfolio Logo" className="h-24 w-auto group-hover:scale-105 transition-transform duration-300" />
        </a>
      </div>

      <div className="flex-1 space-y-12 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Directory Interface</p>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className={`flex items-center gap-4 px-6 py-4 rounded-[22px] font-black transition-all group border-none ${
                  activePath === item.href 
                    ? "bg-foreground text-background shadow-2xl shadow-foreground/10 translate-x-2 italic" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <div className={activePath === item.href ? "text-primary" : "group-hover:scale-110 transition-transform"}>{item.icon}</div>
                <span className="text-xs uppercase tracking-widest">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 opacity-50 italic">Scale Vector</p>
          <nav className="space-y-3">
            {analysisItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className={`flex items-center gap-4 px-6 py-4 rounded-[22px] font-black transition-all group border-none ${
                    activePath === item.href 
                    ? "bg-foreground text-background shadow-2xl shadow-foreground/10 translate-x-2 italic" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <div className={activePath === item.href ? "text-primary" : "group-hover:scale-110 transition-transform"}>{item.icon}</div>
                <span className="text-xs uppercase tracking-widest">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="pt-10 border-t border-border/20 space-y-6">
        <div className="flex items-center gap-4 p-4 md:p-6 rounded-[28px] bg-background/50 shadow-inner border border-border/20 group hover:border-primary/20 transition-all cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-xl shadow-sm group-hover:scale-105 transition-transform italic">
            {user?.firstName?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black truncate text-foreground italic uppercase">{user?.firstName || 'Creator Node'}</p>
            <p className="text-[10px] font-bold truncate text-muted-foreground opacity-60 uppercase tracking-widest leading-none">{user?.email?.split('@')[0]}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-14 flex items-center gap-4 px-6 rounded-[20px] font-black text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-all justify-start text-[10px] uppercase tracking-[0.3em] italic border-none"
        >
          <LogOut className="w-5 h-5" />
          Disconnect
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
      <div className="lg:hidden fixed top-6 left-6 z-[60]">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-[18px] bg-background/50 backdrop-blur-xl border-border/40 shadow-2xl shadow-primary/10">
              <Menu className="w-6 h-6 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 bg-background/95 backdrop-blur-2xl border-r border-border/40">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 border-r border-border/40 bg-secondary/10 backdrop-blur-3xl flex-col relative z-20">
        <SidebarContent />
      </aside>
    </>
  );
};
