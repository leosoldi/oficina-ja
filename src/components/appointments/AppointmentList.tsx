
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

interface Appointment {
  id: number;
  time: string;
  duration: string;
  client: string;
  phone: string;
  email: string;
  vehicle: string;
  plate: string;
  service: string;
  status: string;
  notes: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  onUpdateAppointment?: (updatedAppointment: Appointment) => void;
}

const AppointmentList = ({ 
  appointments, 
  statusFilter, 
  onStatusFilterChange, 
  getStatusColor, 
  getStatusText,
  onUpdateAppointment
}: AppointmentListProps) => {
  const filteredAppointments = appointments.filter(appointment => 
    statusFilter === 'all' || appointment.status === statusFilter
  );

  return (
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
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="confirmed">Confirmado</option>
              <option value="in-progress">Em andamento</option>
              <option value="analyzing">Analisando</option>
              <option value="waiting-parts">Aguardando peças</option>
              <option value="almost-done">Quase concluído</option>
              <option value="waiting">Aguardando</option>
              <option value="completed">Concluído</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              onUpdateAppointment={onUpdateAppointment}
            />
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
  );
};

export default AppointmentList;
