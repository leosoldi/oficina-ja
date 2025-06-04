
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppointmentHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard-oficina" className="text-gray-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </h1>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <h2 className="hidden md:block text-lg font-semibold text-gray-700">Agendamentos</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentHeader;
