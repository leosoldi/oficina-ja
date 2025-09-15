import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Filter, Search, Car, User, FileText, Clock, ArrowLeft, Settings, Menu, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface HistoryRecord {
  id: number;
  clientName: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate: string;
  service: string;
  status: 'Concluído' | 'Cancelado' | 'Em Andamento';
  date: string;
  amount: number;
  duration: string;
  observations?: string;
  parts?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const mockHistoryData: HistoryRecord[] = [
  {
    id: 1,
    clientName: 'João Silva',
    vehicleBrand: 'Toyota',
    vehicleModel: 'Corolla',
    vehiclePlate: 'ABC-1234',
    service: 'Troca de óleo e filtro',
    status: 'Concluído',
    date: '2024-01-15',
    amount: 150.00,
    duration: '45min',
    observations: 'Serviço realizado sem intercorrências',
    parts: [
      { name: 'Óleo Motor 5W30', quantity: 4, price: 25.00 },
      { name: 'Filtro de Óleo', quantity: 1, price: 35.00 },
      { name: 'Filtro de Ar', quantity: 1, price: 15.00 }
    ]
  },
  {
    id: 2,
    clientName: 'Maria Santos',
    vehicleBrand: 'Honda',
    vehicleModel: 'Civic',
    vehiclePlate: 'DEF-5678',
    service: 'Revisão completa',
    status: 'Concluído',
    date: '2024-01-14',
    amount: 450.00,
    duration: '2h 30min',
    parts: [
      { name: 'Pastilha de Freio Dianteira', quantity: 1, price: 80.00 },
      { name: 'Disco de Freio', quantity: 2, price: 120.00 },
      { name: 'Óleo de Freio', quantity: 1, price: 18.00 }
    ]
  },
  {
    id: 3,
    clientName: 'Pedro Costa',
    vehicleBrand: 'Volkswagen',
    vehicleModel: 'Gol',
    vehiclePlate: 'GHI-9101',
    service: 'Troca de pneus',
    status: 'Cancelado',
    date: '2024-01-13',
    amount: 0,
    duration: '0min',
    observations: 'Cliente não compareceu'
  },
  {
    id: 4,
    clientName: 'Ana Lima',
    vehicleBrand: 'Ford',
    vehicleModel: 'Focus',
    vehiclePlate: 'JKL-1213',
    service: 'Alinhamento e balanceamento',
    status: 'Em Andamento',
    date: '2024-01-16',
    amount: 120.00,
    duration: '1h 15min',
    parts: [
      { name: 'Peso de Roda', quantity: 4, price: 5.00 }
    ]
  }
];

const WorkshopHistory = () => {
  const isMobile = useIsMobile();
  const [records, setRecords] = useState<HistoryRecord[]>(mockHistoryData);
  const [filteredRecords, setFilteredRecords] = useState<HistoryRecord[]>(mockHistoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, dateFrom, dateTo);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, dateFrom, dateTo);
  };

  const handleDateFilter = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    applyFilters(searchTerm, statusFilter, from, to);
  };

  const applyFilters = (search: string, status: string, from: string, to: string) => {
    let filtered = records;

    if (search) {
      filtered = filtered.filter(record =>
        record.clientName.toLowerCase().includes(search.toLowerCase()) ||
        record.vehicleBrand.toLowerCase().includes(search.toLowerCase()) ||
        record.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
        record.vehiclePlate.toLowerCase().includes(search.toLowerCase()) ||
        record.service.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(record => record.status === status);
    }

    if (from) {
      filtered = filtered.filter(record => new Date(record.date) >= new Date(from));
    }
    if (to) {
      filtered = filtered.filter(record => new Date(record.date) <= new Date(to));
    }

    setFilteredRecords(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRecords = filteredRecords.length;
  const completedRecords = filteredRecords.filter(r => r.status === 'Concluído').length;
  const totalRevenue = filteredRecords
    .filter(r => r.status === 'Concluído')
    .reduce((sum, r) => sum + r.amount, 0);

  const PartsListDialog = ({ record }: { record: HistoryRecord }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs sm:text-sm"
          disabled={!record.parts || record.parts.length === 0}
        >
          <Wrench className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {isMobile ? 'Peças' : 'Ver Peças'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Peças Utilizadas - {record.service}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Cliente:</strong> {record.clientName}</p>
            <p><strong>Veículo:</strong> {record.vehicleBrand} {record.vehicleModel}</p>
            <p><strong>Placa:</strong> {record.vehiclePlate}</p>
          </div>
          
          {record.parts && record.parts.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Lista de Peças:</h4>
              {record.parts.map((part, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{part.name}</p>
                    <p className="text-xs text-gray-600">Quantidade: {part.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">
                      R$ {(part.price * part.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600">
                      R$ {part.price.toFixed(2)} cada
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total em Peças:</span>
                  <span className="font-bold text-green-600">
                    R$ {record.parts.reduce((sum, part) => sum + (part.price * part.quantity), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma peça foi utilizada neste serviço</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${isMobile ? 'pb-safe-bottom' : ''}`}>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-lg sm:text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
              <h2 className="hidden sm:block text-lg font-semibold text-gray-700">Histórico</h2>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isMobile ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="px-2"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  {mobileMenuOpen && (
                    <div className="absolute top-14 right-3 bg-white border rounded-lg shadow-lg p-2 space-y-2 z-50">
                      <Link to="/dashboard-oficina">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Voltar
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to="/dashboard-oficina">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </>
              )}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm sm:text-base">OJ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Histórico de <span className="text-orange-500">Serviços</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isMobile ? 'Histórico completo de serviços' : 'Visualize e gerencie o histórico completo de serviços realizados na oficina.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total de Registros</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalRecords}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-green-100">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Serviços Concluídos</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{completedRecords}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 sm:col-span-1 col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-orange-100">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-sm sm:text-lg">R$</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">R$ {totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 sm:mb-8 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base sm:text-lg">Filtros de Pesquisa</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs sm:text-sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {isMobile ? (showFilters ? 'Ocultar' : 'Filtros') : (showFilters ? 'Ocultar' : 'Mostrar') + ' Filtros'}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 sm:space-y-4 pt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={isMobile ? "Buscar..." : "Buscar por cliente, veículo, placa ou serviço..."}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm">Status</Label>
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFrom" className="text-sm">Data inicial</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => handleDateFilter(e.target.value, dateTo)}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateTo" className="text-sm">Data final</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => handleDateFilter(dateFrom, e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3 sm:space-y-4">
          {filteredRecords.length === 0 ? (
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="p-3 sm:p-4 rounded-full bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base sm:text-lg">Nenhum registro encontrado</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Tente ajustar os filtros de pesquisa</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 sm:p-2 rounded-full bg-blue-100">
                            <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{record.clientName}</span>
                        </div>
                        <Badge className={`${getStatusColor(record.status)} text-xs`}>
                          {record.status}
                        </Badge>
                      </div>
                      
                      <div className="text-left sm:text-right">
                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                          R$ {record.amount.toFixed(2)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">Valor total</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Car className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{record.vehicleBrand} {record.vehicleModel}</span>
                        </div>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs w-fit">{record.vehiclePlate}</span>
                        <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{new Date(record.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{record.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{record.service}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2">
                            <PartsListDialog record={record} />
                            {record.parts && record.parts.length > 0 && (
                              <span className="text-xs text-gray-500">
                                ({record.parts.length} {record.parts.length === 1 ? 'peça' : 'peças'})
                              </span>
                            )}
                          </div>
                        </div>

                        {record.observations && (
                          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded leading-relaxed">
                            {record.observations}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopHistory;
