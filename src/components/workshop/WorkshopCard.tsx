
import React from 'react';
import { Star, Clock, Phone, Navigation, MapPin, Heart, ArrowRight, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Workshop {
  id: number;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  services: string[];
  price: string;
  waitTime: string;
  phone: string;
  address: string;
  image: string;
  isOpen: boolean;
  specialties: string[];
  verified: boolean;
  promoted: boolean;
}

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md overflow-hidden">
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
  );
};

export default WorkshopCard;
