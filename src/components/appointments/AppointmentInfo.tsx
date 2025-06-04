
import React from 'react';
import { Clock, Car, User } from 'lucide-react';
import { Appointment } from '@/types/appointment';

interface AppointmentInfoProps {
  appointment: Appointment;
}

const AppointmentInfo = ({ appointment }: AppointmentInfoProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{appointment.client}</h3>
          <p className="text-sm text-gray-600">{appointment.time} ({appointment.duration})</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>{appointment.vehicle} - {appointment.plate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{appointment.phone}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <span className="font-medium text-blue-600">{appointment.service}</span>
      </div>
    </div>
  );
};

export default AppointmentInfo;
