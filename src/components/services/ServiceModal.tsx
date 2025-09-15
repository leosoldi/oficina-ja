
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
  service?: Service | null;
  categories: string[];
}

const ServiceModal = ({ isOpen, onClose, onSave, service, categories }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    active: true
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category,
        active: service.active
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: '',
        category: '',
        active: true
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {service ? 'Editar Serviço' : 'Novo Serviço'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Serviço</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Troca de óleo"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva o serviço oferecido"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duração</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="Ex: 1h 30min"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleInputChange('active', checked)}
              />
              <Label htmlFor="active">Serviço ativo</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {service ? 'Atualizar' : 'Criar'} Serviço
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
