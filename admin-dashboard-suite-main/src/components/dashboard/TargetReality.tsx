import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Target, TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 65 },
  { month: "Apr", value: 90 },
  { month: "May", value: 75 },
  { month: "Jun", value: 95 },
  { month: "Jul", value: 85 },
];

const TargetReality = () => {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-bold text-foreground mb-6">Target vs Reality</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--chart-yellow))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="space-y-3 mt-6">
        <div className="flex items-center justify-between p-3 bg-chart-cyan/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-chart-cyan/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-cyan" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Reality Sales</p>
              <p className="text-xs text-muted-foreground">Global</p>
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">8,823</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-chart-yellow/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-chart-yellow/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-chart-yellow" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Target Sales</p>
              <p className="text-xs text-muted-foreground">Commercial</p>
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">12,122</span>
        </div>
      </div>
    </Card>
  );
};

export default TargetReality;
