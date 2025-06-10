
import React from 'react';
import { Home, Search, Calendar, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Início', href: '/' },
    { icon: Search, label: 'Buscar', href: '/buscar-oficinas' },
    { icon: Calendar, label: 'Agenda', href: '/login' },
    { icon: User, label: 'Perfil', href: '/login' },
    { icon: Settings, label: 'Config', href: '/login' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center touch-target p-2 min-w-0 h-auto ${
              location.pathname === item.href
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            asChild
          >
            <Link to={item.href} className="flex flex-col items-center gap-1">
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium leading-none">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
