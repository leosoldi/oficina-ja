
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Star, Users, Award } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeroSection = () => {
  const [selectedService, setSelectedService] = React.useState('Selecione o serviço');
  const [location, setLocation] = React.useState('');

  const services = [
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

  const stats = [
    { icon: Users, value: '10K+', label: 'Motoristas' },
    { icon: Award, value: '500+', label: 'Oficinas' },
    { icon: Star, value: '4.8', label: 'Avaliação' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Esquerda - Texto Promocional */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/20">
                <Star className="h-4 w-4 text-orange-400 mr-2" />
                A plataforma mais confiável do Brasil
              </div>
              
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Conectando seu carro às{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  melhores oficinas
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                Encontre profissionais qualificados, agende serviços e receba assistência para seu veículo de forma rápida e simples.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <stat.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <a href="/cadastro">Cadastre-se Grátis</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                Como Funciona
              </Button>
            </div>
          </div>

          {/* Direita - Busca de Serviços */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
              <div className="text-center mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Encontre serviços próximos
                </h3>
                <p className="text-blue-100">Mais de 500 oficinas cadastradas</p>
              </div>

              <div className="space-y-4">
                {/* Campo de Localização */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">Sua localização</label>
                  <Input
                    type="text"
                    placeholder="Digite sua cidade ou CEP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-12 bg-white/20 text-white placeholder-white/60 border-white/30 rounded-xl backdrop-blur-sm focus:bg-white/25 focus:border-orange-400 transition-all duration-300"
                  />
                </div>

                {/* Dropdown de Serviços */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">Tipo de serviço</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 bg-white/20 text-white border-white/30 rounded-xl justify-between hover:bg-white/25 backdrop-blur-sm focus:border-orange-400 transition-all duration-300"
                      >
                        {selectedService}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white shadow-xl rounded-xl border-0 z-50">
                      {services.map((service) => (
                        <DropdownMenuItem
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 rounded-lg mx-1 transition-colors"
                        >
                          {service}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Botão de Busca */}
                <Button
                  size="lg"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6"
                >
                  <Search className="h-5 w-5" />
                  Buscar Oficinas
                </Button>
              </div>

              {/* Badge de confiança */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Busca 100% gratuita
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
