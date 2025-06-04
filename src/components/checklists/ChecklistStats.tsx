
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Archive, List } from 'lucide-react';
import { Checklist } from '@/types/checklist';

interface ChecklistStatsProps {
  checklists: Checklist[];
}

const ChecklistStats = ({ checklists }: ChecklistStatsProps) => {
  const totalChecklists = checklists.length;
  const activeChecklists = checklists.filter(c => c.status === 'active').length;
  const draftChecklists = checklists.filter(c => c.status === 'draft').length;
  const archivedChecklists = checklists.filter(c => c.status === 'archived').length;

  const stats = [
    {
      title: 'Total de Checklists',
      value: totalChecklists,
      icon: List,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Ativos',
      value: activeChecklists,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Rascunhos',
      value: draftChecklists,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Arquivados',
      value: archivedChecklists,
      icon: Archive,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bgColor} ${stat.color} p-2 rounded-full`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChecklistStats;
