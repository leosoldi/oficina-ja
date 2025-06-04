
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

interface AppointmentCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const AppointmentCalendar = ({ selectedDate, onSelectDate }: AppointmentCalendarProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
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
  );
};

export default AppointmentCalendar;
