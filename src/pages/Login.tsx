
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import WorkshopLoginForm from '@/components/WorkshopLoginForm';
import DriverLoginForm from '@/components/DriverLoginForm';
import { Wrench, User } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />
      
      <div className="relative max-w-5xl mx-auto px-4 py-12 lg:py-20">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-white/20">
            <User className="h-4 w-4 mr-2" />
            Acesso à Plataforma
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Bem-vindo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600">
              de volta!
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entre na sua conta para acessar nossa plataforma e conectar-se com a melhor rede de oficinas e motoristas.
          </p>
        </div>

        <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="text-center pb-8 pt-12">
            <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Faça seu Login
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha seu tipo de conta e entre para aproveitar todos os recursos da nossa plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-12">
            <Tabs defaultValue="workshop" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 h-16 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2">
                <TabsTrigger 
                  value="workshop" 
                  className="text-lg py-4 px-6 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transform data-[state=active]:scale-105"
                >
                  <Wrench className="h-5 w-5 mr-2" />
                  Sou uma Oficina
                </TabsTrigger>
                <TabsTrigger 
                  value="driver" 
                  className="text-lg py-4 px-6 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transform data-[state=active]:scale-105"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sou um Motorista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="workshop" className="space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl mb-6">
                    <Wrench className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">Portal da Oficina</h3>
                    <p className="text-blue-700 text-lg">Gerencie seus serviços e clientes de forma eficiente</p>
                  </div>
                </div>
                <WorkshopLoginForm />
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-2xl mb-6">
                    <User className="h-12 w-12 text-orange-700 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-orange-900 mb-2">Portal do Motorista</h3>
                    <p className="text-orange-700 text-lg">Encontre as melhores oficinas para seu veículo</p>
                  </div>
                </div>
                <DriverLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Oficinas Cadastradas</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">5000+</div>
              <div className="text-gray-600">Motoristas Ativos</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">15000+</div>
              <div className="text-gray-600">Serviços Realizados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
