
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, User, Car, Phone, Plus, CheckCircle, Play } from 'lucide-react';
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
    },
    {
      id: '4',
      clientName: 'Ana Lima',
      clientPhone: '(11) 99999-4444',
      vehicle: 'Volkswagen Gol 2017',
      service: 'Troca de Pastilhas',
      date: '2024-06-04',
      time: '16:00',
      status: 'concluido'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'concluido': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/workshop/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestão de Agendamentos</h1>
                <p className="text-sm text-gray-500">Controle completo da sua agenda de serviços</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Hoje</p>
                  <p className="text-2xl font-bold">{todayAppointments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Em Andamento</p>
                  <p className="text-2xl font-bold">{todayAppointments.filter(a => a.status === 'em-andamento').length}</p>
                </div>
                <Play className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Concluídos</p>
                  <p className="text-2xl font-bold">{todayAppointments.filter(a => a.status === 'concluido').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Agendados</p>
                  <p className="text-2xl font-bold">{todayAppointments.filter(a => a.status === 'agendado').length}</p>
                </div>
                <User className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-1 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Calendário</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
              
              {/* Time Slots */}
              <div className="mt-6">
                <h4 className="font-medium mb-3 text-gray-900">Horários Disponíveis</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = todayAppointments.some(apt => apt.time === time);
                    return (
                      <Button
                        key={time}
                        variant={isBooked ? "secondary" : "outline"}
                        size="sm"
                        disabled={isBooked}
                        className={`text-xs ${isBooked ? "bg-red-100 text-red-800 border-red-200" : "hover:bg-blue-50"}`}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Horários em vermelho estão ocupados
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Agendamentos de Hoje</span>
                  </span>
                  <span className="text-sm text-gray-500">{todayAppointments.length} agendamentos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-lg">{appointment.time}</span>
                              <Badge className={`${getStatusColor(appointment.status)} border`}>
                                {getStatusLabel(appointment.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">Duração estimada: 30min</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{appointment.clientName}</p>
                              <p className="text-sm text-gray-500">Cliente</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-900">{appointment.clientPhone}</p>
                              <p className="text-sm text-gray-500">Contato</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Car className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-900">{appointment.vehicle}</p>
                              <p className="text-sm text-gray-500">Veículo</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-900">{appointment.service}</p>
                              <p className="text-sm text-gray-500">Serviço</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {appointment.status === 'agendado' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Play className="h-4 w-4 mr-2" />
                            Iniciar Serviço
                          </Button>
                        )}
                        {appointment.status === 'em-andamento' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Finalizar Serviço
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="hover:bg-gray-50">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-gray-50">
                          Reagendar
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 text-blue-600">
                          Contatar Cliente
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkshopAppointments;
