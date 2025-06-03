
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DriverDashboard from "./pages/DriverDashboard";
import VehicleManagement from "./pages/VehicleManagement";
import WorkshopSearch from "./pages/WorkshopSearch";
import WorkshopProfile from "./pages/WorkshopProfile";
import ServiceScheduling from "./pages/ServiceScheduling";
import BudgetManagement from "./pages/BudgetManagement";
import ServiceTracking from "./pages/ServiceTracking";
import ServiceHistory from "./pages/ServiceHistory";

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
          <Route path="/dashboard" element={<DriverDashboard />} />
          <Route path="/veiculo" element={<VehicleManagement />} />
          <Route path="/buscar" element={<WorkshopSearch />} />
          <Route path="/oficina/:id" element={<WorkshopProfile />} />
          <Route path="/agendar/:workshopId" element={<ServiceScheduling />} />
          <Route path="/orcamentos" element={<BudgetManagement />} />
          <Route path="/acompanhar" element={<ServiceTracking />} />
          <Route path="/historico" element={<ServiceHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
