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
        
        <main className="flex-1 p-4 lg:p-8 space-y-10 md:space-y-12">
          <div>
            <SalesCards />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10 animate-slide-up">
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">V_Insights node</h2>
              </div>
              <VisitorInsights />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Target Reality</h2>
              </div>
              <TargetReality />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Revenue Ledger</h2>
              </div>
              <TotalRevenue />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Client Sentiments</h2>
              </div>
              <CustomerSatisfaction />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 pb-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Inventory Priority</h2>
              </div>
              <TopProducts />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Global Mapping</h2>
              </div>
              <SalesMapping />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 px-1">
                 <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase">Volume Node Service</h2>
              </div>
              <VolumeService />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
