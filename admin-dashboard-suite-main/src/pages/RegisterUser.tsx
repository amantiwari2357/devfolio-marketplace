import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, UserCheck, Loader2, X } from "lucide-react";

const RegisterUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/users/all');
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = (user) => {
    if (user.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserRole = (user) => {
    // You can add role logic here based on user data
    return 'Customer';
  };

  const getUserStatus = (user) => {
    return user.onboardingCompleted ? 'active' : 'pending';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col lg:ml-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading users...</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-500 mb-2">Error: {error}</p>
                  <button
                    onClick={fetchUsers}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => getUserStatus(u) === "active").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Week</CardTitle>
                <UserPlus className="h-4 w-4 text-chart-1" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => {
                    const userDate = new Date(u.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return userDate > weekAgo;
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">User List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="min-w-[200px]">Email</TableHead>
                        <TableHead className="w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="py-3 px-4">
                            <div className="text-sm">{user.email}</div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDialogOpen(true);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* User Details Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedUser && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="flex justify-between items-center">
                            <span>User Details</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="flex items-center gap-4 pb-4 border-b">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="" />
                              <AvatarFallback className="text-xl">
                                {getUserInitials(selectedUser)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {selectedUser.username || selectedUser.email.split('@')[0]}
                              </h3>
                              <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                              <Badge 
                                variant={getUserStatus(selectedUser) === "active" ? "default" : "secondary"} 
                                className="mt-2"
                              >
                                {getUserStatus(selectedUser).charAt(0).toUpperCase() + getUserStatus(selectedUser).slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h4>
                                <p>{selectedUser.whatsappNumber || 'N/A'}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Country</h4>
                                <p className="capitalize">{selectedUser.country || 'N/A'}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Currency</h4>
                                <p className="uppercase">{selectedUser.currency || 'N/A'}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Registration Date</h4>
                                <p>{formatDate(selectedUser.createdAt)}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedUser.expertise?.length > 0 ? (
                                    selectedUser.expertise.map((exp, index) => (
                                      <Badge key={index} variant="outline">
                                        {exp}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-muted-foreground">None</span>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Services</h4>
                                {selectedUser.services?.length > 0 ? (
                                  <div className="space-y-2">
                                    {selectedUser.services.map((service, index) => (
                                      <div key={index} className="p-2 border rounded">
                                        <div className="font-medium">{service.name}</div>
                                        {service.description && (
                                          <p className="text-sm text-muted-foreground">{service.description}</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">None</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {selectedUser.availability?.filter(day => day.enabled).length > 0 && (
                            <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium text-muted-foreground mb-3">Availability</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedUser.availability
                                  .filter(day => day.enabled)
                                  .map((day, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                                      <span className="font-medium">{day.day}</span>
                                      <span className="text-sm text-muted-foreground">
                                        {day.startTime} - {day.endTime}
                                      </span>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default RegisterUser;
