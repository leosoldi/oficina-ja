
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import WorkshopCard from './WorkshopCard';

interface Workshop {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  phone: string;
  services: string[];
  isOpen: boolean;
  image: string;
  price: string;
  specialties: string[];
  openHours: string;
  verified: boolean;
  responseTime: string;
  description: string;
}

interface WorkshopListProps {
  workshops: Workshop[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

const WorkshopList = ({ workshops, favorites, toggleFavorite }: WorkshopListProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oficinas encontradas
            </h2>
            <p className="text-gray-600">
              {workshops.length} resultados • Ordenado por relevância
            </p>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Mais relevantes</option>
            <option>Melhor avaliados</option>
            <option>Mais próximos</option>
            <option>Menor preço</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop, index) => (
          <WorkshopCard
            key={workshop.id}
            workshop={workshop}
            index={index}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button 
          variant="outline" 
          size="lg" 
          className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ThumbsUp className="h-5 w-5 mr-2" />
          Carregar mais oficinas
        </Button>
      </div>
    </section>
  );
};

export default WorkshopList;
