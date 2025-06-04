
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Calendar, Car, User, Wrench, TrendingUp, FileText, Download, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServiceRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  vehicle: string;
  services: string[];
  parts: string[];
  date: string;
  total: number;
  status: string;
}

const WorkshopHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [serviceHistory] = useState<ServiceRecord[]>([
    {
      id: '1',
      clientName: 'João Silva',
      clientPhone: '(11) 99999-1111',
      vehicle: 'Honda Civic 2020',
      services: ['Troca de Óleo', 'Troca de Filtro'],
      parts: ['Óleo 5W30 4L', 'Filtro de Óleo'],
      date: '2024-05-15',
      total: 145.00,
      status: 'Concluído'
    },
    {
      id: '2',
      clientName: 'Maria Santos',
      clientPhone: '(11) 99999-2222',
      vehicle: 'Toyota Corolla 2019',
      services: ['Alinhamento', 'Balanceamento'],
      parts: ['Peso de Roda 10g x4'],
      date: '2024-05-10',
      total: 120.00,
      status: 'Concluído'
    },
    {
      id: '3',
      clientName: 'Pedro Costa',
      clientPhone: '(11) 99999-3333',
      vehicle: 'Ford Ka 2018',
      services: ['Revisão Completa', 'Troca de Pastilhas'],
      parts: ['Pastilhas Dianteiras', 'Óleo 5W30', 'Filtro de Ar'],
      date: '2024-05-08',
      total: 350.00,
      status: 'Concluído'
    },
    {
      id: '4',
      clientName: 'Ana Lima',
      clientPhone: '(11) 99999-4444',
      vehicle: 'Volkswagen Gol 2017',
      services: ['Troca de Pneus'],
      parts: ['Pneu 175/70 R14 x4'],
      date: '2024-05-05',
      total: 480.00,
      status: 'Concluído'
    },
    {
      id: '5',
      clientName: 'Carlos Ferreira',
      clientPhone: '(11) 99999-5555',
      vehicle: 'Chevrolet Onix 2021',
      services: ['Diagnóstico Eletrônico', 'Reparo no Motor de Partida'],
      parts: ['Motor de Partida Remanufaturado'],
      date: '2024-05-03',
      total: 280.00,
      status: 'Concluído'
    }
  ]);

  const filteredHistory = serviceHistory.filter(record => {
    const matchesSearch = record.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMonth = selectedMonth === '' || record.date.includes(selectedMonth);
    
    return matchesSearch && matchesMonth;
  });

  const totalServices = serviceHistory.length;
  const totalRevenue = serviceHistory.reduce((sum, record) => sum + record.total, 0);
  const uniqueClients = new Set(serviceHistory.map(r => r.clientName)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link to="/workshop/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Histórico de Serviços</h1>
              <p className="text-sm text-gray-500">Acesso completo ao histórico de serviços e clientes</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Serviços</p>
                    <p className="text-3xl font-bold">{totalServices}</p>
                    <p className="text-blue-100 text-xs mt-1">Últimos 30 dias</p>
                  </div>
                  <Wrench className="h-10 w-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Receita Total</p>
                    <p className="text-3xl font-bold">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
                    <p className="text-green-100 text-xs mt-1">+15% vs mês anterior</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Clientes Únicos</p>
                    <p className="text-3xl font-bold">{uniqueClients}</p>
                    <p className="text-purple-100 text-xs mt-1">Clientes atendidos</p>
                  </div>
                  <User className="h-10 w-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Ticket Médio</p>
                    <p className="text-3xl font-bold">R$ {Math.round(totalRevenue / totalServices)}</p>
                    <p className="text-yellow-100 text-xs mt-1">Por serviço</p>
                  </div>
                  <Calendar className="h-10 w-10 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por cliente, veículo ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="h-12 px-3 py-2 border border-input bg-background rounded-md min-w-[150px]"
                  >
                    <option value="">Todos os meses</option>
                    <option value="2024-05">Maio 2024</option>
                    <option value="2024-04">Abril 2024</option>
                    <option value="2024-03">Março 2024</option>
                  </select>
                </div>
                <Button variant="outline" className="h-12 px-6">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service History List */}
          <div className="space-y-6">
            {filteredHistory.map((record) => (
              <Card key={record.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Client and Vehicle Info */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{record.clientName}</p>
                          <p className="text-sm text-gray-500">{record.clientPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Car className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{record.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Services Performed */}
                    <div>
                      <h4 className="font-medium mb-3 text-gray-900 flex items-center space-x-2">
                        <Wrench className="h-4 w-4 text-blue-600" />
                        <span>Serviços Realizados</span>
                      </h4>
                      <div className="space-y-2">
                        {record.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="mr-2 mb-2 bg-blue-50 text-blue-700 border-blue-200">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Parts Used */}
                    <div>
                      <h4 className="font-medium mb-3 text-gray-900">Peças Utilizadas</h4>
                      <div className="space-y-2">
                        {record.parts.map((part, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-sm text-gray-600">{part}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total and Actions */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Valor Total</p>
                          <p className="text-3xl font-bold text-green-600">R$ {record.total.toFixed(2)}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200 border">
                          {record.status}
                        </Badge>
                      </div>
                      <div className="mt-6 space-y-2">
                        <Button variant="outline" size="sm" className="w-full hover:bg-blue-50">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="w-full hover:bg-gray-50">
                          <Download className="h-4 w-4 mr-2" />
                          Reimprimir OS
                        </Button>
                        <Button variant="outline" size="sm" className="w-full hover:bg-green-50 text-green-600">
                          Novo Agendamento
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm || selectedMonth 
                    ? `Nenhum registro encontrado para "${searchTerm}".`
                    : 'Nenhum registro de serviço encontrado.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkshopHistory;
