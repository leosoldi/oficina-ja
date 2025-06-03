
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, XCircle, ChevronDown, ChevronUp, Calendar, Clock, Car } from 'lucide-react';
import { toast } from 'sonner';

const BudgetManagement = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const budgets = [
    {
      id: 1,
      workshopName: 'Auto Center Silva',
      service: 'Revisão Geral + Troca de Óleo',
      vehicle: 'Honda Civic 2020',
      date: '10/06/2024',
      total: 'R$ 280,00',
      status: 'pending',
      items: [
        { name: 'Revisão Geral', price: 'R$ 150,00' },
        { name: 'Troca de Óleo', price: 'R$ 80,00' },
        { name: 'Filtro de Óleo', price: 'R$ 50,00' },
      ],
      details: 'Após inspeção, detectamos que o filtro de óleo precisa ser substituído.',
    },
    {
      id: 2,
      workshopName: 'Mecânica do João',
      service: 'Revisão Elétrica',
      vehicle: 'Honda Civic 2020',
      date: '05/06/2024',
      total: 'R$ 350,00',
      status: 'approved',
      items: [
        { name: 'Diagnóstico Elétrico', price: 'R$ 100,00' },
        { name: 'Troca de Bateria', price: 'R$ 250,00' },
      ],
      details: 'Bateria apresentava sinais de desgaste e foi substituída.',
    },
    {
      id: 3,
      workshopName: 'OficinaMax',
      service: 'Troca de Freios',
      vehicle: 'Honda Civic 2020',
      date: '28/05/2024',
      total: 'R$ 420,00',
      status: 'completed',
      items: [
        { name: 'Pastilhas de Freio', price: 'R$ 180,00' },
        { name: 'Disco de Freio', price: 'R$ 160,00' },
        { name: 'Mão de Obra', price: 'R$ 80,00' },
      ],
      details: 'Pastilhas e discos substituídos conforme solicitado.',
    },
  ];

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleApprove = (id: number) => {
    toast.success('Orçamento aprovado com sucesso!');
  };

  const handleReject = (id: number) => {
    toast.success('Orçamento rejeitado.');
  };

  const getBudgetStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Aguardando Aprovação',
        };
      case 'approved':
        return {
          color: 'bg-blue-100 text-blue-800',
          label: 'Aprovado',
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          label: 'Concluído',
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          label: 'Rejeitado',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          label: 'Status Desconhecido',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Orçamentos
            </h1>
            <p className="text-gray-600">Gerencie seus orçamentos de serviços</p>
          </div>

          <div className="space-y-4">
            {budgets.map((budget) => {
              const statusInfo = getBudgetStatusInfo(budget.status);
              const isExpanded = expandedId === budget.id;

              return (
                <Card key={budget.id} className="overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(budget.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{budget.service}</h3>
                        <p className="text-sm text-gray-600">{budget.workshopName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <CardContent className="border-t">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{budget.vehicle}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{budget.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">Validade: 7 dias</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Itens do Orçamento</h4>
                          <div className="space-y-2 mb-3">
                            {budget.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span>{item.price}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between pt-2 border-t font-medium">
                            <span>Total</span>
                            <span className="text-blue-700">{budget.total}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Observações da Oficina</h4>
                          <p className="text-sm text-gray-700">{budget.details}</p>
                        </div>
                        
                        {budget.status === 'pending' && (
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleApprove(budget.id)} 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button 
                              onClick={() => handleReject(budget.id)} 
                              variant="outline" 
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rejeitar
                            </Button>
                          </div>
                        )}
                        
                        {budget.status === 'approved' && (
                          <div className="flex">
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <a href="/acompanhar">
                                Acompanhar Serviço
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default BudgetManagement;
