import { OfferStatus } from "@/store/offersStore";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Sparkles, Circle } from "lucide-react";

interface StatusBadgeProps {
  status: OfferStatus;
  className?: string;
}

const statusConfig = {
  assigned: {
    label: "Assigned",
    variant: "default" as const,
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
    icon: Circle,
  },
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20",
    icon: Clock,
  },
  used: {
    label: "Used",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
    icon: CheckCircle,
  },
  expired: {
    label: "Expired",
    variant: "default" as const,
    className: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20",
    icon: XCircle,
  },
  converted: {
    label: "Converted",
    variant: "default" as const,
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
    icon: Sparkles,
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${className} flex items-center gap-1.5 transition-all duration-200`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};