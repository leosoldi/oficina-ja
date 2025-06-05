
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Plus, 
  Fuel, 
  Calendar, 
  FileText, 
  Shield, 
  Wrench, 
  Settings,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import { Vehicle } from '@/types/vehicle';

const DriverVehicles = () => {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      plate: 'ABC-1234',
      color: 'Prata',
      mileage: 45000,
      fuelType: 'flex',
      lastMaintenance: '2024-04-15',
      nextMaintenance: '2024-08-15',
      documents: {
        registration: true,
        insurance: true,
        inspection: false
      },
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2018,
      plate: 'XYZ-5678',
      color: 'Branco',
      mileage: 78000,
      fuelType: 'flex',
      lastMaintenance: '2024-05-20',
      nextMaintenance: '2024-09-20',
      documents: {
        registration: true,
        insurance: true,
        inspection: true
      },
      status: 'active',
      createdAt: '2024-02-05'
    },
    {
      id: '3',
      brand: 'Volkswagen',
      model: 'Gol',
      year: 2016,
      plate: 'DEF-9012',
      color: 'Azul',
      mileage: 120000,
      fuelType: 'flex',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-07-10',
      documents: {
        registration: true,
        insurance: false,
        inspection: true
      },
      status: 'maintenance',
      createdAt: '2024-01-15'
    }
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <DriverHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Meus Veículos 🚗
                </h1>
                <p className="text-gray-600">Gerencie seus veículos e acompanhe a manutenção</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Veículo
              </Button>
            </div>
            
            {/* Quick Stats */}
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
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {vehicles.map((vehicle) => {
            const docStatus = getDocumentStatus(vehicle.documents);
            const maintenanceDue = isMaintenanceDue(vehicle.nextMaintenance);
            
            return (
              <Card key={vehicle.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {vehicles.length === 0 && (
          <div className="text-center py-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum veículo cadastrado</h3>
            <p className="text-gray-600 mb-6">Adicione seu primeiro veículo para começar</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Veículo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverVehicles;
