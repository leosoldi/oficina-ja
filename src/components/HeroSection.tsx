
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
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

  return (
    <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Esquerda - Texto Promocional */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Conectando seu carro às <span className="text-orange-500">melhores oficinas</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Encontre profissionais qualificados, agende serviços e receba assistência para seu veículo de forma rápida e simples.
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <a href="/cadastro">Cadastre-se Grátis</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white/30 px-8 py-4 text-lg backdrop-blur-sm"
              >
                Como Funciona
              </Button>
            </div>
          </div>

          {/* Direita - Busca de Serviços */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Encontre serviços próximos
              </h3>

              <div className="space-y-4">
                {/* Campo de Localização */}
                <div>
                  <Input
                    type="text"
                    placeholder="Digite sua localização"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-12 bg-white/20 text-white placeholder-white/70 border-white/30 rounded-lg backdrop-blur-sm"
                  />
                </div>

                {/* Dropdown de Serviços */}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 bg-white/20 text-white border-white/30 rounded-lg justify-between hover:bg-white/30 backdrop-blur-sm"
                      >
                        {selectedService}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white">
                      {services.map((service) => (
                        <DropdownMenuItem
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className="cursor-pointer hover:bg-gray-100"
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
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Buscar Oficinas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
