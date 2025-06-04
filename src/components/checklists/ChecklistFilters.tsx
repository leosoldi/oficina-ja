
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import { checklistCategories } from '@/constants/checklists';

interface ChecklistFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ChecklistFilters = ({ 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange 
}: ChecklistFiltersProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar checklists..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
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

          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Novo Checklist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistFilters;
