import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", volume: 80, service: 50 },
  { month: "Feb", volume: 100, service: 60 },
  { month: "Mar", volume: 90, service: 55 },
  { month: "Apr", volume: 85, service: 50 },
  { month: "May", volume: 95, service: 58 },
  { month: "Jun", volume: 75, service: 45 },
];

const VolumeService = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Volume vs Service Level</h3>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-blue" />
            <span className="text-sm text-muted-foreground">Volume</span>
            <span className="text-sm font-bold text-foreground">1,125</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-green" />
            <span className="text-sm text-muted-foreground">Services</span>
            <span className="text-sm font-bold text-foreground">635</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
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
          <Bar dataKey="volume" fill="hsl(var(--chart-blue))" radius={[8, 8, 0, 0]} />
          <Bar dataKey="service" fill="hsl(var(--chart-green))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VolumeService;
