
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';

const WorkshopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const workshops = [
    {
      id: 1,
      name: 'Auto Center Silva',
      address: 'Rua das Flores, 123 - Centro',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 127,
      phone: '(11) 99999-9999',
      services: ['Revisão Geral', 'Freios', 'Suspensão'],
      openNow: true
    },
    {
      id: 2,
      name: 'Mecânica do João',
      address: 'Av. Principal, 456 - Jardim América',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 89,
      phone: '(11) 88888-8888',
      services: ['Motor', 'Elétrica', 'Ar Condicionado'],
      openNow: true
    },
    {
      id: 3,
      name: 'OficinaMax',
      address: 'Rua da Indústria, 789 - Vila Industrial',
      distance: '2.1 km',
      rating: 4.5,
      reviews: 203,
      phone: '(11) 77777-7777',
      services: ['Funilaria', 'Pintura', 'Pneus'],
      openNow: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Buscar Oficinas
          </h1>

          {/* Search Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome ou serviço"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Sua localização"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Oficinas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{workshop.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{workshop.address}</span>
                        <span>•</span>
                        <span>{workshop.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{workshop.rating}</span>
                      <span className="text-sm text-gray-500">({workshop.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className={`text-sm ${workshop.openNow ? 'text-green-600' : 'text-red-600'}`}>
                        {workshop.openNow ? 'Aberto agora' : 'Fechado'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workshop.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {workshop.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={`/oficina/${workshop.id}`}>
                        Ver Perfil
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Direções
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
