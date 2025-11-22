import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import PriorityDM from "./pages/PriorityDM";
import Services from "./pages/Services";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import Onboarding from "./pages/Onboarding";
import UseCases from "./pages/UseCases";
import Search from "./pages/Search";
import Listing from "./pages/Listing";
import Pricing from "./pages/Pricing";
import CreateCourse from "./pages/CreateCourse";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import ProjectDetail from "./pages/ProjectDetail";
import Profile from "./pages/Profile";
import OnboardingStatus from "./pages/OnboardingStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/priority-dm" element={<PriorityDM />} />
          <Route path="/services" element={<Services />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding-status" element={<OnboardingStatus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;