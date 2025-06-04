
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Edit, Trash2, Save } from 'lucide-react';
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
              <h1 className="text-xl font-semibold text-gray-900 ml-4">Checklists Personalizados</h1>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Checklist
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Formulário de Criação/Edição */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? 'Editar Checklist' : 'Criar Novo Checklist'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checklistName">Nome do Checklist</Label>
                    <Input
                      id="checklistName"
                      value={newChecklist.name}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Inspeção de Entrada"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checklistType">Tipo</Label>
                    <select
                      id="checklistType"
                      value={newChecklist.type}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, type: e.target.value as 'entrada' | 'saida' }))}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                    </select>
                  </div>
                </div>

                {/* Adicionar Itens */}
                <div>
                  <Label>Itens do Checklist</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      placeholder="Digite um item do checklist"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    />
                    <Button onClick={handleAddItem} type="button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Lista de Itens */}
                {newChecklist.items.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Itens do Checklist:</h4>
                    <div className="space-y-2">
                      {newChecklist.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{item.text}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setNewChecklist({ name: '', type: 'entrada', items: [] });
                  }}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveChecklist} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Atualizar' : 'Salvar'} Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs para separar checklists */}
          <Tabs defaultValue="entrada" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entrada">Checklists de Entrada</TabsTrigger>
              <TabsTrigger value="saida">Checklists de Saída</TabsTrigger>
            </TabsList>
            
            <TabsContent value="entrada" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entradaChecklists.map((checklist) => (
                  <Card key={checklist.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{checklist.name}</CardTitle>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditChecklist(checklist)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteChecklist(checklist.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {checklist.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox id={item.id} />
                            <label htmlFor={item.id} className="text-sm">{item.text}</label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-3">{checklist.items.length} itens</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saida" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {saidaChecklists.map((checklist) => (
                  <Card key={checklist.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{checklist.name}</CardTitle>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditChecklist(checklist)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteChecklist(checklist.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {checklist.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox id={item.id} />
                            <label htmlFor={item.id} className="text-sm">{item.text}</label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-3">{checklist.items.length} itens</p>
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
