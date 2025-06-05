
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  FileText,
  Clock,
  Car,
  Wrench,
  Calendar,
  MapPin,
  Check,
  X,
  Eye,
  Download,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import type { Quote } from '@/types/quote';

const DriverQuotes = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const quotes: Quote[] = [
    {
      id: '1',
      workshopName: 'Auto Center Silva',
      workshopId: 'workshop-1',
      vehicleModel: 'Honda Civic 2020',
      vehiclePlate: 'ABC-1234',
      serviceType: 'Revisão Completa',
      description: 'Revisão preventiva dos 30.000 km incluindo troca de óleo, filtros e verificação geral.',
      items: [
        { id: '1', description: 'Óleo motor 5W30', quantity: 4, unitPrice: 25.00, total: 100.00 },
        { id: '2', description: 'Filtro de óleo', quantity: 1, unitPrice: 35.00, total: 35.00 },
        { id: '3', description: 'Filtro de ar', quantity: 1, unitPrice: 45.00, total: 45.00 },
        { id: '4', description: 'Filtro de combustível', quantity: 1, unitPrice: 55.00, total: 55.00 }
      ],
      laborCost: 150.00,
      totalParts: 235.00,
      totalLabor: 150.00,
      totalAmount: 385.00,
      estimatedDuration: '3 horas',
      createdAt: '2024-06-03T10:00:00Z',
      expiresAt: '2024-06-10T23:59:59Z',
      status: 'pending',
      notes: 'Preços válidos por 7 dias. Agendamento sujeito à disponibilidade.'
    },
    {
      id: '2',
      workshopName: 'Mecânica do João',
      workshopId: 'workshop-2',
      vehicleModel: 'Toyota Corolla 2018',
      vehiclePlate: 'DEF-5678',
      serviceType: 'Troca de Pastilhas de Freio',
      description: 'Substituição das pastilhas de freio dianteiras e verificação do sistema de freios.',
      items: [
        { id: '1', description: 'Pastilhas de freio dianteiras', quantity: 1, unitPrice: 120.00, total: 120.00 },
        { id: '2', description: 'Fluido de freio DOT4', quantity: 1, unitPrice: 25.00, total: 25.00 }
      ],
      laborCost: 80.00,
      totalParts: 145.00,
      totalLabor: 80.00,
      totalAmount: 225.00,
      estimatedDuration: '2 horas',
      createdAt: '2024-06-01T14:30:00Z',
      expiresAt: '2024-06-08T23:59:59Z',
      status: 'approved',
      notes: 'Serviço já aprovado e agendado para amanhã.'
    }
  ];

  const handleApproveQuote = (quoteId: string) => {
    console.log('Aprovando orçamento:', quoteId);
    // Implementar lógica de aprovação
  };

  const handleRejectQuote = (quoteId: string) => {
    console.log('Rejeitando orçamento:', quoteId);
    // Implementar lógica de rejeição
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const expiration = new Date(expiresAt);
    const now = new Date();
    const diffHours = (expiration.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24 && diffHours > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <DriverHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard-motorista" className="text-gray-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Meus Orçamentos</h1>
          </div>
        </div>

        {!selectedQuote ? (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <Card key={quote.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{quote.workshopName}</h3>
                          <Badge className={getStatusColor(quote.status)}>
                            {getStatusText(quote.status)}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-700 mb-1">{quote.serviceType}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Car className="h-4 w-4" />
                            <span>{quote.vehicleModel} • {quote.vehiclePlate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{quote.estimatedDuration}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{quote.description}</p>
                        
                        {isExpiringSoon(quote.expiresAt) && quote.status === 'pending' && (
                          <div className="flex items-center space-x-2 mt-2 text-amber-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Expira em breve!</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        R$ {quote.totalAmount.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expira em {new Date(quote.expiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    {quote.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectQuote(quote.id)}
                          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rejeitar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApproveQuote(quote.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aprovar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedQuote(null)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Lista
            </Button>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Detalhes do Orçamento</CardTitle>
                  <Badge className={getStatusColor(selectedQuote.status)}>
                    {getStatusText(selectedQuote.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informações da Oficina</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nome:</span> {selectedQuote.workshopName}</p>
                      <p><span className="font-medium">Serviço:</span> {selectedQuote.serviceType}</p>
                      <p><span className="font-medium">Duração estimada:</span> {selectedQuote.estimatedDuration}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informações do Veículo</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Modelo:</span> {selectedQuote.vehicleModel}</p>
                      <p><span className="font-medium">Placa:</span> {selectedQuote.vehiclePlate}</p>
                      <p><span className="font-medium">Data do orçamento:</span> {new Date(selectedQuote.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Descrição do Serviço</h4>
                  <p className="text-gray-700">{selectedQuote.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Itens do Orçamento</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Item</th>
                          <th className="text-center py-2 text-sm font-medium text-gray-700">Qtd</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-700">Valor Unit.</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedQuote.items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-2 text-sm text-gray-900">{item.description}</td>
                            <td className="py-2 text-sm text-center text-gray-700">{item.quantity}</td>
                            <td className="py-2 text-sm text-right text-gray-700">
                              R$ {item.unitPrice.toFixed(2).replace('.', ',')}
                            </td>
                            <td className="py-2 text-sm text-right font-medium text-gray-900">
                              R$ {item.total.toFixed(2).replace('.', ',')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal (Peças):</span>
                      <span className="font-medium">R$ {selectedQuote.totalParts.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mão de obra:</span>
                      <span className="font-medium">R$ {selectedQuote.totalLabor.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>R$ {selectedQuote.totalAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>

                {selectedQuote.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Observações</h4>
                    <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{selectedQuote.notes}</p>
                  </div>
                )}

                {selectedQuote.status === 'pending' && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Válido até: {new Date(selectedQuote.expiresAt).toLocaleDateString('pt-BR')} às 23:59
                    </div>
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline"
                        onClick={() => handleRejectQuote(selectedQuote.id)}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rejeitar Orçamento
                      </Button>
                      <Button onClick={() => handleApproveQuote(selectedQuote.id)}>
                        <Check className="h-4 w-4 mr-2" />
                        Aprovar Orçamento
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverQuotes;
