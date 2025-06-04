
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Edit, Trash2, Save, ClipboardList, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Checklist {
  id: string;
  name: string;
  type: 'entrada' | 'saida';
  items: ChecklistItem[];
}

const WorkshopChecklists = () => {
  const { toast } = useToast();
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      name: 'Inspeção de Entrada Padrão',
      type: 'entrada',
      items: [
        { id: '1', text: 'Verificar nível de combustível', checked: false },
        { id: '2', text: 'Documentar riscos e arranhões externos', checked: false },
        { id: '3', text: 'Testar funcionamento das luzes', checked: false },
        { id: '4', text: 'Verificar pneus e pressão', checked: false },
        { id: '5', text: 'Conferir itens no interior do veículo', checked: false }
      ]
    },
    {
      id: '2',
      name: 'Checklist de Saída',
      type: 'saida',
      items: [
        { id: '1', text: 'Verificar se todos os serviços foram executados', checked: false },
        { id: '2', text: 'Testar funcionamento após reparo', checked: false },
        { id: '3', text: 'Limpar área de trabalho', checked: false },
        { id: '4', text: 'Verificar se não há ferramentas esquecidas', checked: false }
      ]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newChecklist, setNewChecklist] = useState({
    name: '',
    type: 'entrada' as 'entrada' | 'saida',
    items: [] as ChecklistItem[]
  });
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      checked: false
    };
    
    setNewChecklist(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
    setNewItemText('');
  };

  const handleRemoveItem = (itemId: string) => {
    setNewChecklist(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleSaveChecklist = () => {
    if (!newChecklist.name.trim() || newChecklist.items.length === 0) {
      toast({
        title: "Erro",
        description: "Nome e pelo menos um item são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const checklist: Checklist = {
      id: editingId || Date.now().toString(),
      ...newChecklist
    };

    if (editingId) {
      setChecklists(prev => prev.map(c => c.id === editingId ? checklist : c));
      setEditingId(null);
    } else {
      setChecklists(prev => [...prev, checklist]);
    }

    setNewChecklist({ name: '', type: 'entrada', items: [] });
    setIsCreating(false);
    
    toast({
      title: editingId ? "Checklist atualizado" : "Checklist criado",
      description: "O checklist foi salvo com sucesso.",
    });
  };

  const handleEditChecklist = (checklist: Checklist) => {
    setNewChecklist({
      name: checklist.name,
      type: checklist.type,
      items: [...checklist.items]
    });
    setEditingId(checklist.id);
    setIsCreating(true);
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklists(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Checklist removido",
      description: "O checklist foi removido com sucesso.",
    });
  };

  const entradaChecklists = checklists.filter(c => c.type === 'entrada');
  const saidaChecklists = checklists.filter(c => c.type === 'saida');

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
                <h1 className="text-2xl font-bold text-gray-900">Checklists Personalizados</h1>
                <p className="text-sm text-gray-500">Padronize os processos de entrada e saída de veículos</p>
              </div>
            </div>
            <Button onClick={() => setIsCreating(true)} size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Checklist
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Creation/Edit Form */}
          {isCreating && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-orange-600" />
                  <span>{editingId ? 'Editar Checklist' : 'Criar Novo Checklist'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checklistName" className="text-sm font-medium">Nome do Checklist</Label>
                    <Input
                      id="checklistName"
                      value={newChecklist.name}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Inspeção de Entrada"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checklistType" className="text-sm font-medium">Tipo</Label>
                    <select
                      id="checklistType"
                      value={newChecklist.type}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, type: e.target.value as 'entrada' | 'saida' }))}
                      className="w-full h-12 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                    </select>
                  </div>
                </div>

                {/* Add Items */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Itens do Checklist</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      placeholder="Digite um item do checklist"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                      className="flex-1 h-12"
                    />
                    <Button onClick={handleAddItem} type="button" className="h-12 px-6">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Items List */}
                {newChecklist.items.length > 0 && (
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-4 text-gray-900">Itens do Checklist ({newChecklist.items.length})</h4>
                      <div className="space-y-3">
                        {newChecklist.items.map((item, index) => (
                          <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </span>
                              <span className="text-gray-900">{item.text}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setNewChecklist({ name: '', type: 'entrada', items: [] });
                  }} size="lg">
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveChecklist} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Atualizar' : 'Salvar'} Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs for Checklists */}
          <Tabs defaultValue="entrada" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="entrada" className="text-base">
                <ClipboardList className="h-4 w-4 mr-2" />
                Checklists de Entrada ({entradaChecklists.length})
              </TabsTrigger>
              <TabsTrigger value="saida" className="text-base">
                <FileText className="h-4 w-4 mr-2" />
                Checklists de Saída ({saidaChecklists.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="entrada" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entradaChecklists.map((checklist) => (
                  <Card key={checklist.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <ClipboardList className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-gray-900">{checklist.name}</CardTitle>
                            <p className="text-sm text-gray-500">{checklist.items.length} itens</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => handleEditChecklist(checklist)} className="hover:bg-blue-100">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteChecklist(checklist.id)} className="hover:bg-red-100">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {checklist.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <Checkbox id={`${checklist.id}-${item.id}`} />
                            <label htmlFor={`${checklist.id}-${item.id}`} className="text-sm text-gray-700">{item.text}</label>
                          </div>
                        ))}
                        {checklist.items.length > 3 && (
                          <p className="text-xs text-gray-500">+ {checklist.items.length - 3} itens adicionais</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50">
                          <Download className="h-4 w-4 mr-2" />
                          Usar Checklist
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditChecklist(checklist)} className="hover:bg-gray-50">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saida" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {saidaChecklists.map((checklist) => (
                  <Card key={checklist.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-gray-900">{checklist.name}</CardTitle>
                            <p className="text-sm text-gray-500">{checklist.items.length} itens</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => handleEditChecklist(checklist)} className="hover:bg-blue-100">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteChecklist(checklist.id)} className="hover:bg-red-100">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {checklist.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <Checkbox id={`${checklist.id}-${item.id}`} />
                            <label htmlFor={`${checklist.id}-${item.id}`} className="text-sm text-gray-700">{item.text}</label>
                          </div>
                        ))}
                        {checklist.items.length > 3 && (
                          <p className="text-xs text-gray-500">+ {checklist.items.length - 3} itens adicionais</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50">
                          <Download className="h-4 w-4 mr-2" />
                          Usar Checklist
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditChecklist(checklist)} className="hover:bg-gray-50">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default WorkshopChecklists;
