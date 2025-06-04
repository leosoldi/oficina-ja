
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2, Search, Filter, Wrench } from 'lucide-react';
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
    },
    {
      id: '3',
      name: 'Revisão Completa',
      description: 'Revisão geral do veículo com 20 itens',
      price: '350.00',
      duration: '120',
      category: 'Manutenção'
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });

  const categories = ['Manutenção', 'Suspensão', 'Freios', 'Motor', 'Elétrica', 'Ar Condicionado'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/workshop/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cadastro de Serviços</h1>
                <p className="text-sm text-gray-500">Gerencie os serviços oferecidos pela sua oficina</p>
              </div>
            </div>
            <Button onClick={() => setIsAddingService(true)} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search and Filter */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar serviços..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-12 px-3 py-2 border border-input bg-background rounded-md min-w-[150px]"
                  >
                    <option value="">Todas Categorias</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Service Form */}
          {isAddingService && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  <span>Adicionar Novo Serviço</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceName" className="text-sm font-medium">Nome do Serviço</Label>
                    <Input
                      id="serviceName"
                      value={newService.name}
                      onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Troca de Óleo"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory" className="text-sm font-medium">Categoria</Label>
                    <select
                      id="serviceCategory"
                      value={newService.category}
                      onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full h-12 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicePrice" className="text-sm font-medium">Preço (R$)</Label>
                    <Input
                      id="servicePrice"
                      type="number"
                      step="0.01"
                      value={newService.price}
                      onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDuration" className="text-sm font-medium">Duração (minutos)</Label>
                    <Input
                      id="serviceDuration"
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="30"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription" className="text-sm font-medium">Descrição</Label>
                  <Textarea
                    id="serviceDescription"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o serviço oferecido..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsAddingService(false)} size="lg">
                    Cancelar
                  </Button>
                  <Button onClick={handleAddService} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    Adicionar Serviço
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{service.name}</CardTitle>
                        <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">{service.category}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)} className="hover:bg-red-100">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">R$ {service.price}</p>
                      {service.duration && (
                        <p className="text-sm text-gray-500">{service.duration} min</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && !isAddingService && (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-16">
                <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  {searchTerm || selectedCategory ? 'Nenhum serviço encontrado.' : 'Nenhum serviço cadastrado ainda.'}
                </p>
                <Button onClick={() => setIsAddingService(true)} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
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
