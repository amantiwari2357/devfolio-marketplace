import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Edit, CheckCircle2, User, Search, X, Filter, TrendingUp, Star, Clock, Zap, ArrowUpRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logo from "../../../public/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { userAPI } from "@/services/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
  };

  const getInitials = (email: string) => {
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch user profile to verify token and get user data
          const response = await userAPI.getProfile();
          setUser(response.data.user);
          setIsLoggedIn(true);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (in case login/logout happens in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/settings');
  };

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Devfolio Logo" className="h-36 w-auto" />
            </a>
          </div>
          <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-4 group">
            <img src={logo} alt="Devfolio Logo" className="h-32 md:h-40 w-auto group-hover:scale-105 transition-transform duration-300" />
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {["Use Cases", "Search", "Listing", "Pricing"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Center Search - Mobile Focus */}
        <div className="flex-1 max-w-sm hidden sm:block md:hidden">
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="w-full h-11 rounded-xl bg-secondary/30 border border-border/40 flex items-center px-4 gap-3 text-muted-foreground hover:bg-secondary/50 transition-all group"
          >
            <Search className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-black uppercase tracking-widest italic opacity-40">Scan Network...</span>
          </button>
        </div>

        {/* Mobile Search Icon for smallest screens */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(true)} className="rounded-xl">
             <Search className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Neural Search Overlay - Mobile */}
        {showMobileSearch && (
          <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-hidden">
            {/* Neural Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse delay-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 pt-6 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input 
                    autoFocus
                    placeholder="INITIALIZE SEARCH..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 rounded-[20px] bg-secondary/10 border border-primary/20 pl-16 pr-8 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] italic focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xl"
                  />
                </div>
                <Button 
                   variant="ghost" 
                   size="icon" 
                   onClick={() => setShowMobileSearch(false)}
                   className="h-14 w-14 rounded-[20px] bg-secondary/10 border border-border/40 shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-500">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 italic flex items-center gap-2">
                    <Filter className="w-3 h-3" />
                    Protocol Filters
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <TrendingUp className="w-3 h-3" />, label: "Top Rated" },
                      { icon: <Star className="w-3 h-3" />, label: "Elite Nodes" },
                      { icon: <Clock className="w-3 h-3" />, label: "Newest Init" },
                      { icon: <Zap className="w-3 h-3" />, label: "Instant Connect" }
                    ].map((filter, i) => (
                      <button 
                        key={i}
                        className="flex items-center gap-3 p-5 rounded-2xl bg-secondary/10 border border-border/20 hover:border-primary/40 transition-all group"
                      >
                         <div className="p-2 rounded-lg bg-background text-primary group-hover:scale-110 transition-transform">
                           {filter.icon}
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest italic">{filter.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 italic">Trending Nodes</h4>
                  <div className="space-y-3">
                    {["UI Architecture", "Neural Backend", "SaaS Strategy"].map((trend, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-background/50 border border-border/20 hover:border-primary/20 transition-all cursor-pointer group">
                        <span className="text-xs font-black uppercase tracking-widest italic">{trend}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full w-10 h-10 from-primary/10 to-primary-glow/10 hover:from-primary/20 hover:to-primary-glow/20 border border-primary/20 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <Avatar>
                  <AvatarImage src={user ? getAvatarUrl(user.email) : "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} alt={user?.email || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user ? getInitials(user.email) : "US"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-popover/95 backdrop-blur-xl shadow-2xl border-border/50 z-[100] rounded-2xl p-2">
              <DropdownMenuLabel className="font-normal px-4 py-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-foreground">{user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground font-medium">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <div className="p-1 space-y-1">
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer rounded-xl focus:bg-primary/10 focus:text-primary py-2.5 transition-colors font-medium">
                  <User className="mr-3 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer rounded-xl focus:bg-primary/10 focus:text-primary py-2.5 transition-colors font-medium">
                  <Edit className="mr-3 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/onboarding-status')} className="cursor-pointer rounded-xl focus:bg-primary/10 focus:text-primary py-2.5 transition-colors font-medium">
                  <CheckCircle2 className="mr-3 h-4 w-4" />
                  <span>Onboarding Status</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <div className="p-1">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive py-2.5 transition-colors font-bold">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="rounded-xl px-8 py-6 font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;