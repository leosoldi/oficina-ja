
import React, { useState } from 'react';
import { Plus, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import VehicleCard from '@/components/driver/VehicleCard';
import VehicleStats from '@/components/driver/VehicleStats';
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
        workshop: 'Oficina Centralaaa',
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

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(vehicles.map(v => 
      v.id === updatedVehicle.id ? updatedVehicle : v
    ));
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
            <VehicleStats vehicles={vehicles} />
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onUpdateVehicle={handleUpdateVehicle}
              maintenanceHistory={maintenanceHistory[vehicle.id] || []}
            />
          ))}
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
