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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", active: true },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: ShoppingCart, label: "Order", path: "/order" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: FileText, label: "Sales Report", path: "/sales-report" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Mail, label: "Enquiry", path: "/enquiry" },
  { icon: Users, label: "Register User", path: "/register-user" },
  { icon: FolderKanban, label: "Projects", path: "/projects-management" },
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
              <span className="text-xl font-bold text-foreground">Dabang</span>
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
          <nav className="flex-1 space-y-2">
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
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Pro Card */}
          <Card className="bg-primary text-primary-foreground p-6 mt-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <LinkIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dabang Pro</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Get access to all features on Dabang
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
