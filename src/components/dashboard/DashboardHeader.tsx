
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </h1>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <h2 className="hidden md:block text-lg font-semibold text-gray-700">Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-semibold">OJ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
