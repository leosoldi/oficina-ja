
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Settings, Wrench, ClipboardList, DollarSign, FileText, History, Car } from 'lucide-react';

const WorkshopDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard da Oficina</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/workshop/profile">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wrench className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Serviços em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Orçamentos Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Veículos na Oficina</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/profile">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Settings className="h-5 w-5 mr-2 text-blue-600" />
                  Configurações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gerencie informações da oficina, horários de funcionamento e dados de contato.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/services">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Wrench className="h-5 w-5 mr-2 text-green-600" />
                  Cadastro de Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Adicione e gerencie os serviços oferecidos pela sua oficina.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/appointments">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Gestão de Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Controle completo de datas e horários de agendamento.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/checklists">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <ClipboardList className="h-5 w-5 mr-2 text-orange-600" />
                  Checklists Personalizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Crie e gerencie checklists de entrada e saída de veículos.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/quotes">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <DollarSign className="h-5 w-5 mr-2 text-yellow-600" />
                  Geração de Orçamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Crie orçamentos rapidamente e envie para aprovação do cliente.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/workshop/history">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <History className="h-5 w-5 mr-2 text-red-600" />
                  Histórico de Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Acesse rapidamente o histórico de serviços e peças dos clientes.</p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkshopDashboard;
