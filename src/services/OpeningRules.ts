import { api } from "./api";

export type OpeningRuleDTO = {
  id: string;
  oficinaId: string;
  weekday: number;       // 0..6
  startTime: string;     // "08:00"
  endTime: string;       // "18:00"
  breakStart?: string | null;
  breakEnd?: string | null;
  slotSizeMin: number;   // 30
};

export const OpeningRules = {
  list: (oficinaId: string) =>
    api.get<OpeningRuleDTO[]>("/opening-rules", { params: { oficinaId } }),
  create: (payload: Omit<OpeningRuleDTO, "id">) =>
    api.post<OpeningRuleDTO>("/opening-rules", payload),
  update: (id: string, payload: Partial<Omit<OpeningRuleDTO, "id" | "oficinaId">> & { weekday?: number }) =>
    api.put<OpeningRuleDTO>(`/opening-rules/${id}`, payload),
  remove: (id: string) => api.delete(`/opening-rules/${id}`),
};
