
import { ChecklistTemplate } from '@/types/checklist';

export const checklistCategories = [
  { value: 'inspection', label: 'Inspeção Geral' },
  { value: 'maintenance', label: 'Manutenção Preventiva' },
  { value: 'repair', label: 'Reparos' },
  { value: 'safety', label: 'Segurança' },
  { value: 'cleaning', label: 'Limpeza' }
];

export const defaultTemplates: ChecklistTemplate[] = [
  {
    id: '1',
    name: 'Inspeção de Freios',
    description: 'Checklist completo para inspeção do sistema de freios',
    category: 'inspection',
    items: [
      { description: 'Verificar espessura das pastilhas de freio', required: true },
      { description: 'Inspecionar discos de freio (riscos, empenamento)', required: true },
      { description: 'Verificar nível do fluido de freio', required: true },
      { description: 'Testar funcionamento do freio de mão', required: true },
      { description: 'Verificar vazamentos no sistema', required: true }
    ]
  },
  {
    id: '2',
    name: 'Troca de Óleo',
    description: 'Procedimento padrão para troca de óleo do motor',
    category: 'maintenance',
    items: [
      { description: 'Drenar óleo usado completamente', required: true },
      { description: 'Substituir filtro de óleo', required: true },
      { description: 'Verificar vedação do bujão de drenagem', required: true },
      { description: 'Adicionar óleo novo na quantidade correta', required: true },
      { description: 'Verificar nível após aquecimento do motor', required: true }
    ]
  }
];
