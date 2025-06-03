
import React from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Search, Calendar, FileText, Clock, MapPin, Plus } from 'lucide-react';

const DriverDashboard = () => {
  const quickActions = [
    { icon: Search, label: 'Buscar Oficina', href: '/buscar', color: 'bg-blue-500' },
    { icon: Calendar, label: 'Agendar Serviço', href: '/buscar', color: 'bg-green-500' },
    { icon: FileText, label: 'Ver Orçamentos', href: '/orcamentos', color: 'bg-orange-500' },
    { icon: Clock, label: 'Acompanhar', href: '/acompanhar', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Olá, João! 👋
            </h1>
            <p className="text-gray-600">Gerencie seu veículo e encontre as melhores oficinas</p>
          </div>

          {/* Vehicle Card */}
          <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Car className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Honda Civic 2020</h3>
                    <p className="text-blue-100">ABC-1234 • 45.000 km</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
                  <a href="/veiculo">
                    <Plus className="h-4 w-4 mr-2" />
                    Gerenciar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-white hover:shadow-lg transition-all duration-300"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`${action.color} p-3 rounded-full text-white`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Revisão Concluída</p>
                    <p className="text-sm text-gray-600">Auto Center Silva • 15/05/2024</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Orçamento Pendente</p>
                    <p className="text-sm text-gray-600">Mecânica do João • R$ 350,00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default DriverDashboard;
