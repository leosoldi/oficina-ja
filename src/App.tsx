
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
import WorkshopDashboard from "./pages/WorkshopDashboard";
import WorkshopProfilePage from "./pages/workshop/WorkshopProfile";
import WorkshopAppointments from "./pages/workshop/WorkshopAppointments";
import WorkshopQuotes from "./pages/workshop/WorkshopQuotes";
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
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buscar-oficinas" element={<WorkshopSearch />} />
          <Route path="/oficina/:id" element={<WorkshopProfile />} />
          <Route path="/dashboard-oficina" element={<WorkshopDashboard />} />
          <Route path="/workshop/perfil" element={<WorkshopProfilePage />} />
          <Route path="/workshop/agendamentos" element={<WorkshopAppointments />} />
          <Route path="/workshop/orcamentos" element={<WorkshopQuotes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
