
import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Navigation, Filter, ChevronDown, Map, Grid, Heart, ArrowRight, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';

const WorkshopSearch = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceFilter, setPriceFilter] = useState('all');

  const services = [
    { value: 'all', label: 'Todos os serviços' },
    { value: 'revisao', label: 'Revisão Geral' },
    { value: 'oleo', label: 'Troca de Óleo' },
    { value: 'freios', label: 'Freios' },
    { value: 'suspensao', label: 'Suspensão' },
    { value: 'ar-condicionado', label: 'Ar Condicionado' },
    { value: 'eletrica', label: 'Elétrica' },
    { value: 'pneus', label: 'Pneus e Alinhamento' },
    { value: 'motor', label: 'Motor' },
    { value: 'funilaria', label: 'Funilaria e Pintura' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Mais próximas' },
    { value: 'rating', label: 'Melhor avaliadas' },
    { value: 'price', label: 'Menor preço' },
    { value: 'time', label: 'Mais rápidas' }
  ];

  const priceOptions = [
    { value: 'all', label: 'Qualquer preço' },
    { value: 'low', label: 'Até R$ 100' },
    { value: 'medium', label: 'R$ 100 - R$ 200' },
    { value: 'high', label: 'Acima de R$ 200' }
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
      specialties: ['Carros Nacionais', 'Revisão Completa'],
      verified: true,
      promoted: true
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
      specialties: ['Ar Condicionado', 'Sistema Elétrico'],
      verified: true,
      promoted: false
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
      specialties: ['Serviço Rápido', 'Pneus'],
      verified: false,
      promoted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 md:pb-0">
        {/* Hero Search Section */}
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

            {/* Enhanced Search Bar */}
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

        {/* Filters and Controls */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Mais filtros
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-1"
                >
                  <Grid className="h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="flex items-center gap-1"
                >
                  <Map className="h-4 w-4" />
                  Mapa
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
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
              
              {/* Quick Stats */}
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

          {/* Workshop Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md overflow-hidden">
                <div className="relative">
                  {workshop.promoted && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-orange-500 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 z-10">
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-6xl">🔧</div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                        {workshop.name}
                      </CardTitle>
                      {workshop.verified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <Badge variant={workshop.isOpen ? "default" : "secondary"} className={workshop.isOpen ? "bg-green-500" : ""}>
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

                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {workshop.address}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {workshop.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Espera: {workshop.waitTime}</span>
                    </div>
                    <div className="font-medium text-blue-600 text-right">
                      {workshop.price}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 flex items-center gap-1 hover:bg-blue-50"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 group"
                    >
                      Ver Perfil
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Carregar mais oficinas
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Mostrando 3 de 47 oficinas
            </p>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
