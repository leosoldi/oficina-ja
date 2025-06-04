
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Shield, Zap, Calendar, Heart, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import QuickBookingModal from '@/components/QuickBookingModal';

const WorkshopProfile = () => {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in a real app, this would come from an API based on the ID
  const workshop = {
    id: parseInt(id || '1'),
    name: "Auto Center Premium",
    rating: 4.8,
    reviews: 156,
    distance: "2.3 km",
    address: "Rua das Flores, 123 - Centro, São Paulo",
    phone: "(11) 99999-9999",
    services: ["Revisão Geral", "Troca de Óleo", "Freios", "Suspensão", "Ar Condicionado", "Elétrica"],
    isOpen: true,
    image: "/placeholder.svg",
    price: "$$",
    specialties: ["BMW", "Mercedes", "Audi"],
    openHours: "Seg-Sex: 8h-18h",
    verified: true,
    responseTime: "Responde em 1h",
    description: "Oficina especializada em carros importados com mais de 20 anos de experiência no mercado. Nossa equipe é altamente qualificada e utilizamos equipamentos de última geração para garantir o melhor serviço para seu veículo.",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    about: "Somos uma oficina com tradição no mercado automotivo, especializada em veículos importados. Contamos com mecânicos certificados e equipamentos modernos para diagnóstico e reparo. Nossa missão é oferecer serviços de qualidade com transparência e confiança.",
    workingDays: "Segunda a Sexta",
    workingHours: "08:00 às 18:00",
    saturday: "08:00 às 12:00",
    certifications: ["ISO 9001", "Bosch Car Service", "Certificação Técnica"],
    customerReviews: [
      {
        id: 1,
        name: "Carlos Silva",
        rating: 5,
        date: "15/11/2024",
        comment: "Excelente atendimento! Fizeram a revisão do meu BMW e ficou perfeito. Recomendo muito!",
        service: "Revisão Geral"
      },
      {
        id: 2,
        name: "Maria Santos",
        rating: 5,
        date: "10/11/2024",
        comment: "Profissionais muito competentes. Resolveram o problema do ar condicionado rapidamente.",
        service: "Ar Condicionado"
      },
      {
        id: 3,
        name: "João Oliveira",
        rating: 4,
        date: "08/11/2024",
        comment: "Bom serviço, preço justo. Única observação é que demorou um pouco mais que o previsto.",
        service: "Freios"
      },
      {
        id: 4,
        name: "Ana Costa",
        rating: 5,
        date: "05/11/2024",
        comment: "Oficina de confiança! Sempre levo meu Mercedes aqui. Nunca tive problemas.",
        service: "Troca de Óleo"
      },
      {
        id: 5,
        name: "Pedro Martins",
        rating: 4,
        date: "02/11/2024",
        comment: "Bom trabalho na suspensão. Ficou muito melhor do que estava antes.",
        service: "Suspensão"
      }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
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
                  onClick={() => setIsBookingModalOpen(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Serviço
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sobre */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre a oficina</h2>
                  <p className="text-gray-600 leading-relaxed">{workshop.about}</p>
                </CardContent>
              </Card>

              {/* Serviços */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Serviços oferecidos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {workshop.services.map((service) => (
                      <div key={service} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <span className="text-sm font-medium text-blue-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Especialidades */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Especialidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {workshop.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Avaliações dos Clientes */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Avaliações dos clientes</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(5)}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">{workshop.rating}</span>
                      <span className="text-gray-600">({workshop.reviews} avaliações)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {workshop.customerReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900">{review.name}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500">• {review.date}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {review.service}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full">
                      Ver todas as avaliações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Galeria */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Galeria</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {workshop.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Galeria ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informações de localização */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Endereço</p>
                        <p className="text-sm text-gray-600">{workshop.address}</p>
                        <p className="text-sm text-blue-600 font-medium">{workshop.distance} de distância</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horário de funcionamento */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de funcionamento</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">{workshop.workingDays}</span>
                      <span className="font-semibold text-green-700">{workshop.workingHours}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-gray-700 font-medium">Sábado</span>
                      <span className="font-semibold text-blue-700">{workshop.saturday}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">Domingo</span>
                      <span className="font-semibold text-red-600">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certificações */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificações</h3>
                  <div className="space-y-3">
                    {workshop.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />

      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        workshop={workshop}
      />
    </div>
  );
};

export default WorkshopProfile;
