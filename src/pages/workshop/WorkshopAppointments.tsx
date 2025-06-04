
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, User, Car, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  status: 'agendado' | 'em-andamento' | 'concluido' | 'cancelado';
}

const WorkshopAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'João Silva',
      clientPhone: '(11) 99999-1111',
      vehicle: 'Honda Civic 2020',
      service: 'Troca de Óleo',
      date: '2024-06-04',
      time: '09:00',
      status: 'agendado'
    },
    {
      id: '2',
      clientName: 'Maria Santos',
      clientPhone: '(11) 99999-2222',
      vehicle: 'Toyota Corolla 2019',
      service: 'Alinhamento',
      date: '2024-06-04',
      time: '10:30',
      status: 'em-andamento'
    },
    {
      id: '3',
      clientName: 'Pedro Costa',
      clientPhone: '(11) 99999-3333',
      vehicle: 'Ford Ka 2018',
      service: 'Revisão Completa',
      date: '2024-06-04',
      time: '14:00',
      status: 'agendado'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'agendado': return 'Agendado';
      case 'em-andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === '2024-06-04');

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
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Gestão de Agendamentos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos de Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold">{appointment.time}</span>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{appointment.clientPhone}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Car className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{appointment.vehicle}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Serviço:</strong> {appointment.service}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        {appointment.status === 'agendado' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Iniciar Serviço
                          </Button>
                        )}
                        {appointment.status === 'em-andamento' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Finalizar Serviço
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Reagendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle>Horários Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'].map((time) => {
                    const isBooked = todayAppointments.some(apt => apt.time === time);
                    return (
                      <Button
                        key={time}
                        variant={isBooked ? "secondary" : "outline"}
                        size="sm"
                        disabled={isBooked}
                        className={isBooked ? "bg-red-100 text-red-800" : ""}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Horários em vermelho estão ocupados
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkshopAppointments;
