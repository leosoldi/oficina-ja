
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodayAppointments = () => {
  const todayAppointments = [
    { id: 1, time: '08:00', client: 'João Silva', vehicle: 'Honda Civic 2020', service: 'Revisão', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Maria Santos', vehicle: 'Toyota Corolla 2019', service: 'Troca de óleo', status: 'in-progress' },
    { id: 3, time: '14:00', client: 'Pedro Costa', vehicle: 'Ford Focus 2018', service: 'Freios', status: 'waiting' },
    { id: 4, time: '16:30', client: 'Ana Lima', vehicle: 'Volkswagen Polo 2021', service: 'Suspensão', status: 'confirmed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'in-progress': return 'Em andamento';
      case 'waiting': return 'Aguardando';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Agendamentos de Hoje</CardTitle>
          <Link to="/workshop/agendamentos">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Ver todos
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.client}</p>
                  <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                  <p className="text-sm font-medium text-blue-600">{appointment.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{appointment.time}</p>
                <Badge className={getStatusColor(appointment.status)}>
                  {getStatusText(appointment.status)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;
