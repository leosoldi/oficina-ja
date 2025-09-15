import { api } from "./api";
import type { ChecklistItem } from "@/types/checklist"; // já existe no teu projeto

export type ChecklistItemDTO = {
  id: number;
  text: string;
  required?: boolean;
  completed?: boolean;
};

export type ChecklistDTO = {
  id: string;
  title: string;
  description: string;
  category: "maintenance" | "inspection" | "repair" | "custom" | string;
  items: ChecklistItemDTO[];
  notes?: string;
  usedCount?: number;
  createdAt?: string;
};

export type NewChecklistPayload = {
  title: string;
  description: string;
  category: string;
  items: ChecklistItem[];
  isTemplate: boolean;
  assignedToMotoristaId?: string | null;
};

export type CompleteChecklistPayload = {
  notes?: string;
  items: Array<{ id: number; completed: boolean }>;
  parts?: Array<{ name: string; quantity: number; estimatedPrice?: number; notes?: string }>;
};

export const checklistService = {
  async create(data: NewChecklistPayload) {
    const res = await api.post("/checklists", data);
    return res.data as ChecklistDTO;
  },

  async list(params?: { motoristaId?: string }) {
    const res = await api.get("/checklists", { params });
    return res.data as ChecklistDTO[];
  },

  async getById(id: string) {
    const res = await api.get(`/checklists/${id}`);
    return res.data as ChecklistDTO;
  },

  // POST /checklists/:id/complete (implemente no back caso ainda não exista)
  async complete(id: string, payload: CompleteChecklistPayload) {
    const { data } = await api.post(`/checklists/${id}/complete`, payload);
    return data as ChecklistDTO;
  },
  async remove(id: string) { await api.delete(`/checklists/${id}`); },
};
