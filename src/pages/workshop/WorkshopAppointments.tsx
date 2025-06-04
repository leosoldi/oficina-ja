
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Car, 
  Phone, 
  Mail,
  MapPin,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      time: '08:00',
      duration: '2h',
      client: 'João Silva',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      vehicle: 'Honda Civic 2020',
      plate: 'ABC-1234',
      service: 'Revisão Completa',
      status: 'confirmed',
      notes: 'Cliente solicitou verificação dos freios'
    },
    {
      id: 2,
      time: '10:30',
      duration: '1h',
      client: 'Maria Santos',
      phone: '(11) 88888-8888',
      email: 'maria@email.com',
      vehicle: 'Toyota Corolla 2019',
      plate: 'DEF-5678',
      service: 'Troca de óleo',
      status: 'in-progress',
      notes: 'Óleo sintético conforme especificação'
    },
    {
      id: 3,
      time: '14:00',
      duration: '3h',
      client: 'Pedro Costa',
      phone: '(11) 77777-7777',
      email: 'pedro@email.com',
      vehicle: 'Ford Focus 2018',
      plate: 'GHI-9012',
      service: 'Reparo de Freios',
      status: 'waiting',
      notes: 'Pastilhas e discos precisam ser substituídos'
    },
    {
      id: 4,
      time: '16:30',
      duration: '2h',
      client: 'Ana Lima',
      phone: '(11) 66666-6666',
      email: 'ana@email.com',
      vehicle: 'Volkswagen Polo 2021',
      plate: 'JKL-3456',
      service: 'Suspensão',
      status: 'confirmed',
      notes: 'Verificar amortecedores dianteiros'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'in-progress': return 'Em andamento';
      case 'waiting': return 'Aguardando';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    statusFilter === 'all' || appointment.status === statusFilter
  );

  const today = new Date();
  const todayAppointments = appointments.filter(apt => apt.status !== 'cancelled').length;
  const completedToday = appointments.filter(apt => apt.status === 'completed').length;
  const pendingAppointments = appointments.filter(apt => ['confirmed', 'waiting'].includes(apt.status)).length;

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
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">Agendamentos</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingAppointments}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Esta Semana</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Car className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Confirmado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Em andamento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Aguardando</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Concluído</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Agendamentos de Hoje
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="in-progress">Em andamento</option>
                    <option value="waiting">Aguardando</option>
                    <option value="completed">Concluído</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{appointment.client}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-600">
                                {appointment.time} ({appointment.duration})
                              </span>
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Car className="h-4 w-4" />
                                <span>{appointment.vehicle} - {appointment.plate}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{appointment.phone}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{appointment.email}</span>
                              </div>
                              <div className="font-medium text-blue-600">
                                {appointment.service}
                              </div>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                              <strong>Observações:</strong> {appointment.notes}
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
                        {appointment.status === 'confirmed' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Iniciar
                          </Button>
                        )}
                        {appointment.status === 'in-progress' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Finalizar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredAppointments.length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum agendamento encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopAppointments;
