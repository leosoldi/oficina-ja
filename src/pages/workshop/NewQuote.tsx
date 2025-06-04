
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  User,
  Car,
  Wrench,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NewQuote = () => {
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    year: '',
    plate: '',
    mileage: '',
  });

  const [services, setServices] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const [quoteData, setQuoteData] = useState({
    validUntil: '',
    discount: 0,
    notes: '',
  });

  const addService = () => {
    const newId = Math.max(...services.map(s => s.id)) + 1;
    setServices([...services, { id: newId, description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeService = (id: number) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id: number, field: string, value: any) => {
    setServices(services.map(service => {
      if (service.id === id) {
        const updated = { ...service, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return service;
    }));
  };

  const subtotal = services.reduce((sum, service) => sum + service.total, 0);
  const total = subtotal - quoteData.discount;

  const handleSave = () => {
    console.log('Saving quote...');
    // Implement save logic
  };

  const handleSend = () => {
    console.log('Sending quote...');
    // Implement send logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/workshop/orcamentos" className="text-gray-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">Novo Orçamento</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Dados do Cliente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nome Completo</Label>
                  <Input
                    id="clientName"
                    value={clientData.name}
                    onChange={(e) => setClientData({...clientData, name: e.target.value})}
                    placeholder="Nome do cliente"
                  />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Telefone</Label>
                  <Input
                    id="clientPhone"
                    value={clientData.phone}
                    onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="clientEmail">E-mail</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({...clientData, email: e.target.value})}
                  placeholder="cliente@email.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quote Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span>Resumo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Desconto:</span>
                  <span>- R$ {quoteData.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="validUntil">Válido até</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={quoteData.validUntil}
                  onChange={(e) => setQuoteData({...quoteData, validUntil: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="discount">Desconto (R$)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={quoteData.discount}
                  onChange={(e) => setQuoteData({...quoteData, discount: Number(e.target.value)})}
                  placeholder="0,00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-orange-600" />
                <span>Dados do Veículo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={vehicleData.brand}
                    onChange={(e) => setVehicleData({...vehicleData, brand: e.target.value})}
                    placeholder="Honda"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    value={vehicleData.model}
                    onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                    placeholder="Civic"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Ano</Label>
                  <Input
                    id="year"
                    value={vehicleData.year}
                    onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}
                    placeholder="2020"
                  />
                </div>
                <div>
                  <Label htmlFor="plate">Placa</Label>
                  <Input
                    id="plate"
                    value={vehicleData.plate}
                    onChange={(e) => setVehicleData({...vehicleData, plate: e.target.value})}
                    placeholder="ABC-1234"
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Quilometragem</Label>
                  <Input
                    id="mileage"
                    value={vehicleData.mileage}
                    onChange={(e) => setVehicleData({...vehicleData, mileage: e.target.value})}
                    placeholder="50.000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span>Serviços</span>
                </CardTitle>
                <Button onClick={addService} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={service.id} className="grid md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="md:col-span-2">
                      <Label htmlFor={`description-${service.id}`}>Descrição do Serviço</Label>
                      <Input
                        id={`description-${service.id}`}
                        value={service.description}
                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        placeholder="Ex: Troca de óleo"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`quantity-${service.id}`}>Qtd</Label>
                      <Input
                        id={`quantity-${service.id}`}
                        type="number"
                        value={service.quantity}
                        onChange={(e) => updateService(service.id, 'quantity', Number(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unitPrice-${service.id}`}>Valor Unit.</Label>
                      <Input
                        id={`unitPrice-${service.id}`}
                        type="number"
                        value={service.unitPrice}
                        onChange={(e) => updateService(service.id, 'unitPrice', Number(e.target.value))}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label>Total</Label>
                      <div className="h-10 flex items-center px-3 bg-gray-50 border border-gray-300 rounded-md text-sm">
                        R$ {service.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(service.id)}
                        disabled={services.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={quoteData.notes}
                onChange={(e) => setQuoteData({...quoteData, notes: e.target.value})}
                placeholder="Observações adicionais sobre o orçamento..."
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewQuote;
