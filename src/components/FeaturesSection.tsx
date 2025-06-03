
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Car, 
  Calendar, 
  FileText, 
  Clock, 
  Star, 
  CheckCircle,
  Settings,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';

const FeaturesSection = () => {
  const motoristaFeatures = [
    {
      icon: Car,
      title: "Cadastro de Veículos",
      description: "Registre informações completas do seu veículo: modelo, ano, cor e placa."
    },
    {
      icon: Calendar,
      title: "Agendamento Fácil",
      description: "Agende revisões e manutenções em qualquer oficina disponível na plataforma."
    },
    {
      icon: FileText,
      title: "Histórico Completo",
      description: "Acesse o histórico de peças trocadas e serviços realizados no seu veículo."
    },
    {
      icon: CheckCircle,
      title: "Orçamento Digital",
      description: "Visualize e aprove orçamentos enviados pelas oficinas de forma digital."
    },
    {
      icon: Clock,
      title: "Acompanhamento em Tempo Real",
      description: "Monitore o status do serviço: aguardando peça, montando, finalizado."
    },
    {
      icon: Star,
      title: "Avaliação de Serviços",
      description: "Avalie as oficinas com base na qualidade do serviço prestado."
    }
  ];

  const oficinaFeatures = [
    {
      icon: Settings,
      title: "Perfil Personalizado",
      description: "Configure seu perfil com informações, localização e serviços oferecidos."
    },
    {
      icon: Users,
      title: "Gestão de Agendamentos",
      description: "Controle total sobre datas e horários dos agendamentos dos clientes."
    },
    {
      icon: FileText,
      title: "Checklist Personalizado",
      description: "Crie checklists customizados para entrada e saída de veículos."
    },
    {
      icon: CheckCircle,
      title: "Orçamentos Rápidos",
      description: "Gere e envie orçamentos rapidamente para aprovação dos motoristas."
    },
    {
      icon: Clock,
      title: "Ordem de Serviço",
      description: "Converta orçamentos aprovados em ordens de serviço facilmente."
    },
    {
      icon: MapPin,
      title: "Histórico Centralizado",
      description: "Acesso rápido ao histórico de serviços e peças dos seus clientes."
    }
  ];

  const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-gray-200 hover:border-orange-300 hover:-translate-y-2 bg-white overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
              <div className="flex items-center text-orange-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                Saiba mais
                <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Motoristas Section */}
        <div id="motoristas" className="mb-24">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Car className="h-4 w-4 mr-2" />
              Para Motoristas
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tenha controle total do seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                veículo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossa plataforma completa e intuitiva oferece todas as ferramentas necessárias para manter seu veículo sempre em perfeito estado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motoristaFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>

        {/* Oficinas Section */}
        <div id="oficinas">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Settings className="h-4 w-4 mr-2" />
              Para Oficinas
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Gerencie seu negócio com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                eficiência
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Alcance mais clientes e otimize seus processos através da nossa plataforma completa de gestão.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oficinaFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Pronto para começar sua jornada?
              </h3>
              <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de motoristas e oficinas que já confiam na OficinaJá.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Cadastrar como Motorista
                </button>
                <button className="bg-white hover:bg-gray-100 text-blue-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Cadastrar como Oficina
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
