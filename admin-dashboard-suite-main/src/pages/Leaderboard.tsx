import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Rahul Sharma", sales: 156000, change: 12, avatar: "RS", rank: 1 },
  { id: 2, name: "Priya Patel", sales: 142000, change: 8, avatar: "PP", rank: 2 },
  { id: 3, name: "Amit Kumar", sales: 138000, change: -3, avatar: "AK", rank: 3 },
  { id: 4, name: "Sneha Singh", sales: 125000, change: 15, avatar: "SS", rank: 4 },
  { id: 5, name: "Vikram Joshi", sales: 118000, change: 5, avatar: "VJ", rank: 5 },
  { id: 6, name: "Anjali Verma", sales: 112000, change: -2, avatar: "AV", rank: 6 },
  { id: 7, name: "Ravi Gupta", sales: 108000, change: 7, avatar: "RG", rank: 7 },
  { id: 8, name: "Neha Mehta", sales: 105000, change: 4, avatar: "NM", rank: 8 },
];

const Leaderboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sales Leaderboard</h1>
              <p className="text-muted-foreground">Top performing sales representatives</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leaderboardData[0].name}</div>
                  <p className="text-xs text-muted-foreground">₹{leaderboardData[0].sales.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Sales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹125,125</div>
                  <p className="text-xs text-muted-foreground">Per representative</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹10,04,000</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-muted-foreground w-8">
                          #{person.rank}
                        </div>
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{person.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ₹{person.sales.toLocaleString()} sales
                          </div>
                        </div>
                      </div>
                      <Badge variant={person.change > 0 ? "default" : "destructive"}>
                        {person.change > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(person.change)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
