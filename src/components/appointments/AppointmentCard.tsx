
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Car, 
  Phone, 
  Mail,
  Eye,
  Edit,
  CheckCircle
} from 'lucide-react';
import AppointmentStatusModal from './AppointmentStatusModal';

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

interface AppointmentCardProps {
  appointment: Appointment;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  onUpdateAppointment?: (updatedAppointment: Appointment) => void;
}

const AppointmentCard = ({ 
  appointment, 
  getStatusColor, 
  getStatusText,
  onUpdateAppointment 
}: AppointmentCardProps) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleUpdateStatus = (appointmentId: number, newStatus: string, statusNotes: string) => {
    console.log('Updating appointment status:', { appointmentId, newStatus, statusNotes });
    
    // Atualizar o appointment com o novo status
    const updatedAppointment = {
      ...appointment,
      status: newStatus,
      notes: statusNotes || appointment.notes
    };
    
    if (onUpdateAppointment) {
      onUpdateAppointment(updatedAppointment);
    }
  };

  const handleStartService = () => {
    setIsStatusModalOpen(true);
  };

  const handleEditAppointment = () => {
    setIsStatusModalOpen(true);
  };

  const handleFinishService = () => {
    const updatedAppointment = {
      ...appointment,
      status: 'completed'
    };
    
    if (onUpdateAppointment) {
      onUpdateAppointment(updatedAppointment);
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
            <Button variant="outline" size="sm" onClick={handleEditAppointment}>
              <Edit className="h-4 w-4" />
            </Button>
            {appointment.status === 'confirmed' && (
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleStartService}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Iniciar
              </Button>
            )}
            {['in-progress', 'analyzing', 'waiting-parts', 'almost-done'].includes(appointment.status) && (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleFinishService}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </div>

      <AppointmentStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        appointment={appointment}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  );
};

export default AppointmentCard;
