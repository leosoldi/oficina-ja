
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Phone, Filter, Search } from 'lucide-react';

const WorkshopSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      name: "Auto Center Premium",
      rating: 4.8,
      reviews: 156,
      distance: "2.3 km",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 99999-9999",
      services: ["Revisão Geral", "Troca de Óleo", "Freios"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$"
    },
    {
      id: 2,
      name: "Mecânica do João",
      rating: 4.6,
      reviews: 89,
      distance: "3.1 km",
      address: "Av. Principal, 456 - Vila Nova",
      phone: "(11) 88888-8888",
      services: ["Motor", "Suspensão", "Elétrica"],
      isOpen: false,
      image: "/placeholder.svg",
      price: "$"
    },
    {
      id: 3,
      name: "Speed Car Service",
      rating: 4.9,
      reviews: 234,
      distance: "1.8 km",
      address: "Rua da Oficina, 789 - Jardim",
      phone: "(11) 77777-7777",
      services: ["Funilaria", "Pintura", "Ar Condicionado"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$$"
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'open', label: 'Aberto agora' },
    { id: 'nearby', label: 'Mais próximos' },
    { id: 'rated', label: 'Melhor avaliados' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        {/* Search Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar oficinas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12 px-6">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oficinas encontradas
            </h1>
            <p className="text-gray-600">
              {workshops.length} oficinas encontradas na sua região
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={workshop.isOpen ? "default" : "secondary"} className={workshop.isOpen ? "bg-green-600" : ""}>
                      {workshop.isOpen ? "Aberto" : "Fechado"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white">
                      {workshop.price}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {workshop.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{workshop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.distance} • {workshop.reviews} avaliações</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{workshop.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {workshop.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {workshop.services.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{workshop.services.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to={`/oficina/${workshop.id}`}>
                        Ver Perfil
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
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

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
