
import React, { useState } from 'react';
import { Appointment } from '@/types/appointment';
import AppointmentHeader from '@/components/appointments/AppointmentHeader';
import AppointmentStats from '@/components/appointments/AppointmentStats';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentList from '@/components/appointments/AppointmentList';

const WorkshopAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [appointments, setAppointments] = useState<Appointment[]>([
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
  ]);

  const handleUpdateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'analyzing': return 'bg-yellow-100 text-yellow-800';
      case 'waiting-parts': return 'bg-orange-100 text-orange-800';
      case 'almost-done': return 'bg-green-100 text-green-800';
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
      case 'analyzing': return 'Analisando';
      case 'waiting-parts': return 'Aguardando peças';
      case 'almost-done': return 'Quase concluído';
      case 'waiting': return 'Aguardando';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const todayAppointments = appointments.filter(apt => apt.status !== 'cancelled').length;
  const completedToday = appointments.filter(apt => apt.status === 'completed').length;
  const pendingAppointments = appointments.filter(apt => ['confirmed', 'waiting'].includes(apt.status)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AppointmentHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppointmentStats 
          todayCount={todayAppointments}
          completedCount={completedToday}
          pendingCount={pendingAppointments}
          weekCount={28}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <AppointmentCalendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          
          <AppointmentList 
            appointments={appointments}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            onUpdateAppointment={handleUpdateAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkshopAppointments;
