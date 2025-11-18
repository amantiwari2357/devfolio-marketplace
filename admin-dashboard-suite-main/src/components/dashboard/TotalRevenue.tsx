import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Monday", online: 15, offline: 12 },
  { day: "Tuesday", online: 18, offline: 15 },
  { day: "Wednesday", online: 12, offline: 20 },
  { day: "Thursday", online: 22, offline: 18 },
  { day: "Friday", online: 17, offline: 14 },
  { day: "Saturday", online: 20, offline: 16 },
  { day: "Sunday", online: 25, offline: 19 },
];

const TotalRevenue = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Total Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="online" fill="hsl(var(--chart-cyan))" name="Online Sales" radius={[8, 8, 0, 0]} />
          <Bar dataKey="offline" fill="hsl(var(--chart-green))" name="Offline Sales" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TotalRevenue;
