
import React, { useState } from 'react';
import { Menu, X, Car, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#motoristas" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Para Motoristas
            </a>
            <a href="#oficinas" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Para Oficinas
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Como Funciona
            </a>
            <a href="#contato" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Contato
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50" asChild>
              <a href="/login">Entrar</a>
            </Button>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <a href="/cadastro">Cadastrar</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-800">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#motoristas" className="text-gray-700 hover:text-blue-800 font-medium">
                Para Motoristas
              </a>
              <a href="#oficinas" className="text-gray-700 hover:text-blue-800 font-medium">
                Para Oficinas
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-800 font-medium">
                Como Funciona
              </a>
              <a href="#contato" className="text-gray-700 hover:text-blue-800 font-medium">
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50" asChild>
                  <a href="/login">Entrar</a>
                </Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <a href="/cadastro">Cadastrar</a>
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>
  );
};

export default Header;
