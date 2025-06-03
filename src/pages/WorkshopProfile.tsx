
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Phone, Calendar, Users, Award } from 'lucide-react';

const WorkshopProfile = () => {
  const { id } = useParams();

  const workshop = {
    id: 1,
    name: 'Auto Center Silva',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    phone: '(11) 99999-9999',
    rating: 4.8,
    reviews: 127,
    openNow: true,
    description: 'Oficina especializada em serviços automotivos com mais de 15 anos de experiência no mercado.',
    services: [
      { name: 'Revisão Geral', price: 'R$ 150,00', duration: '2 horas' },
      { name: 'Troca de Óleo', price: 'R$ 80,00', duration: '30 min' },
      { name: 'Freios', price: 'R$ 200,00', duration: '1 hora' },
      { name: 'Suspensão', price: 'R$ 300,00', duration: '3 horas' },
    ],
    hours: {
      'Segunda a Sexta': '08:00 - 18:00',
      'Sábado': '08:00 - 12:00',
      'Domingo': 'Fechado'
    },
    certifications: ['ISO 9001', 'Certificado SEBRAE', 'Autorizada Bosch']
  };

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{workshop.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-blue-100">{workshop.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{workshop.rating}</span>
                      <span className="text-blue-100">({workshop.reviews} avaliações)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className={workshop.openNow ? 'text-green-200' : 'text-red-200'}>
                        {workshop.openNow ? 'Aberto agora' : 'Fechado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 bg-white text-blue-600 hover:bg-blue-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600" asChild>
                  <a href={`/agendar/${workshop.id}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sobre a Oficina</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{workshop.description}</p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Serviços Oferecidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workshop.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">Duração: {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{service.price}</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Agendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hours and Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Horário de Funcionamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(workshop.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-600">{day}</span>
                      <span className="font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Awar
d className="h-5 w-5" />
                  <span>Certificações</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {workshop.certifications.map((cert, index) => (
                    <div key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm">
                      {cert}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Avaliações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {["JC", "MS", "AP"][index]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{["João C.", "Maria S.", "Ana P."][index]}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < [4, 5, 4][index] ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {["2 dias atrás", "1 semana atrás", "3 semanas atrás"][index]}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {[
                        "Ótimo serviço, rápido e eficiente. Recomendo para todos que precisam de revisão.",
                        "Excelente atendimento e ótimos preços. Os mecânicos são muito profissionais.",
                        "Consegui agendar com facilidade e o serviço foi muito bem feito. Voltarei com certeza."
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Ver todas as avaliações
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopProfile;
