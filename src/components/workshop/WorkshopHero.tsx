
import React from 'react';
import { ArrowLeft, Star, Navigation, Clock, Phone, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Workshop {
  id: number;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  verified: boolean;
  promoted: boolean;
  address: string;
  phone: string;
  description: string;
}

interface WorkshopHeroProps {
  workshop: Workshop;
}

const WorkshopHero = ({ workshop }: WorkshopHeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/buscar-oficinas')}
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para busca
        </Button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{workshop.name}</h1>
              {workshop.verified && (
                <Shield className="h-6 w-6 text-green-400" />
              )}
              {workshop.promoted && (
                <Badge className="bg-orange-500">
                  <Zap className="h-3 w-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-6 mb-4 text-blue-100">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{workshop.rating}</span>
                <span>({workshop.reviews} avaliações)</span>
              </div>
              <div className="flex items-center gap-1">
                <Navigation className="h-4 w-4" />
                <span>{workshop.distance}</span>
              </div>
              <Badge variant={workshop.isOpen ? "default" : "secondary"} className={workshop.isOpen ? "bg-green-500" : ""}>
                {workshop.isOpen ? 'Aberta agora' : 'Fechada'}
              </Badge>
            </div>

            <p className="text-blue-100 mb-6 text-lg">{workshop.description}</p>

            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Phone className="h-5 w-5 mr-2" />
                Ligar agora
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Clock className="h-5 w-5 mr-2" />
                Agendar serviço
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-8xl mb-4">🔧</div>
              <p className="text-blue-100">Foto da oficina</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopHero;
