
export interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  required: boolean;
  notes?: string;
}

export interface Checklist {
  id: string;
  title: string;
  category: string;
  description: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'archived';
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  items: Omit<ChecklistItem, 'id' | 'completed'>[];
}
