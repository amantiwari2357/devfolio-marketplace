import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, LogOut, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logo from "../../../public/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { userAPI } from "@/services/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-primary/10 hover:bg-primary/20 border border-primary/20">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    View Profile
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Profile Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <p className="text-sm text-muted-foreground">{user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{user?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Country</label>
                      <p className="text-sm text-muted-foreground">{user?.country || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Currency</label>
                      <p className="text-sm text-muted-foreground">{user?.currency || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Expertise</label>
                      <p className="text-sm text-muted-foreground">{user?.expertise?.join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem onClick={handleEditProfile}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-foreground text-background hover:bg-foreground/90"
            onClick={() => window.location.href = "/login"}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
