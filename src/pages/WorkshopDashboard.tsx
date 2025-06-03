
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import DashboardStats from '@/components/workshop/dashboard/DashboardStats';
import AppointmentsList from '@/components/workshop/dashboard/AppointmentsList';
import ServiceManagement from '@/components/workshop/dashboard/ServiceManagement';
import ProfileSettings from '@/components/workshop/dashboard/ProfileSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Settings, Wrench, BarChart3 } from 'lucide-react';

const WorkshopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const workshop = {
    name: 'Oficina do João',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Centro',
    description: 'Oficina especializada em carros nacionais com mais de 20 anos de experiência.',
    workingHours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard da Oficina</h1>
          <p className="text-gray-600 mt-2">Bem-vindo de volta, {workshop.name}!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsList />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ProfileSettings workshop={workshop} />
          </TabsContent>
        </Tabs>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default WorkshopDashboard;
