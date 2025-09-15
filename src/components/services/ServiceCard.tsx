
import React from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
}

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
  onToggleActive: (serviceId: number) => void;
}

const ServiceCard = ({ service, onEdit, onDelete, onToggleActive }: ServiceCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
      service.active 
        ? 'border-green-200 shadow-md' 
        : 'border-gray-200 opacity-75'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                service.active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {service.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-3">
              {service.category}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-green-600">
            R$ {service.price.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            ⏱️ {service.duration}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(service)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleActive(service.id)}
            className={service.active ? 'text-red-600 border-red-200' : 'text-green-600 border-green-200'}
          >
            {service.active ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service.id)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
