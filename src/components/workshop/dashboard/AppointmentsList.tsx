
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Phone, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AppointmentsList = () => {
  const [filter, setFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      client: 'Carlos Silva',
      phone: '(11) 99999-1111',
      service: 'Revisão Geral',
      date: '2024-06-03',
      time: '09:00',
      status: 'confirmed',
      price: 'R$ 150',
      notes: 'Cliente prefere pela manhã'
    },
    {
      id: 2,
      client: 'Maria Santos',
      phone: '(11) 99999-2222',
      service: 'Troca de Óleo',
      date: '2024-06-03',
      time: '11:00',
      status: 'pending',
      price: 'R$ 80',
      notes: ''
    },
    {
      id: 3,
      client: 'João Oliveira',
      phone: '(11) 99999-3333',
      service: 'Freios',
      date: '2024-06-03',
      time: '14:30',
      status: 'confirmed',
      price: 'R$ 220',
      notes: 'Ruído nos freios dianteiros'
    },
    {
      id: 4,
      client: 'Ana Costa',
      phone: '(11) 99999-4444',
      service: 'Motor',
      date: '2024-06-04',
      time: '08:00',
      status: 'completed',
      price: 'R$ 380',
      notes: 'Superaquecimento'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-500"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><AlertCircle className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Gerenciar Agendamentos
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pendentes
            </Button>
            <Button 
              variant={filter === 'confirmed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('confirmed')}
            >
              Confirmados
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Concluídos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">{appointment.client}</span>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {appointment.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.date} às {appointment.time}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="font-medium text-blue-600">{appointment.service}</span>
                      <span className="ml-2 font-bold text-green-600">{appointment.price}</span>
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-500 mt-1">
                        Obs: {appointment.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {appointment.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Confirmar
                        </Button>
                        <Button size="sm" variant="outline">
                          Reagendar
                        </Button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Concluir
                        </Button>
                        <Button size="sm" variant="outline">
                          Reagendar
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsList;
