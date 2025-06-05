
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickActions from '@/components/dashboard/QuickActions';
import TodayAppointments from '@/components/dashboard/TodayAppointments';
import RecentQuotes from '@/components/dashboard/RecentQuotes';

const WorkshopDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, <span className="text-orange-500">Oficina Central</span>
          </h1>
          <p className="text-gray-600">Gerencie seus serviços, agendamentos e clientes de forma eficiente.</p>
        </div>

        <StatsCards />
        <QuickActions />

        <div className="grid lg:grid-cols-2 gap-8">
          <TodayAppointments />
          <RecentQuotes />
        </div>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
