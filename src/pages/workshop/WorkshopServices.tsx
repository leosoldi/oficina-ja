
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
}

const WorkshopServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Troca de Óleo',
      description: 'Troca completa do óleo do motor e filtro',
      price: '120.00',
      duration: '30',
      category: 'Manutenção'
    },
    {
      id: '2',
      name: 'Alinhamento',
      description: 'Alinhamento completo das rodas dianteiras',
      price: '80.00',
      duration: '45',
      category: 'Suspensão'
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });

  const handleAddService = () => {
    if (!newService.name || !newService.price) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const service: Service = {
      id: Date.now().toString(),
      ...newService
    };

    setServices(prev => [...prev, service]);
    setNewService({ name: '', description: '', price: '', duration: '', category: '' });
    setIsAddingService(false);
    
    toast({
      title: "Serviço adicionado",
      description: "O serviço foi cadastrado com sucesso.",
    });
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/workshop/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 ml-4">Cadastro de Serviços</h1>
            </div>
            <Button onClick={() => setIsAddingService(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Formulário de Novo Serviço */}
          {isAddingService && (
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceName">Nome do Serviço</Label>
                    <Input
                      id="serviceName"
                      value={newService.name}
                      onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Troca de Óleo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceCategory">Categoria</Label>
                    <Input
                      id="serviceCategory"
                      value={newService.category}
                      onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Ex: Manutenção"
                    />
                  </div>
                  <div>
                    <Label htmlFor="servicePrice">Preço (R$)</Label>
                    <Input
                      id="servicePrice"
                      type="number"
                      step="0.01"
                      value={newService.price}
                      onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceDuration">Duração (minutos)</Label>
                    <Input
                      id="serviceDuration"
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="serviceDescription">Descrição</Label>
                  <Textarea
                    id="serviceDescription"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o serviço oferecido..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingService(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddService} className="bg-green-600 hover:bg-green-700">
                    Adicionar Serviço
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Serviços */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-gray-500">{service.category}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">R$ {service.price}</p>
                      {service.duration && (
                        <p className="text-sm text-gray-500">{service.duration} min</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {services.length === 0 && !isAddingService && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">Nenhum serviço cadastrado ainda.</p>
                <Button onClick={() => setIsAddingService(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Cadastrar Primeiro Serviço
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkshopServices;
