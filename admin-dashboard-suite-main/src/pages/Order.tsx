import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const orders = [
  { id: "#ORD-001", customer: "Rahul Sharma", product: "iPhone 14 Pro", amount: 125000, status: "delivered", date: "2024-01-15" },
  { id: "#ORD-002", customer: "Priya Patel", product: "MacBook Air M2", amount: 98000, status: "pending", date: "2024-01-16" },
  { id: "#ORD-003", customer: "Amit Kumar", product: "iPad Pro", amount: 75000, status: "processing", date: "2024-01-16" },
  { id: "#ORD-004", customer: "Sneha Singh", product: "AirPods Pro", amount: 24900, status: "delivered", date: "2024-01-17" },
  { id: "#ORD-005", customer: "Vikram Joshi", product: "Apple Watch", amount: 42000, status: "cancelled", date: "2024-01-17" },
  { id: "#ORD-006", customer: "Anjali Verma", product: "Samsung Galaxy S23", amount: 89000, status: "processing", date: "2024-01-18" },
];

const Order = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any }> = {
      delivered: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      processing: { variant: "outline", icon: Package },
      cancelled: { variant: "destructive", icon: XCircle },
    };
    
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">

            {/* Page Header */}
            <div>
              <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Fulfillment Stream</h1>
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Real-time Order Processing & Logistics Matrix</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Total</CardTitle>
                  <Package className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">O_6</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Lifecycle Units</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Finalized</CardTitle>
                  <CheckCircle className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-2 italic">D_2</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Confirmed Delivery</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Queue / Processing</CardTitle>
                  <Clock className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-3 italic">P_3</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">In-Stream Ops</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Alert / Cancelled</CardTitle>
                  <XCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-destructive italic">C_1</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Terminal State</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 shadow-md overflow-hidden">
              <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Data Grid / Recent Fulfillment</CardTitle>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Dynamic Order Tracking Table</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="border-b border-border/50 hover:bg-transparent">
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Protocol_ID</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Stakeholder</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Product_Node</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Value_Matrix</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Timestamp</TableHead>
                        <TableHead className="font-black uppercase tracking-widest text-[10px] italic py-4">Condition</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors group">
                          <TableCell className="font-mono text-xs font-bold text-primary/70">{order.id}</TableCell>
                          <TableCell className="font-black text-xs uppercase tracking-tight italic">{order.customer}</TableCell>
                          <TableCell className="text-xs font-medium text-foreground">{order.product}</TableCell>
                          <TableCell className="font-black text-xs italic tracking-tighter">₹{order.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-[10px] font-bold text-muted-foreground uppercase">{order.date}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Order;
