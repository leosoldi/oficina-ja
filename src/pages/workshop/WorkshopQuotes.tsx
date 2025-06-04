
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Send, FileText, Trash2 } from 'lucide-react';
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
      case 'rascunho': return 'bg-gray-100 text-gray-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-xl font-semibold text-gray-900 ml-4">Geração de Orçamentos</h1>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Orçamento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Formulário de Novo Orçamento */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>Novo Orçamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dados do Cliente */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Dados do Cliente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome do Cliente</Label>
                      <Input
                        id="clientName"
                        value={newQuote.clientName}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">E-mail</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={newQuote.clientEmail}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input
                        id="clientPhone"
                        value={newQuote.clientPhone}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, clientPhone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle">Veículo</Label>
                      <Input
                        id="vehicle"
                        value={newQuote.vehicle}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, vehicle: e.target.value }))}
                        placeholder="Ex: Honda Civic 2020"
                      />
                    </div>
                  </div>
                </div>

                {/* Adicionar Item */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Adicionar Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="itemDescription">Descrição</Label>
                      <Input
                        id="itemDescription"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Ex: Troca de Óleo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemQuantity">Quantidade</Label>
                      <Input
                        id="itemQuantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemPrice">Preço Unitário</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        step="0.01"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddItem} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                {/* Lista de Itens */}
                {newQuote.items.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Itens do Orçamento</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left">Descrição</th>
                            <th className="px-4 py-2 text-center">Qtd</th>
                            <th className="px-4 py-2 text-right">Preço Unit.</th>
                            <th className="px-4 py-2 text-right">Total</th>
                            <th className="px-4 py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {newQuote.items.map((item) => (
                            <tr key={item.id} className="border-t">
                              <td className="px-4 py-2">{item.description}</td>
                              <td className="px-4 py-2 text-center">{item.quantity}</td>
                              <td className="px-4 py-2 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">R$ {item.total.toFixed(2)}</td>
                              <td className="px-4 py-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-right font-medium">Total:</td>
                            <td className="px-4 py-2 text-right font-bold">R$ {calculateTotal().toFixed(2)}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => handleSaveQuote('rascunho')} variant="outline">
                    Salvar Rascunho
                  </Button>
                  <Button onClick={() => handleSaveQuote('enviado')} className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar para Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Orçamentos */}
          <div className="grid grid-cols-1 gap-6">
            {quotes.map((quote) => (
              <Card key={quote.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{quote.clientName}</CardTitle>
                      <p className="text-sm text-gray-500">{quote.vehicle}</p>
                    </div>
                    <Badge className={getStatusColor(quote.status)}>
                      {getStatusLabel(quote.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm"><strong>E-mail:</strong> {quote.clientEmail}</p>
                      <p className="text-sm"><strong>Telefone:</strong> {quote.clientPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm"><strong>Data:</strong> {new Date(quote.createdAt).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm"><strong>Total:</strong> <span className="text-lg font-bold text-green-600">R$ {quote.total.toFixed(2)}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {quotes.length === 0 && !isCreating && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">Nenhum orçamento criado ainda.</p>
                <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
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
