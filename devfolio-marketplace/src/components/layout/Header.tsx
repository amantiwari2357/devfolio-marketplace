import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Edit, CheckCircle2, User, Search, X, Filter, TrendingUp, Star, Clock, Zap, ArrowUpRight, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logo from "../../../public/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { userAPI } from "@/services/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSearchOverlay from "./MobileSearchOverlay";

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
        <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="flex-1 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center px-4 gap-3 text-muted-foreground hover:bg-secondary/70 transition-all group shadow-sm"
          >
            <Search className="w-4 h-4 text-primary bg-transparent transition-opacity" />
            <span className="text-xs font-medium">Search Devfolio...</span>
          </button>
        </div>

        {/* Mobile Search & Menu Actions (Visible only on mobile/tablet) */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(true)} className="rounded-xl w-10 h-10 hover:bg-secondary/20">
             <Search className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Neural Search Overlay - Mobile */}
        {showMobileSearch && (
        <MobileSearchOverlay 
          isOpen={showMobileSearch} 
          onClose={() => setShowMobileSearch(false)} 
        />
        )}

        {/* Neural Search Overlay - Mobile */}
        {showMobileSearch && (
        <MobileSearchOverlay 
          isOpen={showMobileSearch} 
          onClose={() => setShowMobileSearch(false)} 
        />
        )}

        <div className="flex items-center gap-2 md:gap-4">
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
              className="hidden sm:inline-flex rounded-xl px-8 py-6 font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Login
            </Button>
          )}

          {/* Mobile Right Sidebar Menu Button aligned perfectly at the very end */}
          <div className="md:hidden ml-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 shadow-md w-10 h-10 transition-all hover:scale-105 active:scale-95 animate-pulse-slow flex items-center justify-center p-0">
                   <Menu className="w-5 h-5 stroke-[2.5]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-background/95 backdrop-blur-3xl border-l-border/40 p-8 pt-16 flex flex-col z-[100]">
                <div className="space-y-8 flex-1">
                  <a href="/" className="flex items-center gap-2 mb-10">
                    <img src={logo} alt="Devfolio Logo" className="h-24 w-auto drop-shadow-md" />
                  </a>

                  <nav className="flex flex-col gap-6">
                    {["Use Cases", "Search", "Listing", "Pricing"].map((item) => (
                      <a
                        key={item}
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-2xl font-bold text-foreground hover:text-primary transition-all flex items-center justify-between group"
                      >
                        {item}
                        <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                      </a>
                    ))}
                    {!isLoggedIn && (
                      <a
                        onClick={() => navigate("/login")}
                        className="text-2xl font-bold text-primary hover:text-primary/80 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        Login
                        <ArrowUpRight className="w-6 h-6 text-primary opacity-50 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                      </a>
                    )}
                  </nav>

                  <div className="mt-12 p-6 rounded-3xl bg-secondary/20 border border-border/50 space-y-4">
                     <p className="text-sm font-semibold text-muted-foreground">Expert Ecosystem</p>
                     <Button onClick={() => navigate('/createcourse')} className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all text-sm">
                       Launch Course
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;