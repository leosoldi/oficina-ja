import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChecklistStats from '@/components/checklists/ChecklistStats';
import ChecklistFilters from '@/components/checklists/ChecklistFilters';
import ChecklistCard from '@/components/checklists/ChecklistCard';
import NewChecklistModal from '@/components/checklists/NewChecklistModal';
import { useToast } from '@/hooks/use-toast';

// >>> services + tipos
import { checklistService } from '@/services/Checklist';
import type { ChecklistItem } from '@/types/checklist';

import type { Checklist as ChecklistType } from '@/types/checklist';

type Checklist = ChecklistType;

type NewChecklistPayload = {
  title: string;
  description: string;
  category: string;
  items: ChecklistItem[];
  isTemplate: boolean;
  assignedToMotoristaId?: string | null;
};

const WorkshopChecklists = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewChecklistModalOpen, setIsNewChecklistModalOpen] = useState(false);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // --- carregar lista do backend
  const fetchList = async (params?: { motoristaId?: string }) => {
    try {
      const data = await checklistService.list(params);
      setChecklists(data);
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro', description: 'Não foi possível carregar os checklists.', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // --- filtros (agora em cima do estado vindo do backend)
  const filteredChecklists = checklists.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const handleUseChecklist = (id: number) => {
    navigate(`/workshop/checklists/${id}`);
  };
  
  const handleEditChecklist = (id: number) => {
    const checklist = checklists.find((c) => c.id === id);
    toast({ title: 'Editar checklist', description: `Editando checklist "${checklist?.title}".` });
  };
  
  const handleDeleteChecklist = (id: number) => {
    // (se quiser, implemento o delete no service)
    const checklist = checklists.find((c) => c.id === id);
    toast({
      title: 'Checklist removido',
      description: `Checklist "${checklist?.title}" foi removido.`,
      variant: 'destructive',
    });
  };
  
  const handleDuplicateChecklist = (id: number) => {
    const checklist = checklists.find((c) => c.id === id);
    toast({ title: 'Checklist duplicado', description: `Uma cópia de "${checklist?.title}" foi criada.` });
  };

  const handleNewChecklist = () => setIsNewChecklistModalOpen(true);

  // --- AQUI GRAVA NO BANCO
  const handleCreateChecklist = async (checklistData: NewChecklistPayload) => {
    try {
      await checklistService.create(checklistData); // POST /checklists
      toast({ title: 'Checklist criado', description: `Checklist "${checklistData.title}" foi criado com sucesso.` });
      setIsNewChecklistModalOpen(false);
      fetchList(); // recarrega
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro', description: 'Não foi possível criar o checklist.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checklists</h1>
          <p className="text-gray-600">Gerencie seus checklists de serviços e mantenha a qualidade dos trabalhos</p>
        </div>

        <ChecklistStats />

        <ChecklistFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewChecklist={handleNewChecklist}
          // se quiser, dá pra passar selectedClientId/onClientChange e chamar fetchList({motoristaId})
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChecklists.length > 0 ? (
            filteredChecklists.map((checklist) => (
              <ChecklistCard
                key={checklist.id}
                checklist={checklist}
                onUse={() => handleUseChecklist(checklist.id)}
                onEdit={() => handleEditChecklist(checklist.id)}
                onDelete={() => handleDeleteChecklist(checklist.id)}
                onDuplicate={() => handleDuplicateChecklist(checklist.id)}
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum checklist encontrado</h3>
                <p className="text-gray-500 mb-4">Não foram encontrados checklists com os filtros selecionados.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewChecklistModal
        open={isNewChecklistModalOpen}
        onOpenChange={setIsNewChecklistModalOpen}
        onSubmit={handleCreateChecklist} // grava no banco via service
      />
    </div>
  );
};

export default WorkshopChecklists;
