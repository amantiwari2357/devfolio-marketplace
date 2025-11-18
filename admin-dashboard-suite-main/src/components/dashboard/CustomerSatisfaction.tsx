import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", lastMonth: 3200, thisMonth: 3000 },
  { month: "Feb", lastMonth: 3100, thisMonth: 3400 },
  { month: "Mar", lastMonth: 3300, thisMonth: 3200 },
  { month: "Apr", lastMonth: 3000, thisMonth: 3600 },
  { month: "May", lastMonth: 3400, thisMonth: 3300 },
  { month: "Jun", lastMonth: 3200, thisMonth: 3800 },
  { month: "Jul", lastMonth: 3600, thisMonth: 3500 },
  { month: "Aug", lastMonth: 3300, thisMonth: 4000 },
  { month: "Sep", lastMonth: 3700, thisMonth: 3900 },
  { month: "Oct", lastMonth: 3500, thisMonth: 4200 },
  { month: "Nov", lastMonth: 3900, thisMonth: 4100 },
  { month: "Dec", lastMonth: 3800, thisMonth: 4500 },
];

const CustomerSatisfaction = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Customer Satisfaction</h3>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-cyan" />
            <span className="text-sm text-muted-foreground">Last Month</span>
            <span className="text-sm font-bold text-foreground">$3,004</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-green" />
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="text-sm font-bold text-foreground">$4,504</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="lastMonth"
            stroke="hsl(var(--chart-cyan))"
            fill="hsl(var(--chart-cyan) / 0.2)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="thisMonth"
            stroke="hsl(var(--chart-green))"
            fill="hsl(var(--chart-green) / 0.2)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomerSatisfaction;
