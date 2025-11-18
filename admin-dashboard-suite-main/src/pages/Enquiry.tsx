import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Phone, Clock } from "lucide-react";

const enquiries = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 98765 43210", message: "Interested in bulk order", status: "pending", date: "2024-01-18" },
  { id: 2, name: "Anita Desai", email: "anita@example.com", phone: "+91 98765 43211", message: "Need product demo", status: "replied", date: "2024-01-17" },
  { id: 3, name: "Suresh Yadav", email: "suresh@example.com", phone: "+91 98765 43212", message: "Pricing inquiry for enterprise", status: "pending", date: "2024-01-17" },
  { id: 4, name: "Kavita Sharma", email: "kavita@example.com", phone: "+91 98765 43213", message: "Technical support needed", status: "replied", date: "2024-01-16" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 43214", message: "Partnership opportunity", status: "pending", date: "2024-01-16" },
];

const Enquiry = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Enquiries</h1>
              <p className="text-muted-foreground">Manage customer enquiries and requests</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enquiries.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enquiries.filter(e => e.status === "pending").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Replied</CardTitle>
                  <Phone className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enquiries.filter(e => e.status === "replied").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enquiries.map((enquiry) => (
                      <TableRow key={enquiry.id}>
                        <TableCell className="font-medium">{enquiry.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {enquiry.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {enquiry.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{enquiry.message}</TableCell>
                        <TableCell>{enquiry.date}</TableCell>
                        <TableCell>
                          <Badge variant={enquiry.status === "pending" ? "secondary" : "default"}>
                            {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Enquiry;
