
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import ChecklistCard from '@/components/checklists/ChecklistCard';
import ChecklistFilters from '@/components/checklists/ChecklistFilters';
import ChecklistStats from '@/components/checklists/ChecklistStats';
import { Checklist } from '@/types/checklist';
import { defaultTemplates } from '@/constants/checklists';

const WorkshopChecklists = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: 'Inspeção Completa - Honda Civic 2020',
      category: 'inspection',
      description: 'Checklist de inspeção geral para manutenção preventiva',
      items: [
        { id: '1', description: 'Verificar nível de óleo', completed: true, required: true },
        { id: '2', description: 'Inspecionar freios', completed: true, required: true },
        { id: '3', description: 'Verificar pneus', completed: false, required: true },
        { id: '4', description: 'Testar luzes', completed: false, required: false },
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      title: 'Manutenção Preventiva - Toyota Corolla',
      category: 'maintenance',
      description: 'Checklist para manutenção dos 10.000 km',
      items: [
        { id: '1', description: 'Trocar óleo do motor', completed: false, required: true },
        { id: '2', description: 'Substituir filtro de ar', completed: false, required: true },
        { id: '3', description: 'Verificar correia dentada', completed: false, required: true },
      ],
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      status: 'draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || checklist.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || checklist.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEditChecklist = (checklist: Checklist) => {
    console.log('Editar checklist:', checklist);
    // TODO: Implementar navegação para página de edição
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklists(prev => prev.filter(c => c.id !== id));
  };

  const handleUseChecklist = (checklist: Checklist) => {
    console.log('Usar checklist:', checklist);
    // TODO: Implementar funcionalidade de uso do checklist
  };

  const handleCreateNew = () => {
    console.log('Criar novo checklist');
    // TODO: Implementar navegação para página de criação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checklists
              </h1>
              <p className="text-gray-600">
                Gerencie seus checklists de inspeção e manutenção
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => console.log('Templates')}>
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Checklist
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <ChecklistStats checklists={checklists} />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ChecklistFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>

          {/* Checklists Grid */}
          <div className="lg:col-span-3">
            {filteredChecklists.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Nenhum checklist encontrado</CardTitle>
                  <CardDescription>
                    Não há checklists que correspondam aos filtros selecionados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleCreateNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Checklist
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredChecklists.map((checklist) => (
                  <ChecklistCard
                    key={checklist.id}
                    checklist={checklist}
                    onEdit={handleEditChecklist}
                    onDelete={handleDeleteChecklist}
                    onUse={handleUseChecklist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopChecklists;
