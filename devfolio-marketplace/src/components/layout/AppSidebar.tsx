import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, TrendingUp, Settings, 
  Home as HomeIcon, BookOpen, MessageSquare, 
  LogOut, Menu, Search, X, Bell, Star,
  PlusCircle, User, Globe, FileText, Zap,
  BarChart2, ShoppingBag, ChevronRight
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import api from "@/services/api";
import logo from "../../../public/Images/logo.png";

interface navItem {
  label: string;
  icon: JSX.Element;
  href: string;
  badge?: string;
}

export const AppSidebar = ({ activePath }: { activePath: string }) => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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

  const mainNavItems: navItem[] = [
    { label: "Back to Site", icon: <Globe className="w-5 h-5" />, href: "/" },
    { label: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings", badge: "3" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm", badge: "12" },
    { label: "Services", icon: <ShoppingBag className="w-5 h-5" />, href: "/services" },
  ];

  const creatorItems: navItem[] = [
    { label: "Create Service", icon: <PlusCircle className="w-5 h-5" />, href: "/createcourse" },
    { label: "My Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
    { label: "Current Listing", icon: <Globe className="w-5 h-5" />, href: "/listing" },
    { label: "Blog Posts", icon: <FileText className="w-5 h-5" />, href: "/blog" },
  ];

  const analyticsItems: navItem[] = [
    { label: "Insights", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Reports", icon: <BarChart2 className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
  ];

  const allItems = [...mainNavItems, ...creatorItems, ...analyticsItems];
  const filteredItems = searchQuery.trim()
    ? allItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const NavLink = ({ item, isMobile }: { item: navItem; isMobile?: boolean }) => {
    const isActive = activePath === item.href;
    return (
      <a
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 group relative ${
          isActive
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            : isMobile 
              ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
        }`}
      >
        <div className={`flex-shrink-0 ${isActive ? "text-primary-foreground" : "group-hover:scale-110 transition-transform"}`}>
          {item.icon}
        </div>
        <span className="text-sm flex-1">{item.label}</span>
        {item.badge && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"}`}>
            {item.badge}
          </span>
        )}
        {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
      </a>
    );
  };

  const SidebarContent = ({ isMobile }: { isMobile?: boolean }) => (
    <div className={`flex flex-col h-full py-6 px-4 ${isMobile ? 'bg-white' : ''}`}>
      {/* Logo */}
      <a href="/" className="flex items-center justify-center mb-6 px-2 group">
        <img 
          src={logo} 
          alt="Devfolio Logo" 
          className="h-20 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-md" 
        />
      </a>

      {/* Search Bar */}
      <div className={`relative mb-6 transition-all ${searchFocused ? "ring-2 ring-primary/30 rounded-2xl" : ""}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full h-11 rounded-2xl border transition-all placeholder:text-muted-foreground/60 text-sm font-bold pl-10 pr-9 focus:outline-none ${
            isMobile 
              ? "bg-slate-100/80 border-slate-200 focus:bg-white text-slate-900" 
              : "bg-secondary/40 border-border/40 focus:bg-secondary/60 text-foreground"
          }`}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
        {filteredItems ? (
          <div className="space-y-1">
            <p className={`text-[10px] font-bold uppercase tracking-widest px-4 mb-2 ${isMobile ? 'text-slate-400' : 'text-muted-foreground/60'}`}>
              Results for "{searchQuery}"
            </p>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <NavLink key={item.label} item={item} isMobile={isMobile} />)
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No results found</p>
            )}
          </div>
        ) : (
          <>
            {/* Main Navigation */}
            <div className="space-y-1">
              <p className={`text-[10px] font-black uppercase tracking-widest px-4 mb-3 ${isMobile ? 'text-slate-400' : 'text-muted-foreground/50'}`}>Main</p>
              {mainNavItems.map((item) => <NavLink key={item.label} item={item} isMobile={isMobile} />)}
            </div>

            {/* Creator Tools */}
            <div className="space-y-1">
              <p className={`text-[10px] font-black uppercase tracking-widest px-4 mb-3 ${isMobile ? 'text-slate-400' : 'text-muted-foreground/50'}`}>Creator</p>
              {creatorItems.map((item) => <NavLink key={item.label} item={item} isMobile={isMobile} />)}
            </div>

            {/* Analytics */}
            <div className="space-y-1">
              <p className={`text-[10px] font-black uppercase tracking-widest px-4 mb-3 ${isMobile ? 'text-slate-400' : 'text-muted-foreground/50'}`}>Growth</p>
              {analyticsItems.map((item) => <NavLink key={item.label} item={item} isMobile={isMobile} />)}
            </div>

            {/* Quick CTA */}
            <div className={`mt-4 p-4 rounded-2xl border ${isMobile ? 'bg-primary/5 border-primary/20' : 'bg-primary/5 border-primary/15'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-primary" />
                <p className={`text-xs font-bold ${isMobile ? 'text-slate-900' : 'text-foreground'}`}>Quick Launch</p>
              </div>
              <Button
                onClick={() => window.location.href = '/createcourse'}
                className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                Create New Course
              </Button>
            </div>
          </>
        )}
      </div>

      {/* User Profile Footer */}
      <div className={`pt-4 mt-4 border-t space-y-2 ${isMobile ? 'border-slate-200' : 'border-border/30'}`}>
        <a href="/profile" className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer group ${
          isMobile 
            ? "bg-slate-50 border-slate-200 hover:border-primary/30 hover:bg-white text-slate-900" 
            : "bg-secondary/30 border-border/20 hover:border-primary/30 hover:bg-secondary/50"
        }`}>
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-black truncate ${isMobile ? 'text-slate-900' : 'text-foreground'}`}>{user?.firstName || 'My Account'}</p>
            <p className={`text-[10px] font-bold truncate ${isMobile ? 'text-slate-500' : 'text-muted-foreground'}`}>{user?.email?.split('@')[0]}</p>
          </div>
          <Star className="w-4 h-4 text-primary/50 flex-shrink-0" />
        </a>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`w-full h-11 flex items-center gap-3 px-4 rounded-xl font-bold transition-all justify-start text-sm border-none ${
            isMobile ? "text-red-500 hover:bg-red-50" : "text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
          }`}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar (Sheet) - floating bottom button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="h-14 rounded-full bg-primary/95 text-primary-foreground backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/30 px-6 gap-3 group">
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Dashboard</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-0 h-[85vh] bg-white border-t border-slate-200 rounded-t-[32px] overflow-hidden">
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Access all dashboard features and creator tools from this menu.
            </SheetDescription>
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />
            <SidebarContent isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-border/30 bg-secondary/5 backdrop-blur-md flex-col relative z-20 h-full min-h-[calc(100vh-80px)]">
        <SidebarContent />
      </aside>
    </>
  );
};
