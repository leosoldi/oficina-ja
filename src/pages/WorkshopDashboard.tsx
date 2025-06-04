
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  Car, 
  FileText, 
  Settings, 
  CheckCircle,
  TrendingUp,
  DollarSign,
  Activity,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopDashboard = () => {
  const todayAppointments = [
    { id: 1, time: '08:00', client: 'João Silva', vehicle: 'Honda Civic 2020', service: 'Revisão', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Maria Santos', vehicle: 'Toyota Corolla 2019', service: 'Troca de óleo', status: 'in-progress' },
    { id: 3, time: '14:00', client: 'Pedro Costa', vehicle: 'Ford Focus 2018', service: 'Freios', status: 'waiting' },
    { id: 4, time: '16:30', client: 'Ana Lima', vehicle: 'Volkswagen Polo 2021', service: 'Suspensão', status: 'confirmed' }
  ];

  const recentQuotes = [
    { id: 1, client: 'Carlos Mendes', vehicle: 'Hyundai HB20', service: 'Motor', value: 'R$ 2.500,00', status: 'pending' },
    { id: 2, client: 'Lucia Rocha', vehicle: 'Chevrolet Onix', service: 'Transmissão', value: 'R$ 1.800,00', status: 'approved' },
    { id: 3, client: 'Roberto Alves', vehicle: 'Nissan March', service: 'Ar condicionado', value: 'R$ 650,00', status: 'sent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'in-progress': return 'Em andamento';
      case 'waiting': return 'Aguardando';
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'sent': return 'Enviado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">OJ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, <span className="text-orange-500">Oficina Central</span>
          </h1>
          <p className="text-gray-600">Gerencie seus serviços, agendamentos e clientes de forma eficiente.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Agendamentos Hoje</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Receita Mensal</p>
                  <p className="text-3xl font-bold text-gray-900">R$ 45.2k</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Avaliação Média</p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Clientes Ativos</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/workshop/agendamentos">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Agendamentos</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/workshop/orcamentos">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Orçamentos</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/workshop/servicos">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Serviços</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/workshop/checklists">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Checklists</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/workshop/historico">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Histórico</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/workshop/perfil">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <Edit className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-700">Perfil</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Agendamentos de Hoje</CardTitle>
                <Link to="/workshop/agendamentos">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.client}</p>
                        <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                        <p className="text-sm font-medium text-blue-600">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{appointment.time}</p>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Quotes */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Orçamentos Recentes</CardTitle>
                <Link to="/workshop/orcamentos">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo orçamento
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{quote.client}</p>
                        <p className="text-sm text-gray-600">{quote.vehicle}</p>
                        <p className="text-sm font-medium text-orange-600">{quote.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{quote.value}</p>
                      <Badge className={getStatusColor(quote.status)}>
                        {getStatusText(quote.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
