
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import WorkshopForm from '@/components/WorkshopForm';
import DriverForm from '@/components/DriverForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Criar Conta</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Cadastre-se como oficina ou motorista para começar a usar nossa plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="workshop" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="workshop" className="text-lg py-3">
                  Sou uma Oficina
                </TabsTrigger>
                <TabsTrigger value="driver" className="text-lg py-3">
                  Sou um Motorista
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="workshop" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Cadastro de Oficina</h3>
                  <p className="text-gray-600">Registre sua oficina e comece a receber clientes</p>
                </div>
                <WorkshopForm />
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Cadastro de Motorista</h3>
                  <p className="text-gray-600">Encontre as melhores oficinas para seu veículo</p>
                </div>
                <DriverForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
