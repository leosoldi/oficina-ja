
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Fuel, 
  Wrench, 
  FileText, 
  Shield, 
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import EditVehicleDialog from './EditVehicleDialog';
import MaintenanceHistoryDialog from './MaintenanceHistoryDialog';

interface VehicleCardProps {
  vehicle: Vehicle;
  onUpdateVehicle: (updatedVehicle: Vehicle) => void;
  maintenanceHistory: any[];
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onUpdateVehicle, maintenanceHistory }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'maintenance': return 'Em Manutenção';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const getFuelTypeText = (fuelType: string) => {
    switch (fuelType) {
      case 'gasoline': return 'Gasolina';
      case 'ethanol': return 'Etanol';
      case 'flex': return 'Flex';
      case 'diesel': return 'Diesel';
      case 'electric': return 'Elétrico';
      case 'hybrid': return 'Híbrido';
      default: return fuelType;
    }
  };

  const getDocumentStatus = (documents: Vehicle['documents']) => {
    const total = Object.keys(documents).length;
    const valid = Object.values(documents).filter(Boolean).length;
    return { valid, total, percentage: (valid / total) * 100 };
  };

  const isMaintenanceDue = (nextMaintenance?: string) => {
    if (!nextMaintenance) return false;
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const docStatus = getDocumentStatus(vehicle.documents);
  const maintenanceDue = isMaintenanceDue(vehicle.nextMaintenance);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
              <p className="text-sm text-gray-600">{vehicle.year} • {vehicle.plate}</p>
            </div>
          </div>
          <Badge className={getStatusColor(vehicle.status)}>
            {getStatusText(vehicle.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vehicle.color.toLowerCase() === 'prata' ? '#C0C0C0' : vehicle.color.toLowerCase() === 'branco' ? '#FFFFFF' : vehicle.color.toLowerCase() === 'azul' ? '#0000FF' : '#000000' }}></div>
            <span className="text-gray-600">{vehicle.color}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{getFuelTypeText(vehicle.fuelType)}</span>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Car className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{vehicle.mileage.toLocaleString('pt-BR')} km</span>
          </div>
        </div>

        {/* Maintenance Info */}
        {vehicle.nextMaintenance && (
          <div className={`p-3 rounded-lg ${maintenanceDue ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <Wrench className={`h-4 w-4 ${maintenanceDue ? 'text-yellow-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium text-gray-700">Próxima Revisão</span>
            </div>
            <p className="text-sm text-gray-600">
              {new Date(vehicle.nextMaintenance).toLocaleDateString('pt-BR')}
            </p>
            {maintenanceDue && (
              <p className="text-xs text-yellow-600 mt-1">⚠️ Revisão próxima</p>
            )}
          </div>
        )}

        {/* Documents Status */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Documentos</span>
            <span className="text-sm text-gray-600">{docStatus.valid}/{docStatus.total}</span>
          </div>
          <div className="flex space-x-1 mb-2">
            <div className={`flex-1 h-2 rounded-full ${vehicle.documents.registration ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${vehicle.documents.insurance ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${vehicle.documents.inspection ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <span>CRLV</span>
              {vehicle.documents.registration && <CheckCircle className="h-3 w-3 text-green-500" />}
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Seguro</span>
              {vehicle.documents.insurance && <CheckCircle className="h-3 w-3 text-green-500" />}
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Vistoria</span>
              {vehicle.documents.inspection && <CheckCircle className="h-3 w-3 text-green-500" />}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <EditVehicleDialog vehicle={vehicle} onSave={onUpdateVehicle} />
          <MaintenanceHistoryDialog vehicle={vehicle} maintenanceHistory={maintenanceHistory} />
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
