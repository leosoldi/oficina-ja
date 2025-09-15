import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Check } from 'lucide-react';
import { checklistCategories } from '@/constants/checklists';
import { ChecklistItem } from '@/types/checklist';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clientesMock } from "@/constants/checklists";

interface NewChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (checklist: {
    title: string;
    description: string;
    category: string;
    items: ChecklistItem[];
    isTemplate: boolean;
    assignedToMotoristaId?: string | null; // <- novo campo opcional
  }) => void;
}

const NewChecklistModal = ({ open, onOpenChange, onSubmit }: NewChecklistModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('maintenance');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [isTemplate, setIsTemplate] = useState(false);

  // novo: cliente selecionado (mock)
  const [clienteId, setClienteId] = useState<string>('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now(),
        text: newItemText.trim(),
        completed: false,
        required: false
      };
      setItems(prev => [...prev, newItem]);
      setNewItemText('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleRequired = (id: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, required: !item.required } : item)
    );
  };

  const handleSubmit = () => {
    if (title.trim() && description.trim() && items.length > 0) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        category: selectedCategory,
        items,
        isTemplate,
        assignedToMotoristaId: clienteId || null, // <- envia para o backend
      });

      // Reset form
      setTitle('');
      setDescription('');
      setSelectedCategory('maintenance');
      setItems([]);
      setNewItemText('');
      setIsTemplate(false);
      setClienteId('');
      onOpenChange(false);
    }
  };

  const canSubmit = !!title.trim() && !!description.trim() && items.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Novo Checklist
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Checklist
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Revisão Completa de Freios"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o objetivo e escopo deste checklist..."
                  rows={3}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categoria
                </label>
                <div className="flex flex-wrap gap-2">
                  {checklistCategories
                    .filter(cat => cat.value !== 'all')
                    .map((category) => (
                      <Badge
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "secondary"}
                        className={`cursor-pointer hover:bg-blue-50 ${
                          selectedCategory === category.value
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        {category.label}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isTemplate"
                  checked={isTemplate}
                  onChange={(e) => setIsTemplate(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isTemplate" className="text-sm text-gray-700">
                  Salvar como template para reutilização
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Itens do checklist */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Itens do Checklist</h3>

              <div className="flex gap-2">
                <Input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Digite um item do checklist..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                />
                <Button
                  onClick={handleAddItem}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!newItemText.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {items.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500 font-medium min-w-[24px]">
                        {index + 1}.
                      </span>
                      <span className="flex-1 text-sm text-gray-900">
                        {item.text}
                      </span>
                      <Button
                        size="sm"
                        variant={item.required ? "default" : "outline"}
                        onClick={() => handleToggleRequired(item.id)}
                        className={item.required ? "bg-red-100 text-red-700 hover:bg-red-2 00" : ""}
                      >
                        <Check className="h-3 w-3" />
                        {item.required ? "Obrigatório" : "Opcional"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm">Adicione itens ao seu checklist</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de ação */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              Criar Checklist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChecklistModal;
