
import React from 'react';
import { Button } from '@/components/ui/button';
import { Car, Wrench, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Conecte seu <span className="text-orange-500">veículo</span> às melhores oficinas
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Encontre oficinas confiáveis próximas a você, agende serviços, acompanhe o progresso e avalie o atendimento. Tudo em uma plataforma segura e fácil de usar.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Sou Motorista
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg"
              >
                Sou Oficina
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-blue-200">Motoristas</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-blue-200">Oficinas</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-blue-200">Serviços Realizados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-500 rounded-lg p-6 text-center">
                  <Car className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Motoristas</h3>
                  <p className="text-sm text-orange-100 mt-2">
                    Encontre oficinas confiáveis e agende serviços
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-6 text-center">
                  <Wrench className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Oficinas</h3>
                  <p className="text-sm text-blue-100 mt-2">
                    Gerencie agendamentos e alcance mais clientes
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Agendamento em progresso...</span>
                  <span className="text-orange-400 text-sm">85%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-[85%]"></div>
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
