
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DriverHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard-motorista" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">OficinaJá</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard-motorista" className="text-gray-600 hover:text-orange-500 transition-colors">
              Dashboard
            </Link>
            <Link to="/driver/veiculos" className="text-gray-600 hover:text-orange-500 transition-colors">
              Meus Veículos
            </Link>
            <Link to="/driver/orcamentos" className="text-gray-600 hover:text-orange-500 transition-colors">
              Orçamentos
            </Link>
            <Link to="/buscar-oficinas" className="text-gray-600 hover:text-orange-500 transition-colors">
              Buscar Oficinas
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/driver/perfil">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
