
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  CheckCircle,
  History,
  Clock,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import { Vehicle } from '@/types/vehicle';

interface MaintenanceRecord {
  id: string;
  date: string;
  workshop: string;
  location: string;
  type: 'maintenance' | 'repair' | 'inspection';
  services: string[];
  parts: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalCost: number;
  description: string;
}

const DriverVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
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

  const [maintenanceHistory] = useState<Record<string, MaintenanceRecord[]>>({
    '1': [
      {
        id: 'maint-1',
        date: '2024-04-15',
        workshop: 'Auto Center Silva',
        location: 'São Paulo, SP',
        type: 'maintenance',
        services: ['Troca de óleo', 'Filtro de ar', 'Revisão geral'],
        parts: [
          { name: 'Óleo motor 5W30', quantity: 4, price: 35.00 },
          { name: 'Filtro de ar', quantity: 1, price: 25.00 },
          { name: 'Filtro de óleo', quantity: 1, price: 15.00 }
        ],
        totalCost: 320.00,
        description: 'Revisão dos 45.000km conforme manual do fabricante'
      },
      {
        id: 'maint-2',
        date: '2024-01-20',
        workshop: 'Oficina Central',
        location: 'São Paulo, SP',
        type: 'repair',
        services: ['Troca de pastilhas de freio', 'Alinhamento'],
        parts: [
          { name: 'Pastilhas de freio dianteiras', quantity: 1, price: 80.00 },
          { name: 'Pastilhas de freio traseiras', quantity: 1, price: 60.00 }
        ],
        totalCost: 280.00,
        description: 'Substituição de pastilhas devido ao desgaste'
      }
    ],
    '2': [
      {
        id: 'maint-3',
        date: '2024-05-20',
        workshop: 'Toyota Autorizada',
        location: 'São Paulo, SP',
        type: 'maintenance',
        services: ['Revisão completa', 'Troca de correia dentada'],
        parts: [
          { name: 'Correia dentada', quantity: 1, price: 120.00 },
          { name: 'Tensor da correia', quantity: 1, price: 45.00 },
          { name: 'Bomba d\'água', quantity: 1, price: 85.00 }
        ],
        totalCost: 450.00,
        description: 'Revisão dos 78.000km com substituição preventiva da correia dentada'
      }
    ],
    '3': [
      {
        id: 'maint-4',
        date: '2024-03-10',
        workshop: 'VW Service',
        location: 'São Paulo, SP',
        type: 'repair',
        services: ['Reparo no sistema elétrico', 'Substituição de alternador'],
        parts: [
          { name: 'Alternador', quantity: 1, price: 280.00 },
          { name: 'Cabo de bateria', quantity: 1, price: 35.00 }
        ],
        totalCost: 450.00,
        description: 'Problema no sistema de carga da bateria'
      }
    ]
  });

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

  const getMaintenanceTypeColor = (type: MaintenanceRecord['type']) => {
    switch (type) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'repair': return 'bg-orange-100 text-orange-800';
      case 'inspection': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceTypeText = (type: MaintenanceRecord['type']) => {
    switch (type) {
      case 'maintenance': return 'Manutenção';
      case 'repair': return 'Reparo';
      case 'inspection': return 'Vistoria';
      default: return type;
    }
  };

  const EditVehicleDialog = ({ vehicle }: { vehicle: Vehicle }) => {
    const [editData, setEditData] = useState({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year.toString(),
      plate: vehicle.plate,
      color: vehicle.color,
      mileage: vehicle.mileage.toString(),
      fuelType: vehicle.fuelType
    });

    const handleSave = () => {
      const updatedVehicles = vehicles.map(v => 
        v.id === vehicle.id 
          ? {
              ...v,
              brand: editData.brand,
              model: editData.model,
              year: parseInt(editData.year),
              plate: editData.plate,
              color: editData.color,
              mileage: parseInt(editData.mileage),
              fuelType: editData.fuelType as Vehicle['fuelType']
            }
          : v
      );
      setVehicles(updatedVehicles);
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Editar Veículo</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={editData.brand}
                  onChange={(e) => setEditData({...editData, brand: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  value={editData.model}
                  onChange={(e) => setEditData({...editData, model: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Ano</Label>
                <Input
                  id="year"
                  type="number"
                  value={editData.year}
                  onChange={(e) => setEditData({...editData, year: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="plate">Placa</Label>
                <Input
                  id="plate"
                  value={editData.plate}
                  onChange={(e) => setEditData({...editData, plate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">Cor</Label>
                <Input
                  id="color"
                  value={editData.color}
                  onChange={(e) => setEditData({...editData, color: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="mileage">Quilometragem</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={editData.mileage}
                  onChange={(e) => setEditData({...editData, mileage: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fuelType">Tipo de Combustível</Label>
              <Select value={editData.fuelType} onValueChange={(value: Vehicle['fuelType']) => setEditData({...editData, fuelType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasolina</SelectItem>
                  <SelectItem value="ethanol">Etanol</SelectItem>
                  <SelectItem value="flex">Flex</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Elétrico</SelectItem>
                  <SelectItem value="hybrid">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const MaintenanceHistoryDialog = ({ vehicle }: { vehicle: Vehicle }) => {
    const history = maintenanceHistory[vehicle.id] || [];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1">
            <History className="h-4 w-4 mr-2" />
            Histórico
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Histórico de Manutenção - {vehicle.brand} {vehicle.model}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum histórico encontrado</h3>
                <p className="text-gray-600">Este veículo ainda não possui registros de manutenção</p>
              </div>
            ) : (
              history.map((record) => (
                <Card key={record.id} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{record.workshop}</h4>
                            <Badge className={getMaintenanceTypeColor(record.type)}>
                              {getMaintenanceTypeText(record.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(record.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{record.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          R$ {record.totalCost.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{record.description}</p>
                    
                    {/* Services */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Serviços Realizados</h5>
                      <div className="flex flex-wrap gap-2">
                        {record.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Parts */}
                    {record.parts.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Peças Utilizadas</h5>
                        <div className="space-y-2">
                          {record.parts.map((part, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{part.name}</p>
                                <p className="text-sm text-gray-600">Quantidade: {part.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  R$ {(part.price * part.quantity).toFixed(2).replace('.', ',')}
                                </p>
                                <p className="text-xs text-gray-600">
                                  R$ {part.price.toFixed(2).replace('.', ',')} cada
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
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
              <Link to="/driver/adicionar-veiculo">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Veículo
                </Button>
              </Link>
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
                    <EditVehicleDialog vehicle={vehicle} />
                    <MaintenanceHistoryDialog vehicle={vehicle} />
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
            <Link to="/driver/adicionar-veiculo">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Veículo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverVehicles;
