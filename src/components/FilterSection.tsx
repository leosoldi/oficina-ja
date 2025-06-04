
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Award, Clock, Navigation, Star } from 'lucide-react';

interface FilterSectionProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  workshopCount: number;
}

const FilterSection = ({ selectedFilter, setSelectedFilter, workshopCount }: FilterSectionProps) => {
  const filters = [
    { id: 'all', label: 'Todos', icon: Award },
    { id: 'open', label: 'Aberto agora', icon: Clock },
    { id: 'nearby', label: 'Mais próximos', icon: Navigation },
    { id: 'rated', label: 'Melhor avaliados', icon: Star }
  ];

  return (
    <section className="bg-white shadow-sm border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Filtrar resultados</h2>
          <Button variant="outline" className="md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
