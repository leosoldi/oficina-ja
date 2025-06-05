
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { History, Wrench, Clock, MapPin } from 'lucide-react';
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

interface MaintenanceHistoryDialogProps {
  vehicle: Vehicle;
  maintenanceHistory: MaintenanceRecord[];
}

const MaintenanceHistoryDialog: React.FC<MaintenanceHistoryDialogProps> = ({ vehicle, maintenanceHistory }) => {
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
          {maintenanceHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum histórico encontrado</h3>
              <p className="text-gray-600">Este veículo ainda não possui registros de manutenção</p>
            </div>
          ) : (
            maintenanceHistory.map((record) => (
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

export default MaintenanceHistoryDialog;
