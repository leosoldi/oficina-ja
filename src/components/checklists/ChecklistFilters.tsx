import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { checklistCategories } from '@/constants/checklists';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { clientesMock } from "@/constants/checklists";

const ALL_CLIENTS = "all";

interface ChecklistFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNewChecklist: () => void;

  // NOVO: filtro por cliente (opcional)
  selectedClientId?: string;
  onClientChange?: (id: string) => void;
}

const ChecklistFilters = ({
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onNewChecklist,
  selectedClientId = ALL_CLIENTS,
  onClientChange,
}: ChecklistFiltersProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
          {/* Busca */}
          <div className="flex-1 w-full xl:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar checklists..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Select de Cliente (mock) */}
          <div className="w-full xl:w-64">
            <Select
              value={selectedClientId || ALL_CLIENTS}
              onValueChange={(v) => onClientChange && onClientChange(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrar por cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CLIENTS}>Todos os clientes</SelectItem>
                {clientesMock.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-2">
            {checklistCategories.map((category) => (
              <Badge
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "secondary"}
                className={`cursor-pointer hover:bg-blue-50 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onCategoryChange(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Novo Checklist */}
          <Button
            onClick={onNewChecklist}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Checklist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistFilters;
