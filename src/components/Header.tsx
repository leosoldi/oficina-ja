import { useState } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl md:text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </Link>
          </div>
    
          {/* Mobile Header Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="touch-target p-2">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="touch-target p-2">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="touch-target p-2 text-gray-700 hover:text-blue-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/buscar-oficinas" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Buscar Oficinas
            </Link>
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
            {user ? (
              <>
                <span className="text-sm text-gray-700 font-medium">
                  Olá, {user.name || user.email}
                </span>
                <Button
                  asChild
                  className="bg-blue-800 hover:bg-blue-900 text-white"
                >
                  <Link to={user?.type === "motorista" ? "/dashboard-motorista" : "/dashboard-oficina"}>
                    Painel
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link to="/cadastro">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/buscar-oficinas"
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 touch-target transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar Oficinas
              </Link>
              <a
                href="#oficinas"
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 touch-target transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Para Oficinas
              </a>
              <a
                href="#como-funciona"
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 touch-target transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </a>
              <a
                href="#contato"
                className="text-gray-700 hover:text-blue-800 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 touch-target transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>

              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Button
                      asChild
                      className="bg-blue-800 hover:bg-blue-900 text-white touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/dashboard">Painel</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 touch-target"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="border-blue-800 text-blue-800 hover:bg-blue-50 touch-target"
                      asChild
                    >
                      <Link to="/login">Entrar</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-orange-500 hover:bg-orange-600 text-white touch-target"
                    >
                      <Link to="/cadastro">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
