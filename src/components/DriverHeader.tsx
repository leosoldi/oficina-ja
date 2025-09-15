
import React, { useState } from 'react';
import { Menu, X, Car, Bell, User, Settings, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // ajuste o path se necessário


const DriverHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const { user, logout } = useAuth();


  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/dashboard-motorista" className="text-xl md:text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </Link>
          </div>

          {/* Mobile Header Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-gray-700 hover:text-blue-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                <p className="text-gray-500">{user?.type === 'motorista' ? 'Motorista' : 'Oficina'}</p>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link to="/driver/perfil">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/buscar-oficinas" 
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5 mr-3" />
                Buscar Oficinas
              </Link>
              <Link 
                to="/driver/agendamentos" 
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-5 w-5 mr-3" />
                Meus Agendamentos
              </Link>
              <Link 
                to="/driver/orcamentos" 
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-5 w-5 mr-3" />
                Meus Orçamentos
              </Link>
              <Link 
                to="/driver/veiculos" 
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-5 w-5 mr-3" />
                Meus Veículos
              </Link>
              <Link 
                to="/driver/historico" 
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-5 w-5 mr-3" />
                Histórico
              </Link>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link 
                  to="/driver/perfil" 
                  className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Meu Perfil
                </Link>
                <Link 
                  to="/driver/configuracoes" 
                  className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Configurações
                </Link>
                <button 
                  className="w-full text-left text-red-600 hover:text-red-800 font-medium py-3 px-2 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sair
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default DriverHeader;
