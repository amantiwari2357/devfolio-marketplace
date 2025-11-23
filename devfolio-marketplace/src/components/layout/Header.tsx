import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Edit, CheckCircle2, User } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Devfolio Logo" className="h-36 w-auto" />
            <span className="text-xl font-bold text-foreground hover:text-primary transition-colors"></span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <a href="/use-cases" className="text-sm text-foreground hover:text-primary transition-colors">
              Use Cases
            </a>
            <a href="/search" className="text-sm text-foreground hover:text-primary transition-colors">Search</a>
            <a href="/listing" className="text-sm text-foreground hover:text-primary transition-colors">Listing</a>
            <a href="/pricing" className="text-sm text-foreground hover:text-primary transition-colors">Pricing</a>
          </nav>
        </div>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full w-10 h-10 from-primary/10 to-primary-glow/10 hover:from-primary/20 hover:to-primary-glow/20 border border-primary/20 transition-all duration-300"
              >
                <Avatar>
                  <AvatarImage src={user ? getAvatarUrl(user.email) : "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} alt={user?.email || "User"} />
                  <AvatarFallback>
                    {user ? getInitials(user.email) : "US"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-popover/95 backdrop-blur-md shadow-lg border-border z-[100]">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/onboarding-status')} className="cursor-pointer">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                <span>Onboarding Status</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
           <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;