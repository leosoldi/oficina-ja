
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">OficinaJá</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/buscar-oficinas" className="text-gray-600 hover:text-blue-600 transition-colors">
              Buscar Oficinas
            </Link>
            <Link to="/cadastro" className="text-gray-600 hover:text-blue-600 transition-colors">
              Como Funciona
            </Link>
            <Link to="/cadastro" className="text-gray-600 hover:text-blue-600 transition-colors">
              Para Oficinas
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline">
                Entrar
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Cadastre-se
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
