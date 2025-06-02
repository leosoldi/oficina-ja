
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
  MapPin
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

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200 hover:border-orange-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-100 p-3 rounded-lg shrink-0">
            <Icon className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Motoristas Section */}
        <div id="motoristas" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Para <span className="text-blue-800">Motoristas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tenha controle total sobre a manutenção do seu veículo com nossa plataforma completa e intuitiva.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motoristaFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Oficinas Section */}
        <div id="oficinas">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Para <span className="text-orange-500">Oficinas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gerencie seu negócio com eficiência e alcance mais clientes através da nossa plataforma.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oficinaFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
