
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChecklistStats from '@/components/checklists/ChecklistStats';
import ChecklistFilters from '@/components/checklists/ChecklistFilters';
import ChecklistCard from '@/components/checklists/ChecklistCard';
import { mockChecklists } from '@/constants/checklists';
import { useToast } from '@/hooks/use-toast';

const WorkshopChecklists = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredChecklists = mockChecklists.filter(checklist => {
    const matchesCategory = selectedCategory === 'all' || checklist.category === selectedCategory;
    const matchesSearch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleUseChecklist = (id: number) => {
    const checklist = mockChecklists.find(c => c.id === id);
    toast({
      title: "Checklist iniciado",
      description: `Checklist "${checklist?.title}" foi iniciado com sucesso.`,
    });
  };

  const handleEditChecklist = (id: number) => {
    const checklist = mockChecklists.find(c => c.id === id);
    toast({
      title: "Editar checklist",
      description: `Editando checklist "${checklist?.title}".`,
    });
  };

  const handleDeleteChecklist = (id: number) => {
    const checklist = mockChecklists.find(c => c.id === id);
    toast({
      title: "Checklist removido",
      description: `Checklist "${checklist?.title}" foi removido.`,
      variant: "destructive",
    });
  };

  const handleDuplicateChecklist = (id: number) => {
    const checklist = mockChecklists.find(c => c.id === id);
    toast({
      title: "Checklist duplicado",
      description: `Uma cópia de "${checklist?.title}" foi criada.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checklists</h1>
          <p className="text-gray-600">
            Gerencie seus checklists de serviços e mantenha a qualidade dos trabalhos
          </p>
        </div>

        <ChecklistStats />
        
        <ChecklistFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChecklists.length > 0 ? (
            filteredChecklists.map((checklist) => (
              <ChecklistCard
                key={checklist.id}
                checklist={checklist}
                onUse={handleUseChecklist}
                onEdit={handleEditChecklist}
                onDelete={handleDeleteChecklist}
                onDuplicate={handleDuplicateChecklist}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum checklist encontrado
                </h3>
                <p className="text-gray-500 mb-4">
                  Não foram encontrados checklists com os filtros selecionados.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopChecklists;
