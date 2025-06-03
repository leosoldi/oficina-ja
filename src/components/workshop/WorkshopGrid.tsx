
import React from 'react';
import { Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkshopCard from './WorkshopCard';

interface Workshop {
  id: number;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  services: string[];
  price: string;
  waitTime: string;
  phone: string;
  address: string;
  image: string;
  isOpen: boolean;
  specialties: string[];
  verified: boolean;
  promoted: boolean;
}

interface WorkshopGridProps {
  workshops: Workshop[];
}

const WorkshopGrid = ({ workshops }: WorkshopGridProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oficinas próximas a você
            </h2>
            <p className="text-gray-600">
              Encontramos {workshops.length} oficinas na sua região
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              <span>{workshops.filter(w => w.verified).length} verificadas</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.8 média</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="px-8">
          Carregar mais oficinas
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Mostrando {workshops.length} de 47 oficinas
        </p>
      </div>
    </div>
  );
};

export default WorkshopGrid;
