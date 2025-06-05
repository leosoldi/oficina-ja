
import React from 'react';
import { Home, Search, Calendar, User, Settings, Car, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';

const MobileBottomNav = () => {
  const location = useLocation();
  
  // Define navigation based on current route
  const getNavItems = () => {
    const path = location.pathname;
    
    // Driver navigation
    if (path.includes('/driver')) {
      return [
        { icon: Home, label: 'Início', href: '/dashboard-motorista', active: path === '/dashboard-motorista' },
        { icon: Car, label: 'Veículos', href: '/driver/veiculos', active: path.includes('/driver/veiculos') || path.includes('/driver/adicionar-veiculo') },
        { icon: Search, label: 'Buscar', href: '/buscar-oficinas', active: path === '/buscar-oficinas' },
        { icon: Calendar, label: 'Orçamentos', href: '/driver/orcamentos', active: path === '/driver/orcamentos' },
        { icon: User, label: 'Perfil', href: '/driver/perfil', active: path === '/driver/perfil' },
      ];
    }
    
    // Workshop navigation
    if (path.includes('/workshop')) {
      return [
        { icon: Home, label: 'Início', href: '/dashboard-oficina', active: path === '/dashboard-oficina' },
        { icon: Calendar, label: 'Agenda', href: '/workshop/agendamentos', active: path === '/workshop/agendamentos' },
        { icon: Wrench, label: 'Orçamentos', href: '/workshop/orcamentos', active: path.includes('/workshop/orcamentos') },
        { icon: Settings, label: 'Checklists', href: '/workshop/checklists', active: path === '/workshop/checklists' },
        { icon: User, label: 'Perfil', href: '/workshop/perfil', active: path === '/workshop/perfil' },
      ];
    }
    
    // Default navigation
    return [
      { icon: Home, label: 'Início', href: '/', active: path === '/' },
      { icon: Search, label: 'Buscar', href: '/buscar-oficinas', active: path === '/buscar-oficinas' },
      { icon: Calendar, label: 'Agenda', href: '/agenda', active: path === '/agenda' },
      { icon: User, label: 'Perfil', href: '/perfil', active: path === '/perfil' },
      { icon: Settings, label: 'Config', href: '/config', active: path === '/config' },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-bottom z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center touch-target p-2 min-w-0 h-auto transition-all duration-200 ${
              item.active 
                ? 'text-blue-600 bg-blue-50 scale-105' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            asChild
          >
            <Link to={item.href} className="flex flex-col items-center gap-1">
              <item.icon className={`h-5 w-5 transition-transform duration-200 ${item.active ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium leading-none">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
