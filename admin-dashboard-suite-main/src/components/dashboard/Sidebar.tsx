import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Link as LinkIcon,
  X,
  Trophy,
  Mail,
  Users,
  FolderKanban,
   Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", active: true },
  { icon: Users, label: "Register User", path: "/register-user" },
  { icon: Mail, label: "Enquiry", path: "/enquiry" },
  { icon: FolderKanban, label: "Projects", path: "/projects-management" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Trophy, label: "Availbilty", path: "/leaderboard" },
  { icon: Package, label: "Testimonial", path: "/products" },
  { icon: ShoppingCart, label: "Order", path: "/order" },
  { icon: FileText, label: "Sales Report", path: "/sales-report" },
  { icon: LayoutDashboard, label: "Schedule Meeting", path: "/schedule-meeting" },
  { icon: FolderKanban, label: "Client Onboarding", path: "/client-onboarding" },
   { icon: Gift, label: "Client Offers", path: "/client-offers" },
  { icon: Gift, label: "Admin Offers", path: "/admin-offers" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(open);

  // Update isOpen when open prop changes
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {open && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full lg:translate-x-0",
          "dark:border-gray-800 border-gray-200"
        )}
        style={{
          boxShadow: isOpen
            ? "4px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -4px rgba(0, 0, 0, 0.1)"
            : "none",
          transform: isOpen 
            ? 'translateX(0)' 
            : '-translate-x-full lg:translate-x-0',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          willChange: 'transform, box-shadow',
        }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-6 p-2">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                DevFolio
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto py-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent/50 text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => isMobile && onClose()}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-primary" : ""
                    )} 
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Pro Card */}
          <Card className="bg-primary text-primary-foreground p-6 mt-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <LinkIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">DevFolio Pro</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Get access to all features on DevFolio
            </p>
            <Button
              variant="secondary"
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Get Pro
            </Button>
          </Card>

          {/* User & Logout */}
          <div className="mt-auto pt-4 border-t dark:border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="truncate">Logout</span>
            </Button>
            
            {/* Mobile close button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center mt-2 text-xs text-muted-foreground hover:text-foreground lg:hidden"
                onClick={onClose}
              >
                Close Menu
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// Add default props
Sidebar.defaultProps = {
  open: false,
  onClose: () => {},
};

export default Sidebar;
