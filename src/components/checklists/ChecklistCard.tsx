
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Archive, Edit, Trash2 } from 'lucide-react';
import { Checklist } from '@/types/checklist';
import { checklistCategories } from '@/constants/checklists';

interface ChecklistCardProps {
  checklist: Checklist;
  onEdit: (checklist: Checklist) => void;
  onDelete: (id: string) => void;
  onUse: (checklist: Checklist) => void;
}

const ChecklistCard = ({ checklist, onEdit, onDelete, onUse }: ChecklistCardProps) => {
  const category = checklistCategories.find(cat => cat.value === checklist.category);
  const completedItems = checklist.items.filter(item => item.completed).length;
  const totalItems = checklist.items.length;
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const getStatusIcon = () => {
    switch (checklist.status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'archived':
        return <Archive className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (checklist.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">{checklist.title}</CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {checklist.status === 'active' ? 'Ativo' : 
             checklist.status === 'draft' ? 'Rascunho' : 'Arquivado'}
          </Badge>
        </div>
        <CardDescription>{checklist.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Categoria:</span>
            <Badge variant="outline">{category?.label}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progresso:</span>
            <span className="font-medium">{completedItems}/{totalItems} ({completionPercentage.toFixed(0)}%)</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onUse(checklist)}
              className="flex-1"
            >
              Usar Checklist
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(checklist)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(checklist.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistCard;
