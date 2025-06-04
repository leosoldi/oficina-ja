
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Calendar, Car, User, Wrench } from 'lucide-react';
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

  const filteredHistory = serviceHistory.filter(record =>
    record.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalServices = serviceHistory.length;
  const totalRevenue = serviceHistory.reduce((sum, record) => sum + record.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/workshop/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Histórico de Serviços</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Wrench className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Serviços</p>
                    <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Car className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Clientes Únicos</p>
                    <p className="text-2xl font-bold text-gray-900">{new Set(serviceHistory.map(r => r.clientName)).size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Busca */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por cliente, veículo ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lista de Histórico */}
          <div className="space-y-4">
            {filteredHistory.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Cliente e Veículo */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold">{record.clientName}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Car className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{record.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Serviços */}
                    <div>
                      <h4 className="font-medium mb-2">Serviços Realizados</h4>
                      <div className="space-y-1">
                        {record.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Peças */}
                    <div>
                      <h4 className="font-medium mb-2">Peças Utilizadas</h4>
                      <div className="space-y-1">
                        {record.parts.map((part, index) => (
                          <p key={index} className="text-sm text-gray-600">• {part}</p>
                        ))}
                      </div>
                    </div>

                    {/* Valor e Ações */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-green-600">R$ {record.total.toFixed(2)}</p>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          {record.status}
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Reimprimir OS
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Nenhum registro encontrado para "{searchTerm}".</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkshopHistory;
