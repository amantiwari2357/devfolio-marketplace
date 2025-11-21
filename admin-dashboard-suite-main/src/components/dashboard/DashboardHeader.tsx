import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const languages = [
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "hi", name: "Hindi (India)", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
];

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };
  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          {/* <h1 className="text-2xl font-bold text-foreground">Dashboard</h1> */}
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search here..."
              className="pl-10 bg-secondary/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="hidden md:relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-lg">
                {languages.find(lang => lang.name === selectedLanguage)?.flag || "🇺🇸"}
              </span>
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showLanguageDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-md shadow-lg py-2 min-w-[160px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-chart-orange rounded-full" />
          </Button>

          {/* User profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar>
              <AvatarImage src={user ? getAvatarUrl(user.email) : "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} />
              <AvatarFallback>{user ? getInitials(user.email) : "MA"}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">
                {user ? user.email.split('@')[0] : "Aman"}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user ? user.role : "Admin"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
