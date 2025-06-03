
import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Navigation, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';

const WorkshopSearch = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('Todos os serviços');
  const [sortBy, setSortBy] = useState('Mais próximas');

  const services = [
    'Todos os serviços',
    'Revisão Geral',
    'Troca de Óleo',
    'Freios',
    'Suspensão',
    'Ar Condicionado',
    'Elétrica',
    'Pneus e Alinhamento',
    'Motor',
    'Funilaria e Pintura'
  ];

  const sortOptions = [
    'Mais próximas',
    'Melhor avaliadas',
    'Menor preço',
    'Mais rápidas'
  ];

  // Mock data para oficinas
  const workshops = [
    {
      id: 1,
      name: 'Oficina do João',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 124,
      services: ['Revisão Geral', 'Freios', 'Motor'],
      price: 'R$ 80-150',
      waitTime: '30 min',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - Centro',
      image: '/placeholder.svg',
      isOpen: true,
      specialties: ['Carros Nacionais', 'Revisão Completa']
    },
    {
      id: 2,
      name: 'Auto Center Silva',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 89,
      services: ['Ar Condicionado', 'Elétrica', 'Suspensão'],
      price: 'R$ 100-200',
      waitTime: '45 min',
      phone: '(11) 88888-8888',
      address: 'Av. Principal, 456 - Vila Nova',
      image: '/placeholder.svg',
      isOpen: true,
      specialties: ['Ar Condicionado', 'Sistema Elétrico']
    },
    {
      id: 3,
      name: 'Mecânica Express',
      distance: '2.1 km',
      rating: 4.9,
      reviews: 203,
      services: ['Troca de Óleo', 'Pneus', 'Alinhamento'],
      price: 'R$ 60-120',
      waitTime: '20 min',
      phone: '(11) 77777-7777',
      address: 'Rua Rápida, 789 - Jardim Feliz',
      image: '/placeholder.svg',
      isOpen: false,
      specialties: ['Serviço Rápido', 'Pneus']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 md:pb-0">
        {/* Search Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Digite sua localização ou CEP"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Buscar
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {selectedService}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {services.map((service) => (
                      <DropdownMenuItem
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className="cursor-pointer"
                      >
                        {service}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      {sortBy}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSortBy(option)}
                        className="cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oficinas próximas a você
            </h1>
            <p className="text-gray-600">
              Encontramos {workshops.length} oficinas na sua região
            </p>
          </div>

          {/* Workshop Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold">
                      {workshop.name}
                    </CardTitle>
                    <Badge variant={workshop.isOpen ? "default" : "secondary"}>
                      {workshop.isOpen ? 'Aberta' : 'Fechada'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{workshop.rating}</span>
                      <span>({workshop.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      <span>{workshop.distance}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                      <MapPin className="h-4 w-4" />
                      {workshop.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {workshop.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Espera: {workshop.waitTime}</span>
                    </div>
                    <div className="font-medium text-blue-600">
                      {workshop.price}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Carregar mais oficinas
            </Button>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
