
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Wrench, Star } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Encontre Oficinas",
      description: "Pesquise oficinas próximas a você com base em localização e avaliações de outros usuários."
    },
    {
      number: "02", 
      icon: Calendar,
      title: "Agende Serviços",
      description: "Escolha a data e horário que melhor se adequa à sua agenda e agende o serviço desejado."
    },
    {
      number: "03",
      icon: Wrench,
      title: "Acompanhe o Progresso",
      description: "Monitore em tempo real o andamento do seu serviço e receba notificações de status."
    },
    {
      number: "04",
      icon: Star,
      title: "Avalie o Serviço",
      description: "Após a conclusão, avalie a oficina e ajude outros motoristas a fazer boas escolhas."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona a <span className="text-blue-800">OficinaJá</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em poucos passos simples, você encontra a oficina ideal e mantém seu veículo sempre em perfeito estado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 border-gray-100 hover:border-orange-300 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-blue-800" />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-xl text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Pronto para começar?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de motoristas que já confiam na OficinaJá para cuidar dos seus veículos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Cadastrar como Motorista
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                Cadastrar como Oficina
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
