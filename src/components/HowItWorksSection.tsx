import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Wrench, Star, ArrowRight } from 'lucide-react';
const HowItWorksSection = () => {
  const steps = [{
    number: "01",
    icon: Search,
    title: "Encontre Oficinas",
    description: "Pesquise oficinas próximas a você com base em localização e avaliações de outros usuários."
  }, {
    number: "02",
    icon: Calendar,
    title: "Agende Serviços",
    description: "Escolha a data e horário que melhor se adequa à sua agenda e agende o serviço desejado."
  }, {
    number: "03",
    icon: Wrench,
    title: "Acompanhe o Progresso",
    description: "Monitore em tempo real o andamento do seu serviço e receba notificações de status."
  }, {
    number: "04",
    icon: Star,
    title: "Avalie o Serviço",
    description: "Após a conclusão, avalie a oficina e ajude outros motoristas a fazer boas escolhas."
  }];
  return <section id="como-funciona" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 py-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-orange-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4 mr-2" />
            Processo Simples
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Como Funciona a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
              OficinaJá
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Em poucos passos simples, você encontra a oficina ideal e mantém seu veículo sempre em perfeito estado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => <div key={index} className="relative animate-fade-in" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <Card className="relative border-2 border-gray-100 hover:border-orange-300 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 bg-white overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="relative z-10 bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-blue-700" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-semibold text-xl text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>}
            </div>)}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in" style={{
        animationDelay: '0.8s'
      }}>
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Pronto para começar?
              </h3>
              <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de motoristas que já confiam na OficinaJá para cuidar dos seus veículos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  Cadastrar como Motorista
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  Cadastrar como Oficina
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;