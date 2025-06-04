
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Upload, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WorkshopProfile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'Auto Center Silva',
    email: 'contato@autocentrosilva.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Oficinas, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    description: 'Oficina especializada em manutenção automotiva com mais de 20 anos de experiência.',
    openingHours: {
      weekdays: '08:00 - 18:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado'
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "As informações da oficina foram salvas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link to="/workshop/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações do Perfil</h1>
              <p className="text-sm text-gray-500">Gerencie as informações da sua oficina</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Picture Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span>Foto da Oficina</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AS</span>
                </div>
                <div>
                  <Button variant="outline" className="mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-gray-500">JPG, GIF ou PNG. Máximo 1MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome da Oficina</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Descrição da Oficina</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Endereço</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Endereço Completo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Horários de Funcionamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weekdays" className="text-sm font-medium">Segunda a Sexta</Label>
                  <Input
                    id="weekdays"
                    value={formData.openingHours.weekdays}
                    onChange={(e) => handleHoursChange('weekdays', e.target.value)}
                    placeholder="08:00 - 18:00"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saturday" className="text-sm font-medium">Sábado</Label>
                  <Input
                    id="saturday"
                    value={formData.openingHours.saturday}
                    onChange={(e) => handleHoursChange('saturday', e.target.value)}
                    placeholder="08:00 - 12:00"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunday" className="text-sm font-medium">Domingo</Label>
                  <Input
                    id="sunday"
                    value={formData.openingHours.sunday}
                    onChange={(e) => handleHoursChange('sunday', e.target.value)}
                    placeholder="Fechado"
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="lg">
              Cancelar
            </Button>
            <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkshopProfile;
