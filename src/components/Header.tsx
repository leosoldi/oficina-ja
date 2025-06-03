
import React, { useState } from 'react';
import { Menu, X, Car, Wrench, Home, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a href="/" className="text-xl md:text-2xl font-bold">
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
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-800 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <nav className="space-y-4">
                <a href="#motoristas" className="flex items-center space-x-3 text-gray-700 hover:text-blue-800 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Para Motoristas</span>
                </a>
                <a href="#oficinas" className="flex items-center space-x-3 text-gray-700 hover:text-blue-800 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <Wrench className="h-5 w-5" />
                  <span>Para Oficinas</span>
                </a>
                <a href="#como-funciona" className="flex items-center space-x-3 text-gray-700 hover:text-blue-800 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Como Funciona</span>
                </a>
                <a href="#contato" className="flex items-center space-x-3 text-gray-700 hover:text-blue-800 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Contato</span>
                </a>
              </nav>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-50 h-12 text-base" asChild>
                  <a href="/login">Entrar na Conta</a>
                </Button>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-base">
                  <a href="/cadastro">Cadastrar Agora</a>
                </Button>
              </div>

              {/* App-like Features */}
              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Baixe nosso app</h3>
                  <p className="text-sm text-gray-600 mb-3">Tenha acesso rápido a todas as funcionalidades</p>
                  <div className="flex space-x-2">
                    <div className="bg-white px-3 py-2 rounded-lg text-xs font-medium text-gray-700">
                      App Store
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg text-xs font-medium text-gray-700">
                      Google Play
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 py-2">
          <a href="/" className="flex flex-col items-center py-2 px-1 text-blue-800">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1 font-medium">Início</span>
          </a>
          <a href="#oficinas" className="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-blue-800 transition-colors">
            <Wrench className="h-5 w-5" />
            <span className="text-xs mt-1">Oficinas</span>
          </a>
          <a href="#motoristas" className="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-blue-800 transition-colors">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Motoristas</span>
          </a>
          <a href="/login" className="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-blue-800 transition-colors">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Conta</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
