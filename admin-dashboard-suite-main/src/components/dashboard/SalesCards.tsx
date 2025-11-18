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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Today's Sales</h2>
          <p className="text-sm text-muted-foreground">Sales Summary</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesCards;
