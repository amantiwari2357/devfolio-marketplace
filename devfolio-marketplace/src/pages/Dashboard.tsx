import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Users, TrendingUp, Settings, Home as HomeIcon, BookOpen, MessageSquare, Code, School, Briefcase } from "lucide-react";
import api from "@/services/api";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7D");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-screen p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <div>
              <p className="font-bold text-sm">Creator Dashboard</p>
              <p className="text-xs text-muted-foreground">{user?.email?.split('@')[0] || 'user'}</p>
            </div>
          </div>

          <Button className="w-full mb-6 bg-foreground text-background hover:bg-foreground/90">
            Publish on Socials
          </Button>

          <nav className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Manage</p>
            <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent text-accent-foreground">
              <HomeIcon className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Bookings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Priority DM</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Services</span>
            </a>
            
            <p className="text-xs font-semibold text-muted-foreground mt-6 mb-2">Your Page</p>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Analytics</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Hi, {user?.firstName || 'User'}</h1>
              <Button variant="outline">
                devfolio-marketplace.io/{user?.email?.split('@')[0] || 'profile'}
              </Button>
            </div>

            {/* Progress Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold mb-2">Make the page yours!</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock the potential of your devfolio-marketplace page
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-primary-foreground">✓</span>
                    </div>
                    <span className="text-sm">Add availability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border"></div>
                    <span className="text-sm">Complete your profile</span>
                  </div>
                  <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90">
                    Complete your profile
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold mb-2">Get inspired</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out how similar profiles are leveraging devfolio-marketplace
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-card-purple to-card-blue"></div>
                    <span className="text-sm font-medium">Neal Bridges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-card-green to-card-cyan"></div>
                    <span className="text-sm font-medium">Jay Jay Davey</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-card-pink to-card-purple"></div>
                    <span className="text-sm font-medium">Matthew Rosenquist</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Course Promotion */}
            <Card className="mb-8 bg-dark-section text-dark-foreground border-none overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">Launch Your Course</h2>
                <p className="text-lg mb-2">Hit ₹50K in sales this October.</p>
                <p className="text-lg mb-6">Pay 0% commission.</p>
                <div className="flex gap-4">
                  <Button className="bg-background text-foreground hover:bg-background/90">
                    Create Course
                  </Button>
                  <Button variant="outline" className="border-dark-foreground/20 text-dark-foreground hover:bg-dark-foreground/10">
                    Contact us
                  </Button>
                </div>
              </div>
            </Card>

            {/* Analytics */}
            <div className="mb-6 flex gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Visits</p>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold">0</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Earnings</p>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold">$0</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Sales</p>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold">0</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Conversion</p>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold">0%</p>
              </Card>
            </div>

            <Card className="p-12 bg-card border-border text-center">
              <p className="text-xl font-semibold mb-2">No Data Available</p>
              <p className="text-muted-foreground">No analytics data found for the selected time period.</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
