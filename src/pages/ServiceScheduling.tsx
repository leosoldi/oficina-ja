
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CarFront, Calendar, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const ServiceScheduling = () => {
  const { workshopId } = useParams();
  
  const [selectedService, setSelectedService] = useState('Revisão Geral');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const services = [
    {
      name: 'Revisão Geral',
      price: 'R$ 150,00',
      duration: '2 horas',
    },
    {
      name: 'Troca de Óleo',
      price: 'R$ 80,00',
      duration: '30 min',
    },
    {
      name: 'Freios',
      price: 'R$ 200,00',
      duration: '1 hora',
    },
    {
      name: 'Suspensão',
      price: 'R$ 300,00',
      duration: '3 horas',
    },
  ];

  const availableDates = [
    { date: '2024-06-12', formatted: '12/06/2024' },
    { date: '2024-06-13', formatted: '13/06/2024' },
    { date: '2024-06-14', formatted: '14/06/2024' },
  ];

  const availableTimes = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      toast.error('Selecione um serviço para continuar.');
      return;
    }
    
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast.error('Selecione data e hora para continuar.');
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    toast.success('Agendamento realizado com sucesso!');
    // Redirect to dashboard after a delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Escolha o Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedService === service.name
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleServiceSelect(service.name)}
                  >
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600">Duração: {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{service.price}</p>
                      {selectedService === service.name && (
                        <CheckCircle className="h-5 w-5 text-blue-600 ml-auto mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Continuar
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </>
        );
        
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Escolha a Data e Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-3">Selecione a data</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableDates.map((date) => (
                      <Button
                        key={date.date}
                        variant={selectedDate === date.date ? "default" : "outline"}
                        className={selectedDate === date.date ? "bg-blue-600" : ""}
                        onClick={() => handleDateSelect(date.date)}
                      >
                        {date.formatted}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-3">Selecione o horário</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-blue-600" : ""}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Continuar
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </>
        );
        
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Detalhes Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Descrição do problema</Label>
                  <textarea
                    id="description"
                    placeholder="Descreva o problema ou detalhes adicionais para a oficina"
                    className="w-full border border-gray-300 rounded-md h-32 p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Informações do Veículo</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Veículo:</span>
                      <span className="font-medium">Honda Civic 2020</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Placa:</span>
                      <span className="font-medium">ABC-1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quilometragem:</span>
                      <span className="font-medium">45.000 km</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Revisar
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </>
        );
        
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Confirmar Agendamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-1">Auto Center Silva</h3>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {availableDates.find((d) => d.date === selectedDate)?.formatted} às {selectedTime}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="font-medium">Serviço</span>
                    <span>{selectedService}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="font-medium">Veículo</span>
                    <span>Honda Civic 2020</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="font-medium">Duração estimada</span>
                    <span>{services.find((s) => s.name === selectedService)?.duration}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="font-medium">Valor estimado</span>
                    <span className="font-bold text-blue-700">{services.find((s) => s.name === selectedService)?.price}</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      O valor final pode variar após diagnóstico completo do veículo. A oficina entrará em contato caso sejam necessários serviços adicionais.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Agendamento
                </Button>
              </div>
            </CardContent>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Agendar Serviço
            </h1>
            <p className="text-gray-600">Auto Center Silva</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className="flex items-center">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step === stepNumber
                        ? 'bg-blue-600 text-white'
                        : step > stepNumber
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                    </div>
                    <span className="ml-2 text-sm hidden md:inline">
                      {['Serviço', 'Data', 'Detalhes', 'Confirmação'][stepNumber - 1]}
                    </span>
                  </div>
                  
                  {stepNumber < 4 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200">
                      <div
                        className={`h-full ${step > stepNumber ? 'bg-green-600' : 'bg-gray-200'}`}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <Card>
            {renderStepContent()}
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default ServiceScheduling;
