import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SalesCards from "@/components/dashboard/SalesCards";
import VisitorInsights from "@/components/dashboard/VisitorInsights";
import TotalRevenue from "@/components/dashboard/TotalRevenue";
import CustomerSatisfaction from "@/components/dashboard/CustomerSatisfaction";
import TargetReality from "@/components/dashboard/TargetReality";
import TopProducts from "@/components/dashboard/TopProducts";
import SalesMapping from "@/components/dashboard/SalesMapping";
import VolumeService from "@/components/dashboard/VolumeService";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          <SalesCards />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <VisitorInsights />
            </div>
            <div>
              <TargetReality />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TotalRevenue />
            <CustomerSatisfaction />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <TopProducts />
            <SalesMapping />
            <VolumeService />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
