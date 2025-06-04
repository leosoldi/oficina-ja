
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, CheckCircle, Car } from 'lucide-react';

interface AppointmentStatsProps {
  todayCount: number;
  completedCount: number;
  pendingCount: number;
  weekCount: number;
}

const AppointmentStats = ({ todayCount, completedCount, pendingCount, weekCount }: AppointmentStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white border border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Hoje</p>
              <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{weekCount}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Car className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentStats;
