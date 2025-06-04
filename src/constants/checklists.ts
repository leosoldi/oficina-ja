
import { Checklist } from '@/types/checklist';

export const mockChecklists: Checklist[] = [
  {
    id: 1,
    title: 'Inspeção Geral do Veículo',
    description: 'Checklist completo para inspeção inicial do veículo',
    category: 'inspection',
    createdAt: '2024-01-15',
    lastUsed: '2024-06-03',
    usageCount: 25,
    isTemplate: true,
    items: [
      { id: 1, text: 'Verificar nível do óleo do motor', completed: false, required: true },
      { id: 2, text: 'Testar funcionamento das luzes', completed: false, required: true },
      { id: 3, text: 'Verificar pressão dos pneus', completed: false, required: true },
      { id: 4, text: 'Testar freios', completed: false, required: true },
      { id: 5, text: 'Verificar fluido de freio', completed: false, required: true },
      { id: 6, text: 'Inspecionar correias', completed: false, required: false },
    ]
  },
  {
    id: 2,
    title: 'Manutenção Preventiva',
    description: 'Rotina de manutenção preventiva básica',
    category: 'maintenance',
    createdAt: '2024-02-01',
    lastUsed: '2024-06-02',
    usageCount: 18,
    isTemplate: true,
    items: [
      { id: 7, text: 'Trocar óleo do motor', completed: false, required: true },
      { id: 8, text: 'Substituir filtro de óleo', completed: false, required: true },
      { id: 9, text: 'Verificar filtro de ar', completed: false, required: true },
      { id: 10, text: 'Testar bateria', completed: false, required: true },
    ]
  },
  {
    id: 3,
    title: 'Reparo de Sistema Elétrico',
    description: 'Checklist para diagnóstico e reparo elétrico',
    category: 'repair',
    createdAt: '2024-03-10',
    lastUsed: '2024-06-01',
    usageCount: 8,
    isTemplate: false,
    items: [
      { id: 11, text: 'Verificar fusíveis', completed: true, required: true },
      { id: 12, text: 'Testar alternador', completed: true, required: true },
      { id: 13, text: 'Verificar fiação', completed: false, required: true },
      { id: 14, text: 'Testar motor de partida', completed: false, required: true },
    ]
  }
];

export const checklistCategories = [
  { value: 'all', label: 'Todos' },
  { value: 'inspection', label: 'Inspeção' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'repair', label: 'Reparo' },
  { value: 'custom', label: 'Personalizado' }
];
