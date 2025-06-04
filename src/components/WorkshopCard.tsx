
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Phone, Heart, Shield, Zap } from 'lucide-react';

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

interface WorkshopCardProps {
  workshop: Workshop;
  index: number;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

const WorkshopCard = ({ workshop, index, favorites, toggleFavorite }: WorkshopCardProps) => {
  return (
    <Card 
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
  );
};

export default WorkshopCard;
