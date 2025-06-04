
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkshopSearch from "./pages/WorkshopSearch";
import WorkshopProfile from "./pages/WorkshopProfile";
import NotFound from "./pages/NotFound";
import WorkshopDashboard from "./pages/WorkshopDashboard";
import WorkshopProfileConfig from "./pages/workshop/WorkshopProfile";
import WorkshopServices from "./pages/workshop/WorkshopServices";
import WorkshopAppointments from "./pages/workshop/WorkshopAppointments";
import WorkshopChecklists from "./pages/workshop/WorkshopChecklists";
import WorkshopQuotes from "./pages/workshop/WorkshopQuotes";
import WorkshopHistory from "./pages/workshop/WorkshopHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buscar-oficinas" element={<WorkshopSearch />} />
          <Route path="/oficina/:id" element={<WorkshopProfile />} />
          
          {/* Workshop Dashboard Routes */}
          <Route path="/workshop/dashboard" element={<WorkshopDashboard />} />
          <Route path="/workshop/profile" element={<WorkshopProfileConfig />} />
          <Route path="/workshop/services" element={<WorkshopServices />} />
          <Route path="/workshop/appointments" element={<WorkshopAppointments />} />
          <Route path="/workshop/checklists" element={<WorkshopChecklists />} />
          <Route path="/workshop/quotes" element={<WorkshopQuotes />} />
          <Route path="/workshop/history" element={<WorkshopHistory />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
