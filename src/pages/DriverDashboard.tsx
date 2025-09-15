import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Car, 
  Star, 
  Clock, 
  Plus,
  Bell,
  User,
  Settings,
  ChevronRight,
  Wrench,
  FileText,
  CreditCard,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import { useAuth } from '@/contexts/AuthContext'; // ajuste o path se necessário

const DriverDashboard = () => {
  const [notifications] = useState(3);
    const { user, logout } = useAuth();

  const recentAppointments = [
    {
      id: 1,
      workshop: 'Auto Center Silva',
      service: 'Revisão Completa',
      date: '2024-06-08',
      time: '14:00',
      status: 'confirmed',
      address: 'Rua das Flores, 123',
      price: 'R$ 350,00'
    },
    {
      id: 2,
      workshop: 'Mecânica do João',
      service: 'Troca de Óleo',
      date: '2024-06-05',
      time: '09:30',
      status: 'completed',
      address: 'Av. Principal, 456',
      price: 'R$ 80,00'
    }
  ];

  const quickActions = [
    {
      title: 'Buscar Oficinas',
      description: 'Encontre as melhores oficinas próximas',
      icon: Search,
      href: '/buscar-oficinas',
      color: 'bg-blue-500'
    },
    {
      title: 'Novo Agendamento',
      description: 'Agende um serviço rapidamente',
      icon: Plus,
      href: '/driver/agendamento',
      color: 'bg-green-500'
    },
    {
      title: 'Meus Orçamentos',
      description: 'Visualize e aprove orçamentos',
      icon: FileText,
      href: '/driver/orcamentos',
      color: 'bg-purple-500'
    },
    {
      title: 'Meus Veículos',
      description: 'Gerencie seus veículos',
      icon: Car,
      href: '/driver/veiculos',
      color: 'bg-orange-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <DriverHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Olá, <span className="text-blue-600">{user.name}</span>! 👋
                </h1>
                <p className="text-gray-600">Como podemos ajudar você hoje?</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <Link to="/driver/perfil">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Vehicle Info */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Honda Civic 2020</h3>
                  <p className="text-sm text-gray-600">ABC-1234 • Próxima revisão em 2 meses</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Agendamentos Recentes</h2>
            <Link to="/driver/agendamentos">
              <Button variant="outline">
                Ver Todos
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{appointment.workshop}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">{appointment.service}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-gray-900">{appointment.price}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total de Serviços</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Valor Economizado</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 1.250</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Oficinas Visitadas</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
