
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkshopServicesProps {
  services: string[];
}

const WorkshopServices = ({ services }: WorkshopServicesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Serviços oferecidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((service) => (
            <div key={service} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm font-medium text-blue-700">{service}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopServices;
