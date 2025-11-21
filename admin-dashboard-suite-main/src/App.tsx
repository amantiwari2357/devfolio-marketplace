import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './test-project-creation';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Testimonials from "./pages/Testimonials";
import SalesReport from "./pages/SalesReport";
import Messages from "./pages/Messages";
import Enquiry from "./pages/Enquiry";
import RegisterUser from "./pages/RegisterUser";
import ProjectsManagement from "./pages/ProjectsManagement";
import Settings from "./pages/Settings";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import ClientOnboarding from "./pages/ClientOnboarding";
import ClientOffers from "./pages/ClientOffers";
import AdminOffers from "./pages/AdminOffers";
import ExpertManagement from "./pages/ExpertManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/projects-management" element={<ProjectsManagement />} />
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
          <Route path="/client-onboarding" element={<ClientOnboarding />} />
          <Route path="/settings" element={<Settings />} />
           <Route path="/client-offers" element={<ClientOffers />} />
          <Route path="/admin-offers" element={<AdminOffers />} />
          <Route path="/expert-management" element={<ExpertManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
