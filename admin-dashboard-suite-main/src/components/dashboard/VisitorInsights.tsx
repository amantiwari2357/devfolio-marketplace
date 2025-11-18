import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", loyal: 250, new: 200, unique: 180 },
  { month: "Feb", loyal: 280, new: 240, unique: 220 },
  { month: "Mar", loyal: 320, new: 280, unique: 260 },
  { month: "Apr", loyal: 300, new: 320, unique: 290 },
  { month: "May", loyal: 350, new: 300, unique: 310 },
  { month: "Jun", loyal: 380, new: 350, unique: 340 },
  { month: "Jul", loyal: 420, new: 380, unique: 370 },
  { month: "Aug", loyal: 390, new: 420, unique: 390 },
  { month: "Sept", loyal: 450, new: 390, unique: 410 },
  { month: "Oct", loyal: 410, new: 430, unique: 380 },
  { month: "Nov", loyal: 380, new: 410, unique: 400 },
  { month: "Dec", loyal: 420, new: 380, unique: 390 },
];

const VisitorInsights = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Visitor Insights</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Legend />
          <Line
            type="monotone"
            dataKey="loyal"
            stroke="hsl(var(--chart-purple))"
            strokeWidth={2}
            name="Loyal Customers"
          />
          <Line
            type="monotone"
            dataKey="new"
            stroke="hsl(var(--chart-red))"
            strokeWidth={2}
            name="New Customers"
          />
          <Line
            type="monotone"
            dataKey="unique"
            stroke="hsl(var(--chart-green))"
            strokeWidth={2}
            name="Unique Customers"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VisitorInsights;
