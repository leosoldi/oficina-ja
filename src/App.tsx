
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
import EditWorkshopProfile from "./pages/workshop/EditWorkshopProfile";
import WorkshopAppointments from "./pages/workshop/WorkshopAppointments";
import WorkshopServices from "./pages/workshop/WorkshopServices"
import WorkshopQuotes from "./pages/workshop/WorkshopQuotes";
import NewQuote from "./pages/workshop/NewQuote";
import EditQuote from "./pages/workshop/EditQuote";
import WorkshopChecklists from "./pages/workshop/WorkshopChecklists";
import DriverDashboard from "./pages/DriverDashboard";
import DriverProfile from "./pages/driver/DriverProfile";
import DriverQuotes from "./pages/driver/DriverQuotes";
import DriverVehicles from "./pages/driver/DriverVehicles";
import AddVehicle from "./pages/driver/AddVehicle";
import NotFound from "./pages/NotFound";
import AuthSuccess from "./pages/AuthSuccess";
import { AuthProvider } from "@/contexts/AuthContext"; 
import ChecklistExecution from "./pages/workshop/ChecklistExecution";
import ClientRegistration from "./pages/workshop/ClientRegistration"
import InviteClaim from "./pages/InviteClaim"




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/buscar-oficinas" element={<WorkshopSearch />} />
            <Route path="/oficina/:id" element={<WorkshopProfile />} />
            <Route path="/dashboard-oficina" element={<WorkshopDashboard />} />
            <Route path="/dashboard-motorista" element={<DriverDashboard />} />
            <Route path="/workshop/checklists" element={<WorkshopChecklists />} />
            <Route path="/workshop/checklists/:id" element={<ChecklistExecution />} />
            <Route path="/workshop/perfil" element={<EditWorkshopProfile />} />
            <Route path="/workshop/cadastro-cliente" element={<ClientRegistration />} />
            <Route path="/workshop/agendamentos" element={<WorkshopAppointments />} />
            <Route path="/workshop/servicos" element={<WorkshopServices />} />
            <Route path="/workshop/orcamentos" element={<WorkshopQuotes />} />
            <Route path="/workshop/orcamentos/novo" element={<NewQuote />} />
            <Route path="/workshop/orcamentos/editar/:id" element={<EditQuote />} />
            <Route path="/workshop/checklists" element={<WorkshopChecklists />} />
            <Route path="/driver/perfil" element={<DriverProfile />} />
            <Route path="/driver/orcamentos" element={<DriverQuotes />} />
            <Route path="/driver/veiculos" element={<DriverVehicles />} />
            <Route path="/driver/adicionar-veiculo" element={<AddVehicle />} />
            <Route path="/convite/:token" element={<InviteClaim />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
