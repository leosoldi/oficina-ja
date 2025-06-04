
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Settings, Wrench, ClipboardList, DollarSign, FileText, History, Car, TrendingUp, Clock, Users, Star } from 'lucide-react';

const WorkshopDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Auto Center Silva</h1>
                <p className="text-sm text-gray-500">Dashboard da Oficina</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Seg-Sex 8h-18h</span>
              </div>
              <Link to="/workshop/profile">
                <Button variant="outline" size="sm" className="shadow-sm">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600">Aqui está um resumo da sua oficina hoje.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Agendamentos Hoje</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-blue-100 text-xs mt-1">+2 que ontem</p>
                </div>
                <Calendar className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Serviços em Andamento</p>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-green-100 text-xs mt-1">3 finalizados hoje</p>
                </div>
                <Wrench className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Orçamentos Pendentes</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-yellow-100 text-xs mt-1">R$ 2.150 em análise</p>
                </div>
                <DollarSign className="h-10 w-10 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Receita do Mês</p>
                  <p className="text-3xl font-bold">R$ 12.5k</p>
                  <p className="text-purple-100 text-xs mt-1">+15% vs mês anterior</p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/profile" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Configurações do Perfil</CardTitle>
                    <p className="text-sm text-gray-500">Gerencie suas informações</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Configure informações da oficina, horários de funcionamento e dados de contato.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/services" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Wrench className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Cadastro de Serviços</CardTitle>
                    <p className="text-sm text-gray-500">Gerencie seu catálogo</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Adicione e gerencie os serviços oferecidos pela sua oficina com preços e descrições.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/appointments" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Gestão de Agendamentos</CardTitle>
                    <p className="text-sm text-gray-500">Controle total da agenda</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Controle completo de datas e horários de agendamento com visualização em calendário.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/checklists" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <ClipboardList className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Checklists Personalizados</CardTitle>
                    <p className="text-sm text-gray-500">Padronize seus processos</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Crie e gerencie checklists de entrada e saída de veículos para garantir qualidade.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/quotes" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Geração de Orçamentos</CardTitle>
                    <p className="text-sm text-gray-500">Orçamentos rápidos e precisos</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Crie orçamentos rapidamente e envie para aprovação do cliente com conversão para OS.</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg">
            <Link to="/workshop/history" className="block">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <History className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Histórico de Serviços</CardTitle>
                    <p className="text-sm text-gray-500">Acesso ao histórico completo</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Acesse rapidamente o histórico de serviços e peças dos clientes com busca avançada.</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Próximos Agendamentos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '09:00', client: 'João Silva', service: 'Troca de Óleo', vehicle: 'Honda Civic' },
                  { time: '10:30', client: 'Maria Santos', service: 'Alinhamento', vehicle: 'Toyota Corolla' },
                  { time: '14:00', client: 'Pedro Costa', service: 'Revisão', vehicle: 'Ford Ka' }
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{appointment.client}</p>
                          <p className="text-xs text-gray-500">{appointment.service} - {appointment.vehicle}</p>
                        </div>
                        <span className="text-xs font-medium text-blue-600">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Avaliações Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { client: 'Ana Lima', rating: 5, comment: 'Excelente atendimento!' },
                  { client: 'Carlos Ferreira', rating: 5, comment: 'Serviço rápido e eficiente.' },
                  { client: 'Roberto Silva', rating: 4, comment: 'Muito bom, recomendo!' }
                ].map((review, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{review.client}</p>
                      <div className="flex space-x-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkshopDashboard;
