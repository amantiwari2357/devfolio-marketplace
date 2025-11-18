import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

const products = [
  { id: 1, name: "iPhone 14 Pro", category: "Electronics", price: 125000, stock: 45, status: "In Stock" },
  { id: 2, name: "MacBook Air M2", category: "Electronics", price: 98000, stock: 12, status: "Low Stock" },
  { id: 3, name: "iPad Pro", category: "Electronics", price: 75000, stock: 28, status: "In Stock" },
  { id: 4, name: "AirPods Pro", category: "Accessories", price: 24900, stock: 0, status: "Out of Stock" },
  { id: 5, name: "Apple Watch", category: "Wearables", price: 42000, stock: 35, status: "In Stock" },
  { id: 6, name: "Samsung Galaxy S23", category: "Electronics", price: 89000, stock: 8, status: "Low Stock" },
];

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      "In Stock": "default",
      "Low Stock": "secondary",
      "Out of Stock": "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹4,53,900</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                  <AlertCircle className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="font-semibold">₹{product.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Price</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{product.stock}</div>
                          <div className="text-sm text-muted-foreground">Stock</div>
                        </div>
                        <div className="w-28">
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
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

export default Products;
