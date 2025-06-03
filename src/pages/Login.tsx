
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import WorkshopLoginForm from '@/components/WorkshopLoginForm';
import DriverLoginForm from '@/components/DriverLoginForm';
import { Wrench, User } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 relative overflow-hidden mobile-scroll pb-16 md:pb-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200/15 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '4s'
        }}></div>
      </div>

      <Header />
      
      <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-2 md:px-4 md:py-2 rounded-full text-sm font-medium mb-3 md:mb-4 shadow-lg border border-white/20">
            <User className="h-4 w-4 mr-2" />
            Acesso à Plataforma
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Bem-vindo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600">
              de volta!
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Entre na sua conta para acessar nossa plataforma e conectar-se com a melhor rede de oficinas e motoristas.
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-xl animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
          <CardHeader className="text-center pb-4 md:pb-6 pt-6 md:pt-8">
            
          </CardHeader>
          <CardContent className="px-4 md:px-6 pb-6 md:pb-8">
            <Tabs defaultValue="workshop" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 h-11 md:h-12 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1">
                <TabsTrigger value="workshop" className="text-sm md:text-base py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md touch-target">
                  <Wrench className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sou uma </span>Oficina
                </TabsTrigger>
                <TabsTrigger value="driver" className="text-sm md:text-base py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-all duration-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md touch-target">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sou um </span>Motorista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="workshop" className="space-y-4 md:space-y-6 animate-fade-in">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 md:p-4 rounded-xl mb-4">
                    <Wrench className="h-6 w-6 md:h-8 md:w-8 text-blue-700 mx-auto mb-2 md:mb-3" />
                    <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-1">Portal da Oficina</h3>
                    <p className="text-sm md:text-base text-blue-700">Gerencie seus serviços e clientes de forma eficiente</p>
                  </div>
                </div>
                <WorkshopLoginForm />
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-4 md:space-y-6 animate-fade-in">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-3 md:p-4 rounded-xl mb-4">
                    <User className="h-6 w-6 md:h-8 md:w-8 text-orange-700 mx-auto mb-2 md:mb-3" />
                    <h3 className="text-lg md:text-xl font-bold text-orange-900 mb-1">Portal do Motorista</h3>
                    <p className="text-sm md:text-base text-orange-700">Encontre as melhores oficinas para seu veículo</p>
                  </div>
                </div>
                <DriverLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trust indicators - Mobile optimized */}
        <div className="mt-8 md:mt-12 text-center animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
            <div className="bg-white/60 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">1000+</div>
              <div className="text-xs md:text-sm text-gray-600">Oficinas Cadastradas</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1">5000+</div>
              <div className="text-xs md:text-sm text-gray-600">Motoristas Ativos</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">15000+</div>
              <div className="text-xs md:text-sm text-gray-600">Serviços Realizados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
