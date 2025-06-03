
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MessageSquare, ChevronDown, ChevronUp, Phone, Car, Calendar } from 'lucide-react';

const ServiceTracking = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      workshopName: 'Auto Center Silva',
      service: 'Revisão Geral + Troca de Óleo',
      vehicle: 'Honda Civic 2020',
      date: '10/06/2024',
      time: '09:00',
      status: 'in_progress',
      progress: 60,
      steps: [
        { name: 'Agendamento', completed: true, time: '05/06 - 14:30' },
        { name: 'Check-in do Veículo', completed: true, time: '10/06 - 08:45' },
        { name: 'Diagnóstico', completed: true, time: '10/06 - 09:15' },
        { name: 'Execução do Serviço', completed: true, time: '10/06 - 10:00' },
        { name: 'Controle de Qualidade', completed: false },
        { name: 'Entrega do Veículo', completed: false },
      ],
      estimatedCompletion: '10/06 - 12:30',
      phone: '(11) 99999-9999',
      updates: [
        { 
          time: '09:15', 
          message: 'Diagnóstico concluído. Iniciando a troca de óleo e filtros.' 
        },
        { 
          time: '10:00', 
          message: 'Troca de óleo finalizada. Realizando os ajustes finais e testes.' 
        },
      ]
    },
    {
      id: 2,
      workshopName: 'Mecânica do João',
      service: 'Alinhamento e Balanceamento',
      vehicle: 'Honda Civic 2020',
      date: '15/06/2024',
      time: '14:00',
      status: 'scheduled',
      progress: 0,
      steps: [
        { name: 'Agendamento', completed: true, time: '08/06 - 17:22' },
        { name: 'Check-in do Veículo', completed: false },
        { name: 'Diagnóstico', completed: false },
        { name: 'Execução do Serviço', completed: false },
        { name: 'Controle de Qualidade', completed: false },
        { name: 'Entrega do Veículo', completed: false },
      ],
      estimatedCompletion: '15/06 - 16:00',
      phone: '(11) 88888-8888',
      updates: []
    }
  ];

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'scheduled':
        return {
          color: 'bg-blue-100 text-blue-800',
          label: 'Agendado',
        };
      case 'in_progress':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Em Andamento',
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          label: 'Concluído',
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
              Acompanhamento
            </h1>
            <p className="text-gray-600">Acompanhe o status dos seus serviços</p>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const statusInfo = getStatusInfo(service.status);
              const isExpanded = expandedId === service.id;

              return (
                <Card key={service.id}>
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(service.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${
                        service.status === 'in_progress' ? 'bg-yellow-100' : 'bg-blue-100'
                      } p-2 rounded-full`}>
                        <Clock className={`h-5 w-5 ${
                          service.status === 'in_progress' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{service.service}</h3>
                        <p className="text-sm text-gray-600">{service.workshopName}</p>
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
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{service.vehicle}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{service.date} às {service.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">Prev. Conclusão: {service.estimatedCompletion}</span>
                          </div>
                        </div>
                        
                        {service.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progresso</span>
                              <span>{service.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${service.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Etapas</h4>
                          <div className="space-y-3">
                            {service.steps.map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                                }`}>
                                  {step.completed ? (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  ) : (
                                    <span className="text-xs text-gray-600">{idx + 1}</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <span className={step.completed ? 'text-gray-900' : 'text-gray-500'}>
                                      {step.name}
                                    </span>
                                    {step.time && (
                                      <span className="text-xs text-gray-500">{step.time}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {service.updates.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Atualizações da Oficina</h4>
                            <div className="space-y-2">
                              {service.updates.map((update, idx) => (
                                <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium text-blue-800">Atualização</span>
                                    <span className="text-sm text-blue-600">{update.time}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{update.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-3">
                          <Button variant="outline" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <a href={`tel:${service.phone}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              Ligar para Oficina
                            </a>
                          </Button>
                        </div>
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

export default ServiceTracking;
