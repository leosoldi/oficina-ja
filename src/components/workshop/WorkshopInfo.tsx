
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Calendar, Navigation, Share } from 'lucide-react';

interface Workshop {
  address: string;
  phone: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  distance: string;
}

interface WorkshopInfoProps {
  workshop: Workshop;
}

const WorkshopInfo = ({ workshop }: WorkshopInfoProps) => {
  const workingHoursArray = [
    { day: 'Segunda-feira', hours: workshop.workingHours.monday },
    { day: 'Terça-feira', hours: workshop.workingHours.tuesday },
    { day: 'Quarta-feira', hours: workshop.workingHours.wednesday },
    { day: 'Quinta-feira', hours: workshop.workingHours.thursday },
    { day: 'Sexta-feira', hours: workshop.workingHours.friday },
    { day: 'Sábado', hours: workshop.workingHours.saturday },
    { day: 'Domingo', hours: workshop.workingHours.sunday }
  ];

  return (
    <div className="space-y-6">
      {/* Ações rápidas */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar serviço
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Ligar agora
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Navigation className="h-5 w-5 mr-2" />
              Como chegar
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Share className="h-5 w-5 mr-2" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações de contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Localização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-gray-700">{workshop.address}</p>
            <p className="text-sm text-gray-500">Distância: {workshop.distance}</p>
          </div>
          
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">🗺️ Mapa</span>
          </div>
        </CardContent>
      </Card>

      {/* Horário de funcionamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de funcionamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {workingHoursArray.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-gray-700">{item.day}</span>
                <span className={`font-medium ${item.hours === 'Fechado' ? 'text-red-600' : 'text-green-600'}`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">{workshop.phone}</p>
            </div>
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Ligar agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopInfo;
