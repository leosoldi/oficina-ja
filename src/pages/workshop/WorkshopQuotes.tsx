
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Send,
  Download,
  ArrowLeft,
  Clock,
  User,
  Car,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopQuotes = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const quotes = [
    {
      id: 1,
      number: 'ORC-001',
      date: '2024-06-04',
      client: 'João Silva',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      vehicle: 'Honda Civic 2020',
      plate: 'ABC-1234',
      services: ['Revisão Completa', 'Troca de óleo', 'Filtros'],
      subtotal: 850.00,
      discount: 50.00,
      total: 800.00,
      status: 'sent',
      validUntil: '2024-06-18',
      notes: 'Orçamento inclui peças originais'
    },
    {
      id: 2,
      number: 'ORC-002',
      date: '2024-06-03',
      client: 'Maria Santos',
      phone: '(11) 88888-8888',
      email: 'maria@email.com',
      vehicle: 'Toyota Corolla 2019',
      plate: 'DEF-5678',
      services: ['Reparo de Freios', 'Pastilhas'],
      subtotal: 450.00,
      discount: 0.00,
      total: 450.00,
      status: 'approved',
      validUntil: '2024-06-17',
      notes: 'Cliente aprovou via WhatsApp'
    },
    {
      id: 3,
      number: 'ORC-003',
      date: '2024-06-02',
      client: 'Pedro Costa',
      phone: '(11) 77777-7777',
      email: 'pedro@email.com',
      vehicle: 'Ford Focus 2018',
      plate: 'GHI-9012',
      services: ['Suspensão', 'Amortecedores', 'Molas'],
      subtotal: 1200.00,
      discount: 100.00,
      total: 1100.00,
      status: 'pending',
      validUntil: '2024-06-16',
      notes: 'Aguardando resposta do cliente'
    },
    {
      id: 4,
      number: 'ORC-004',
      date: '2024-06-01',
      client: 'Ana Lima',
      phone: '(11) 66666-6666',
      email: 'ana@email.com',
      vehicle: 'Volkswagen Polo 2021',
      plate: 'JKL-3456',
      services: ['Ar Condicionado', 'Gás R134a'],
      subtotal: 300.00,
      discount: 0.00,
      total: 300.00,
      status: 'rejected',
      validUntil: '2024-06-15',
      notes: 'Cliente optou por outra oficina'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'sent': return 'Enviado';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
  const approvedQuotes = quotes.filter(q => q.status === 'approved').length;
  const totalValue = quotes.filter(q => q.status === 'approved').reduce((sum, q) => sum + q.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard-oficina" className="text-gray-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">Orçamentos</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Orçamento
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuotes}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingQuotes}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Aprovados</p>
                  <p className="text-2xl font-bold text-gray-900">{approvedQuotes}</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {totalValue.toLocaleString('pt-BR')}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Orçamentos Recentes
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar orçamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="pending">Pendente</option>
                  <option value="sent">Enviado</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Rejeitado</option>
                  <option value="expired">Expirado</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{quote.number}</h3>
                            <Badge className={getStatusColor(quote.status)}>
                              {getStatusText(quote.status)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              R$ {quote.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            {quote.discount > 0 && (
                              <p className="text-sm text-gray-500 line-through">
                                R$ {quote.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{quote.client}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Car className="h-4 w-4" />
                              <span>{quote.vehicle} - {quote.plate}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>Criado em {new Date(quote.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>Válido até {new Date(quote.validUntil).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Serviços:</p>
                          <div className="flex flex-wrap gap-1">
                            {quote.services.map((service, index) => (
                              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {quote.notes && (
                          <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
                            <strong>Observações:</strong> {quote.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {quote.status === 'pending' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="h-4 w-4 mr-1" />
                          Enviar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredQuotes.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum orçamento encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkshopQuotes;
