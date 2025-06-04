
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkshopSpecialtiesProps {
  specialties: string[];
}

const WorkshopSpecialties = ({ specialties }: WorkshopSpecialtiesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Especialidades</h2>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopSpecialties;
