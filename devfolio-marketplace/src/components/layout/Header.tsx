import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logo from "../../../public/Images/logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Mock authentication: assume logged in with default role
      setIsLoggedIn(true);
      setUserRole('user'); // Default role, can be 'admin' if needed
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

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
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
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
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-sm text-muted-foreground">Aman Tiwari</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">amankumartiwari5255@gmail.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <p className="text-sm text-muted-foreground">{userRole}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
