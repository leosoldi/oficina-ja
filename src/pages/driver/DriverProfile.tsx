
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star,
  ArrowLeft,
  Edit,
  Shield,
  CreditCard,
  Bell,
  Eye,
  Trash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';

const DriverProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const driverInfo = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    memberSince: '2023-01-15',
    totalServices: 47,
    rating: 4.8,
    totalSpent: 'R$ 3.450,00'
  };

  const vehicles = [
    {
      id: 1,
      model: 'Honda Civic',
      year: 2020,
      plate: 'ABC-1234',
      color: 'Branco',
      km: 25000,
      lastService: '2024-05-15'
    },
    {
      id: 2,
      model: 'Toyota Corolla',
      year: 2018,
      plate: 'DEF-5678',
      color: 'Prata',
      km: 45000,
      lastService: '2024-04-20'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'vehicles', label: 'Veículos', icon: Car },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <DriverHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard-motorista" className="text-gray-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          </div>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{driverInfo.name}</h3>
                  <p className="text-sm text-gray-600">Motorista Premium</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{driverInfo.rating}</span>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Personal Info */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                        <p className="text-gray-900 font-medium">{driverInfo.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">E-mail</label>
                        <p className="text-gray-900">{driverInfo.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Telefone</label>
                        <p className="text-gray-900">{driverInfo.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Membro desde</label>
                        <p className="text-gray-900">{new Date(driverInfo.memberSince).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Endereço</label>
                      <p className="text-gray-900">{driverInfo.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{driverInfo.totalServices}</p>
                      <p className="text-sm text-gray-600">Serviços Realizados</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{driverInfo.totalSpent}</p>
                      <p className="text-sm text-gray-600">Total Investido</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{driverInfo.rating}</p>
                      <p className="text-sm text-gray-600">Avaliação Média</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'vehicles' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Meus Veículos</h2>
                  <Button>
                    <Car className="h-4 w-4 mr-2" />
                    Adicionar Veículo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Car className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{vehicle.model} {vehicle.year}</h3>
                              <p className="text-sm text-gray-600">{vehicle.plate} • {vehicle.color}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Quilometragem:</span>
                            <span className="font-medium">{vehicle.km.toLocaleString()} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Último serviço:</span>
                            <span className="font-medium">{new Date(vehicle.lastService).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full mt-4">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Histórico
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Configurações de Notificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Agendamentos</h4>
                      <p className="text-sm text-gray-600">Receber notificações sobre agendamentos</p>
                    </div>
                    <Button variant="outline" size="sm">Ativado</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Promoções</h4>
                      <p className="text-sm text-gray-600">Receber ofertas especiais das oficinas</p>
                    </div>
                    <Button variant="outline" size="sm">Ativado</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Lembretes</h4>
                      <p className="text-sm text-gray-600">Lembretes de manutenção preventiva</p>
                    </div>
                    <Button variant="outline" size="sm">Ativado</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Verificação em Duas Etapas
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash className="h-4 w-4 mr-2" />
                    Excluir Conta
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
