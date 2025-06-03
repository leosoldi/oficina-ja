
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign } from 'lucide-react';

interface Workshop {
  services: string[];
  specialties: string[];
  waitTime: string;
  price: string;
}

interface WorkshopServicesProps {
  workshop: Workshop;
}

const WorkshopServices = ({ workshop }: WorkshopServicesProps) => {
  const servicesList = [
    { name: 'Revisão Geral', price: 'R$ 120-180', duration: '2-3h', description: 'Verificação completa do veículo' },
    { name: 'Troca de Óleo', price: 'R$ 60-100', duration: '30min', description: 'Troca de óleo e filtro' },
    { name: 'Freios', price: 'R$ 150-300', duration: '1-2h', description: 'Manutenção do sistema de freios' },
    { name: 'Motor', price: 'R$ 200-500', duration: '3-5h', description: 'Reparo e manutenção do motor' },
    { name: 'Suspensão', price: 'R$ 180-350', duration: '2-3h', description: 'Ajuste e reparo da suspensão' },
    { name: 'Ar Condicionado', price: 'R$ 100-200', duration: '1-2h', description: 'Manutenção do sistema de ar' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Serviços oferecidos</CardTitle>
        <div className="flex flex-wrap gap-2">
          {workshop.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {servicesList.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <span className="text-blue-600 font-bold">{service.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <Button size="sm" variant="outline">
                  Agendar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopServices;
