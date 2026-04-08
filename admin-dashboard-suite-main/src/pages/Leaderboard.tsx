import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Calendar, Clock, User } from "lucide-react";

const Leaderboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/availabilities');
      const data = await response.json();

      if (data.success) {
        setAvailabilities(data.availabilities);
      } else {
        setError('Failed to fetch availabilities');
      }
    } catch (err) {
      setError('Error fetching data');
      console.error('Error fetching availabilities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Transform availabilities data into leaderboard format
  const leaderboardData = availabilities.map((booking, index) => ({
    id: booking._id,
    name: booking.userName,
    date: new Date(booking.date).toLocaleDateString(),
    time: booking.time,
    serviceType: booking.serviceType,
    status: booking.status,
    avatar: booking.userName.split(' ').map(n => n[0]).join('').toUpperCase(),
    rank: index + 1
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex overflow-hidden">
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
          <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          </header>
          <main className="flex-1 pt-24 pb-6 px-6 flex items-center justify-center">
            <div className="text-center">Loading availabilities...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex overflow-hidden">
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
          <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          </header>
          <main className="flex-1 pt-24 pb-6 px-6 flex items-center justify-center">
            <div className="text-center text-red-500">Error: {error}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>
        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            
            {/* Page Header */}
            <div>
              <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Booking Registry</h1>
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Appointment Sequencing Matrix</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Total</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">L_{availabilities.length}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Lifecycle Bookings</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-yellow-500 italic">
                    {availabilities.filter(b => b.status === 'pending').length}
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Awaiting Lock-in</p>
                </CardContent>
              </Card>

              <Card className="col-span-2 lg:col-span-1 border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">System / Verified</CardTitle>
                  <User className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-green-500 italic">
                    {availabilities.filter(b => b.status === 'confirmed').length}
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Active Core Protocols</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 shadow-md overflow-hidden">
              <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Registry / Details View</CardTitle>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Sequential Booking Logs</p>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {leaderboardData.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No bookings found
                    </div>
                  ) : (
                    leaderboardData.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-muted-foreground/40 w-8 italic">
                            #{booking.rank.toString().padStart(2, '0')}
                          </div>
                          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarImage src="" />
                            <AvatarFallback className="font-bold text-xs">{booking.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-sm uppercase tracking-tight italic">{booking.name}</div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-tighter flex items-center gap-2">
                              <span>{booking.date}</span>
                              <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                              <span>{booking.time}</span>
                            </div>
                            <div className="text-[10px] text-primary/60 font-bold uppercase tracking-[0.1em] mt-0.5">
                              {booking.serviceType}
                            </div>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(booking.status)} className="font-black uppercase italic tracking-widest text-[10px] px-2 py-0.5">
                          {booking.status}
                        </Badge>
                      </div>
                    ))
                  )}
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
