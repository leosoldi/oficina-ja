
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { checklistCategories } from '@/constants/checklists';

interface ChecklistFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'archived', label: 'Arquivado' }
];

const ChecklistFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}: ChecklistFiltersProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Filtros</h3>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar checklists..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <Badge
              key={status.value}
              variant={selectedStatus === status.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onStatusChange(status.value)}
            >
              {status.label}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</label>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === '' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onCategoryChange('')}
          >
            Todas
          </Badge>
          {checklistCategories.map((category) => (
            <Badge
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChecklistFilters;
