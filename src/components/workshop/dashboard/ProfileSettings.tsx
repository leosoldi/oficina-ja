
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, MapPin, Phone, Clock, Save } from 'lucide-react';

interface Workshop {
  name: string;
  phone: string;
  address: string;
  description: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface ProfileSettingsProps {
  workshop: Workshop;
}

const ProfileSettings = ({ workshop }: ProfileSettingsProps) => {
  const [formData, setFormData] = useState(workshop);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Aqui você salvaria os dados
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const workingDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Perfil
            </CardTitle>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              ) : (
                'Editar Perfil'
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Oficina</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Telefone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Endereço
            </label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              disabled={!isEditing}
              placeholder="Descreva sua oficina, especialidades e diferenciais..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de Funcionamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workingDays.map((day) => (
              <div key={day.key} className="flex items-center justify-between">
                <span className="text-gray-700 w-32">{day.label}</span>
                <Input
                  className="w-48"
                  value={formData.workingHours[day.key as keyof typeof formData.workingHours]}
                  onChange={(e) => setFormData({
                    ...formData,
                    workingHours: {
                      ...formData.workingHours,
                      [day.key]: e.target.value
                    }
                  })}
                  disabled={!isEditing}
                  placeholder="Ex: 08:00 - 18:00 ou Fechado"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full">
              Gerenciar Notificações
            </Button>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Button variant="destructive" className="w-full">
              Desativar Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
