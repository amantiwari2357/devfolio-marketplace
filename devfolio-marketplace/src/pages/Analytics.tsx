import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Eye, Clock, Calendar, Download } from "lucide-react";
import api from "@/services/api";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    topPages: [],
    trafficSources: [],
    dailyStats: []
  });
  const [timeRange, setTimeRange] = useState("7D");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(`/analytics?period=${timeRange}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Track your profile performance and insights</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {["7D", "30D", "3M", "6M"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Views</p>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{analytics.totalViews.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+12% from last period</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Unique Visitors</p>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+8% from last period</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg. Session</p>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{analytics.avgSessionDuration}m</p>
            <p className="text-xs text-red-600 mt-1">-2% from last period</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">3.2%</p>
            <p className="text-xs text-green-600 mt-1">+0.5% from last period</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Top Performing Pages</h3>
            <div className="space-y-4">
              {analytics.topPages.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No page data available</p>
              ) : (
                analytics.topPages.map((page: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{page.name}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{page.views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Traffic Sources */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {analytics.trafficSources.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No traffic data available</p>
              ) : (
                analytics.trafficSources.map((source: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xs font-bold">{source.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{source.percentage}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Daily Stats Chart Placeholder */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Daily Performance</h3>
          {analytics.dailyStats.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No daily statistics available for the selected period.</p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would go here</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
