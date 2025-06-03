
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import WorkshopForm from '@/components/WorkshopForm';
import DriverForm from '@/components/DriverForm';
import { Wrench, User, Star, Shield, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-purple-200/15 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '4s'
        }}></div>
      </div>

      {/* Mobile Header with Back Button */}
      <div className="md:hidden relative z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" asChild className="p-2">
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Cadastrar</h1>
          <div className="w-9"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 py-4 md:py-8 lg:py-12">
        {/* Desktop Title Section */}
        <div className="hidden md:block text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg border border-white/20">
            <Star className="h-4 w-4 mr-2" />
            Junte-se à Nossa Comunidade
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Crie sua{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600">
              conta hoje
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Cadastre-se como oficina ou motorista e faça parte da maior rede de serviços automotivos do Brasil.
          </p>
          
          {/* Benefits preview - Desktop only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">100% Seguro</h3>
              <p className="text-xs text-gray-600">Plataforma confiável e segura</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Rápido e Fácil</h3>
              <p className="text-xs text-gray-600">Cadastro em poucos minutos</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Gratuito</h3>
              <p className="text-xs text-gray-600">Sem taxas de adesão</p>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-xl animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
          <CardHeader className="text-center pb-4 md:pb-6 pt-6 md:pt-8">
            {/* Mobile Title */}
            <div className="md:hidden mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Criar conta
              </h2>
              <p className="text-gray-600 text-sm">
                Junte-se à nossa comunidade hoje mesmo
              </p>
              
              {/* Mobile Benefits */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-blue-700 font-medium">Seguro</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                  <p className="text-xs text-orange-700 font-medium">Rápido</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg">
                  <Star className="h-4 w-4 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-green-700 font-medium">Grátis</p>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 md:px-6 pb-6 md:pb-8">
            <Tabs defaultValue="workshop" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 h-11 md:h-12 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1">
                <TabsTrigger value="workshop" className="text-sm md:text-base py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md">
                  <Wrench className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Sou uma </span>Oficina
                </TabsTrigger>
                <TabsTrigger value="driver" className="text-sm md:text-base py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-all duration-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md">
                  <User className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Sou um </span>Motorista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="workshop" className="space-y-4 md:space-y-6 animate-fade-in">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 md:p-4 rounded-xl mb-4">
                    <Wrench className="h-6 md:h-8 w-6 md:w-8 text-blue-700 mx-auto mb-2 md:mb-3" />
                    <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-1">Cadastro de Oficina</h3>
                    <p className="text-blue-700 text-sm md:text-base">Registre sua oficina e comece a receber clientes hoje mesmo</p>
                  </div>
                </div>
                <WorkshopForm />
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-4 md:space-y-6 animate-fade-in">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-3 md:p-4 rounded-xl mb-4">
                    <User className="h-6 md:h-8 w-6 md:w-8 text-orange-700 mx-auto mb-2 md:mb-3" />
                    <h3 className="text-lg md:text-xl font-bold text-orange-900 mb-1">Cadastro de Motorista</h3>
                    <p className="text-orange-700 text-sm md:text-base">Encontre as melhores oficinas e cuide do seu veículo</p>
                  </div>
                </div>
                <DriverForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Social proof - Desktop only */}
        <div className="hidden md:block mt-12 text-center animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Mais de <span className="text-blue-600">6.000 usuários</span> já confiam na OficinaJá
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-white/20">
              <div className="text-gray-500 font-semibold text-sm">Parceiro Confiável</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-white/20">
              <div className="text-gray-500 font-semibold text-sm">Certificado SSL</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-white/20">
              <div className="text-gray-500 font-semibold text-sm">LGPD Compliant</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom padding */}
      <div className="h-16 md:h-0"></div>
    </div>
  );
};

export default Register;
