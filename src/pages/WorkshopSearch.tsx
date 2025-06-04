
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Phone, Filter, Search, Heart, Navigation, Award, Zap, Shield, ThumbsUp } from 'lucide-react';

const WorkshopSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      name: "Auto Center Premium",
      rating: 4.8,
      reviews: 156,
      distance: "2.3 km",
      address: "Rua das Flores, 123 - Centro, São Paulo",
      phone: "(11) 99999-9999",
      services: ["Revisão Geral", "Troca de Óleo", "Freios", "Suspensão"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$",
      specialties: ["BMW", "Mercedes", "Audi"],
      openHours: "Seg-Sex: 8h-18h",
      verified: true,
      responseTime: "Responde em 1h",
      description: "Oficina especializada em carros importados com mais de 20 anos de experiência."
    },
    {
      id: 2,
      name: "Mecânica do João",
      rating: 4.6,
      reviews: 89,
      distance: "3.1 km",
      address: "Av. Principal, 456 - Vila Nova, São Paulo",
      phone: "(11) 88888-8888",
      services: ["Motor", "Suspensão", "Elétrica", "Diagnóstico"],
      isOpen: false,
      image: "/placeholder.svg",
      price: "$",
      specialties: ["Toyota", "Honda", "Hyundai"],
      openHours: "Seg-Sáb: 7h-17h",
      verified: true,
      responseTime: "Responde em 30min",
      description: "Serviços automotivos populares com preços justos e qualidade garantida."
    },
    {
      id: 3,
      name: "Speed Car Service",
      rating: 4.9,
      reviews: 234,
      distance: "1.8 km",
      address: "Rua da Oficina, 789 - Jardim, São Paulo",
      phone: "(11) 77777-7777",
      services: ["Funilaria", "Pintura", "Ar Condicionado", "Vidros"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$$",
      specialties: ["Ford", "Chevrolet", "Volkswagen"],
      openHours: "Seg-Sex: 8h-18h",
      verified: true,
      responseTime: "Responde em 2h",
      description: "Funilaria e pintura automotiva com tecnologia de ponta e acabamento premium."
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos', icon: Award },
    { id: 'open', label: 'Aberto agora', icon: Clock },
    { id: 'nearby', label: 'Mais próximos', icon: Navigation },
    { id: 'rated', label: 'Melhor avaliados', icon: Star }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        {/* Hero Search Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                Encontre as{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  melhores oficinas
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                {workshops.length} oficinas verificadas na sua região
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Buscar por nome, serviço ou localização..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 bg-white/20 text-white placeholder-white/60 border-white/30 rounded-xl backdrop-blur-sm focus:bg-white/25 focus:border-orange-400 transition-all duration-300"
                    />
                  </div>
                  <Button 
                    className="h-14 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
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

        {/* Results Section */}
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
              <Card 
                key={workshop.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={workshop.isOpen ? "default" : "secondary"} className={`${workshop.isOpen ? "bg-green-500 hover:bg-green-600" : ""} shadow-lg`}>
                      {workshop.isOpen ? (
                        <>
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                          Aberto
                        </>
                      ) : "Fechado"}
                    </Badge>
                    {workshop.verified && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 shadow-lg">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  
                  {/* Price and Favorite */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm shadow-lg">
                      {workshop.price}
                    </Badge>
                    <button
                      onClick={() => toggleFavorite(workshop.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.includes(workshop.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Rating overlay */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{workshop.rating}</span>
                      <span className="text-xs text-gray-600">({workshop.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {workshop.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {workshop.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="flex-1">{workshop.address}</span>
                      <span className="font-medium text-blue-600">{workshop.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{workshop.openHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span>{workshop.responseTime}</span>
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {workshop.services.slice(0, 3).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {service}
                        </Badge>
                      ))}
                      {workshop.services.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                          +{workshop.services.length - 3} mais
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-1">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {workshop.specialties.map((specialty) => (
                        <span key={specialty} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Link to={`/oficina/${workshop.id}`}>
                        Ver Perfil
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-green-50 hover:border-green-300 hover:scale-110 transition-all duration-300">
                      <Phone className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
