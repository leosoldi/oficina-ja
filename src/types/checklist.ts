
export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  required: boolean;
}

export interface Checklist {
  id: number;
  title: string;
  description: string;
  category: 'maintenance' | 'inspection' | 'repair' | 'custom';
  items: ChecklistItem[];
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  isTemplate: boolean;
}

export interface ChecklistStats {
  totalChecklists: number;
  templatesCount: number;
  completedToday: number;
  averageCompletion: number;
}
