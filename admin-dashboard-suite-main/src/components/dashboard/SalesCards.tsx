import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, TrendingUp, Users, Download } from "lucide-react";

const stats = [
  {
    icon: ShoppingBag,
    value: "$1k",
    label: "Total Sales",
    change: "+8% from yesterday",
    color: "bg-chart-pink/10 text-chart-pink",
  },
  {
    icon: Package,
    value: "300",
    label: "Total Order",
    change: "+5% from yesterday",
    color: "bg-chart-orange/10 text-chart-orange",
  },
  {
    icon: TrendingUp,
    value: "5",
    label: "Product Sold",
    change: "+1.2% from yesterday",
    color: "bg-chart-green/10 text-chart-green",
  },
  {
    icon: Users,
    value: "8",
    label: "New Customers",
    change: "0.5% from yesterday",
    color: "bg-chart-purple/10 text-chart-purple",
  },
];

const SalesCards = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground italic uppercase">Today's Sales</h2>
          <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Node Sales Summary</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-10 px-4 rounded-xl border-border/50 font-bold text-[10px] uppercase tracking-widest w-full sm:w-auto">
          <Download className="w-3.5 h-3.5" />
          Export Core Data
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 md:p-6 hover:shadow-lg transition-shadow border-border/50">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <div className="space-y-0.5 md:space-y-1">
              <h3 className="text-xl md:text-3xl font-bold text-foreground leading-tight">{stat.value}</h3>
              <p className="text-[10px] md:text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-[9px] md:text-xs text-primary font-semibold">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesCards;
