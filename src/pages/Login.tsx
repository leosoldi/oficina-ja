import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import WorkshopLoginForm from '@/components/WorkshopLoginForm';
import DriverLoginForm from '@/components/DriverLoginForm';
const Login = () => {
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="w-full">
          <CardHeader>
            
            
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
                  <h3 className="text-xl font-semibold text-gray-900">Login de Oficina</h3>
                  <p className="text-gray-600">Acesse sua conta para gerenciar seus serviços</p>
                </div>
                <WorkshopLoginForm />
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Login de Motorista</h3>
                  <p className="text-gray-600">Acesse sua conta para encontrar oficinas</p>
                </div>
                <DriverLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;