
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchHeroProps {
  searchLocation: string;
  setSearchLocation: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  services: Array<{ value: string; label: string }>;
}

const SearchHero = ({ 
  searchLocation, 
  setSearchLocation, 
  selectedService, 
  setSelectedService, 
  services 
}: SearchHeroProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Encontre a oficina ideal
          </h1>
          <p className="text-blue-100 text-lg">
            Mais de 500 oficinas verificadas próximas a você
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Sua localização ou CEP"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white h-12 flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
