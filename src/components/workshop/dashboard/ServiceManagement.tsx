
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';

const ServiceManagement = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Revisão Geral',
      description: 'Verificação completa do veículo',
      priceMin: 120,
      priceMax: 180,
      duration: '2-3h',
      active: true
    },
    {
      id: 2,
      name: 'Troca de Óleo',
      description: 'Troca de óleo e filtro',
      priceMin: 60,
      priceMax: 100,
      duration: '30min',
      active: true
    },
    {
      id: 3,
      name: 'Freios',
      description: 'Manutenção do sistema de freios',
      priceMin: 150,
      priceMax: 300,
      duration: '1-2h',
      active: true
    },
    {
      id: 4,
      name: 'Motor',
      description: 'Reparo e manutenção do motor',
      priceMin: 200,
      priceMax: 500,
      duration: '3-5h',
      active: true
    },
    {
      id: 5,
      name: 'Suspensão',
      description: 'Ajuste e reparo da suspensão',
      priceMin: 180,
      priceMax: 350,
      duration: '2-3h',
      active: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    priceMin: '',
    priceMax: '',
    duration: ''
  });

  const handleAddService = () => {
    if (newService.name && newService.priceMin && newService.priceMax) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        description: newService.description,
        priceMin: parseInt(newService.priceMin),
        priceMax: parseInt(newService.priceMax),
        duration: newService.duration,
        active: true
      };
      setServices([...services, service]);
      setNewService({ name: '', description: '', priceMin: '', priceMax: '', duration: '' });
      setShowAddForm(false);
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Gerenciar Serviços
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-4">Novo Serviço</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Serviço</label>
                  <Input
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="Ex: Ar Condicionado"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duração</label>
                  <Input
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    placeholder="Ex: 1-2h"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço Mínimo (R$)</label>
                  <Input
                    type="number"
                    value={newService.priceMin}
                    onChange={(e) => setNewService({...newService, priceMin: e.target.value})}
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço Máximo (R$)</label>
                  <Input
                    type="number"
                    value={newService.priceMax}
                    onChange={(e) => setNewService({...newService, priceMax: e.target.value})}
                    placeholder="200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Input
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Descrição do serviço"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddService}>Salvar</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <Badge variant={service.active ? "default" : "secondary"}>
                        {service.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>R$ {service.priceMin} - R$ {service.priceMax}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant={service.active ? "outline" : "default"}
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.active ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManagement;
