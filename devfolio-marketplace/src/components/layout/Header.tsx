import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
  import logo from "../../../public/Images/logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can replace this with actual auth logic)
    const checkAuth = () => {
      // For now, checking if we're on dashboard page as a simple check
      setIsLoggedIn(window.location.pathname === "/dashboard");
    };
    checkAuth();
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
        
        <Button 
          className="bg-foreground text-background hover:bg-foreground/90"
          onClick={() => window.location.href = isLoggedIn ? "/dashboard" : "/login"}
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
