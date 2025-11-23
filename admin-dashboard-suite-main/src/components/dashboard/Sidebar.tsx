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
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  { icon: UserCog, label: "Expert Management", path: "/expert-management" },
  { icon: LayoutDashboard, label: "Templates", path: "/templates" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card shadow-xl z-50 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DevFolio</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-2 -mx-2 px-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

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

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary mt-4 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
