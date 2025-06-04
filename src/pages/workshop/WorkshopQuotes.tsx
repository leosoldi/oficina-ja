
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Send, FileText, Trash2, DollarSign, Calculator, User, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  vehicle: string;
  items: QuoteItem[];
  total: number;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado';
  createdAt: string;
}

const WorkshopQuotes = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      clientName: 'João Silva',
      clientEmail: 'joao@email.com',
      clientPhone: '(11) 99999-1111',
      vehicle: 'Honda Civic 2020',
      items: [
        { id: '1', description: 'Troca de Óleo', quantity: 1, unitPrice: 120, total: 120 },
        { id: '2', description: 'Filtro de Óleo', quantity: 1, unitPrice: 25, total: 25 }
      ],
      total: 145,
      status: 'enviado',
      createdAt: '2024-06-04'
    },
    {
      id: '2',
      clientName: 'Maria Santos',
      clientEmail: 'maria@email.com',
      clientPhone: '(11) 99999-2222',
      vehicle: 'Toyota Corolla 2019',
      items: [
        { id: '1', description: 'Alinhamento', quantity: 1, unitPrice: 80, total: 80 },
        { id: '2', description: 'Balanceamento', quantity: 4, unitPrice: 15, total: 60 }
      ],
      total: 140,
      status: 'aprovado',
      createdAt: '2024-06-03'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newQuote, setNewQuote] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    vehicle: '',
    items: [] as QuoteItem[]
  });
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  const handleAddItem = () => {
    if (!newItem.description || newItem.unitPrice <= 0) {
      toast({
        title: "Erro",
        description: "Descrição e preço são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const item: QuoteItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };

    setNewQuote(prev => ({
      ...prev,
      items: [...prev.items, item]
    }));

    setNewItem({ description: '', quantity: 1, unitPrice: 0 });
  };

  const handleRemoveItem = (itemId: string) => {
    setNewQuote(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const calculateTotal = () => {
    return newQuote.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSaveQuote = (status: 'rascunho' | 'enviado') => {
    if (!newQuote.clientName || !newQuote.vehicle || newQuote.items.length === 0) {
      toast({
        title: "Erro",
        description: "Nome do cliente, veículo e pelo menos um item são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const quote: Quote = {
      id: Date.now().toString(),
      ...newQuote,
      total: calculateTotal(),
      status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuotes(prev => [...prev, quote]);
    setNewQuote({ clientName: '', clientEmail: '', clientPhone: '', vehicle: '', items: [] });
    setIsCreating(false);

    toast({
      title: status === 'enviado' ? "Orçamento enviado" : "Orçamento salvo",
      description: status === 'enviado' ? "O orçamento foi enviado para o cliente." : "O orçamento foi salvo como rascunho.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'enviado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aprovado': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejeitado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'enviado': return 'Enviado';
      case 'aprovado': return 'Aprovado';
      case 'rejeitado': return 'Rejeitado';
      default: return status;
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Geração de Orçamentos</h1>
                <p className="text-sm text-gray-500">Crie orçamentos rápidos e precisos para seus clientes</p>
              </div>
            </div>
            <Button onClick={() => setIsCreating(true)} size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Orçamento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Orçamentos</p>
                    <p className="text-2xl font-bold">{quotes.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Aprovados</p>
                    <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'aprovado').length}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pendentes</p>
                    <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'enviado').length}</p>
                  </div>
                  <Send className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Valor Total</p>
                    <p className="text-2xl font-bold">R$ {quotes.reduce((sum, q) => sum + q.total, 0).toFixed(0)}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Quote Form */}
          {isCreating && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-yellow-600" />
                  <span>Novo Orçamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Client Data */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Dados do Cliente</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-sm font-medium">Nome do Cliente</Label>
                      <Input
                        id="clientName"
                        value={newQuote.clientName}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientName: e.target.value }))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail" className="text-sm font-medium">E-mail</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={newQuote.clientEmail}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientEmail: e.target.value }))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone" className="text-sm font-medium">Telefone</Label>
                      <Input
                        id="clientPhone"
                        value={newQuote.clientPhone}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientPhone: e.target.value }))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle" className="text-sm font-medium">Veículo</Label>
                      <Input
                        id="vehicle"
                        value={newQuote.vehicle}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, vehicle: e.target.value }))}
                        placeholder="Ex: Honda Civic 2020"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Item */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    <span>Adicionar Item</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="itemDescription" className="text-sm font-medium">Descrição</Label>
                      <Input
                        id="itemDescription"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Ex: Troca de Óleo"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemQuantity" className="text-sm font-medium">Quantidade</Label>
                      <Input
                        id="itemQuantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemPrice" className="text-sm font-medium">Preço Unitário</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        step="0.01"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                        className="h-12"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddItem} className="mt-4 h-12">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                {/* Items List */}
                {newQuote.items.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Itens do Orçamento</h3>
                    <Card className="border border-gray-200">
                      <div className="overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Unit.</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {newQuote.items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">R$ {item.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="hover:bg-red-100"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total Geral:</td>
                              <td className="px-6 py-4 text-right text-lg font-bold text-green-600">R$ {calculateTotal().toFixed(2)}</td>
                              <td></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </Card>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsCreating(false)} size="lg">
                    Cancelar
                  </Button>
                  <Button onClick={() => handleSaveQuote('rascunho')} variant="outline" size="lg">
                    Salvar Rascunho
                  </Button>
                  <Button onClick={() => handleSaveQuote('enviado')} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar para Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quotes List */}
          <div className="space-y-6">
            {quotes.map((quote) => (
              <Card key={quote.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{quote.clientName}</CardTitle>
                        <p className="text-sm text-gray-500 flex items-center space-x-2">
                          <Car className="h-4 w-4" />
                          <span>{quote.vehicle}</span>
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(quote.status)} border`}>
                      {getStatusLabel(quote.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Contato</p>
                      <p className="text-sm text-gray-900">{quote.clientEmail}</p>
                      <p className="text-sm text-gray-900">{quote.clientPhone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Resumo</p>
                      <p className="text-sm text-gray-900">Data: {new Date(quote.createdAt).toLocaleDateString('pt-BR')}</p>
                      <p className="text-lg font-bold text-green-600">Total: R$ {quote.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-blue-50">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    {quote.status === 'aprovado' && (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Converter para OS
                      </Button>
                    )}
                    {quote.status === 'rascunho' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="hover:bg-gray-50">
                      Duplicar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {quotes.length === 0 && !isCreating && (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-16">
                <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">Nenhum orçamento criado ainda.</p>
                <Button onClick={() => setIsCreating(true)} size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Orçamento
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkshopQuotes;
