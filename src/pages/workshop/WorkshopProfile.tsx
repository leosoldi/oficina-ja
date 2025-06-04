
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Clock, 
  Star, 
  Save,
  Edit,
  Plus,
  X,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkshopProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const [profileData, setProfileData] = useState({
    name: 'Oficina Central',
    email: 'contato@oficinacentral.com',
    phone: '(11) 98765-4321',
    whatsapp: '(11) 98765-4321',
    address: 'Rua das Oficinas, 123 - Centro, São Paulo - SP',
    cep: '01234-567',
    cnpj: '12.345.678/0001-90',
    description: 'Oficina especializada em serviços automotivos com mais de 20 anos de experiência no mercado.',
    services: ['Revisão completa', 'Troca de óleo', 'Freios', 'Suspensão', 'Motor', 'Transmissão'],
    specialties: ['Honda', 'Toyota', 'Volkswagen', 'Chevrolet'],
    certifications: ['ISO 9001', 'Credenciada Honda', 'Certificação Bosch'],
    workingHours: {
      weekdays: '08:00 - 18:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui implementaria a lógica para salvar os dados
  };

  const addService = () => {
    if (newService.trim()) {
      setProfileData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfileData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard-oficina">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Configurações do Perfil</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Picture and Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl flex items-center justify-center relative group cursor-pointer">
                  <span className="text-2xl font-bold text-blue-600">OC</span>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome da Oficina</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={profileData.cnpj}
                        onChange={(e) => setProfileData(prev => ({ ...prev, cnpj: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição da Oficina</Label>
                <textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full min-h-[100px] p-3 border rounded-md resize-none ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Descreva sua oficina, experiência e diferenciais..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={profileData.cep}
                    onChange={(e) => setProfileData(prev => ({ ...prev, cep: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={profileData.whatsapp}
                    onChange={(e) => setProfileData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Horário de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weekdays">Segunda a Sexta</Label>
                  <Input
                    id="weekdays"
                    value={profileData.workingHours.weekdays}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, weekdays: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="saturday">Sábado</Label>
                  <Input
                    id="saturday"
                    value={profileData.workingHours.saturday}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, saturday: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="sunday">Domingo</Label>
                  <Input
                    id="sunday"
                    value={profileData.workingHours.sunday}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, sunday: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Serviços Oferecidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar novo serviço..."
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addService()}
                  />
                  <Button onClick={addService} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {service}
                    {isEditing && (
                      <button
                        onClick={() => removeService(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-600" />
                Especialidades (Marcas)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar nova especialidade..."
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                  />
                  <Button onClick={addSpecialty} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {specialty}
                    {isEditing && (
                      <button
                        onClick={() => removeSpecialty(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Certificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar nova certificação..."
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                  />
                  <Button onClick={addCertification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((certification, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {certification}
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopProfile;
