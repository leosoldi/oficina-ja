
import React from 'react';
import { Car, CheckCircle, AlertTriangle } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';

interface VehicleStatsProps {
  vehicles: Vehicle[];
}

const VehicleStats: React.FC<VehicleStatsProps> = ({ vehicles }) => {
  const isMaintenanceDue = (nextMaintenance?: string) => {
    if (!nextMaintenance) return false;
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total de Veículos</p>
            <p className="text-xl font-bold text-gray-900">{vehicles.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Veículos Ativos</p>
            <p className="text-xl font-bold text-gray-900">
              {vehicles.filter(v => v.status === 'active').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Manutenção Próxima</p>
            <p className="text-xl font-bold text-gray-900">
              {vehicles.filter(v => isMaintenanceDue(v.nextMaintenance)).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStats;
