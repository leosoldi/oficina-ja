
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Zap, Calendar, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Workshop {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  image: string;
  price: string;
  isOpen: boolean;
  verified: boolean;
  responseTime: string;
}

interface WorkshopHeroProps {
  workshop: Workshop;
  isFavorite: boolean;
  setIsFavorite: (favorite: boolean) => void;
  onBookingClick: () => void;
}

const WorkshopHero = ({ workshop, isFavorite, setIsFavorite, onBookingClick }: WorkshopHeroProps) => {
  return (
    <>
      {/* Header da página */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/buscar-oficinas">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Perfil da Oficina</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={workshop.image} 
            alt={workshop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Informações principais sobrepostas */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{workshop.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{workshop.rating}</span>
                    <span className="text-gray-600">({workshop.reviews} avaliações)</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {workshop.price}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{workshop.address} • {workshop.distance}</span>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/90"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/90">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={workshop.isOpen ? "default" : "secondary"} className={workshop.isOpen ? "bg-green-500" : ""}>
                {workshop.isOpen ? "Aberto agora" : "Fechado"}
              </Badge>
              {workshop.verified && (
                <Badge className="bg-blue-500">
                  <Shield className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              )}
              <Badge variant="outline">
                <Zap className="h-3 w-3 mr-1" />
                {workshop.responseTime}
              </Badge>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={onBookingClick}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Serviço
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkshopHero;
