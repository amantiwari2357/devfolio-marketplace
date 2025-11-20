import { Card } from "@/components/ui/card";
import { AssignedOffer } from "@/store/offersStore";
import { Gift, CheckCircle, Clock, XCircle } from "lucide-react";

interface StatsCardsProps {
  assignedOffers: AssignedOffer[];
}

export const StatsCards = ({ assignedOffers }: StatsCardsProps) => {
  const stats = {
    total: assignedOffers.length,
    active: assignedOffers.filter((o) => o.status === 'active' || o.status === 'assigned').length,
    used: assignedOffers.filter((o) => o.status === 'used' || o.status === 'converted').length,
    expired: assignedOffers.filter((o) => o.status === 'expired').length,
  };

  const cards = [
    {
      title: "Total Offers",
      value: stats.total,
      icon: Gift,
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Offers",
      value: stats.active,
      icon: Clock,
      gradient: "from-yellow-500/10 to-yellow-600/5",
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Used Offers",
      value: stats.used,
      icon: CheckCircle,
      gradient: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Expired Offers",
      value: stats.expired,
      icon: XCircle,
      gradient: "from-red-500/10 to-red-600/5",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
            <div className="relative p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {card.value}
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};