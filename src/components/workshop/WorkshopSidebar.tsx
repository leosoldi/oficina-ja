
import React from 'react';
import { MapPin, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkshopSidebarProps {
  address: string;
  distance: string;
  workingDays: string;
  workingHours: string;
  saturday: string;
  certifications: string[];
}

const WorkshopSidebar = ({ 
  address, 
  distance, 
  workingDays, 
  workingHours, 
  saturday, 
  certifications 
}: WorkshopSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Informações de localização */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Endereço</p>
                <p className="text-sm text-gray-600">{address}</p>
                <p className="text-sm text-blue-600 font-medium">{distance} de distância</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horário de funcionamento */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de funcionamento</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-700 font-medium">{workingDays}</span>
              <span className="font-semibold text-green-700">{workingHours}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-gray-700 font-medium">Sábado</span>
              <span className="font-semibold text-blue-700">{saturday}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-700 font-medium">Domingo</span>
              <span className="font-semibold text-red-600">Fechado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificações */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificações</h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{cert}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopSidebar;
