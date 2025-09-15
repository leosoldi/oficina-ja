// src/services/agendaApi.ts
import { api } from "./api";

export type GetAvailabilityOpts = {
  durationMin?: number;
  serviceId?: number;
};

export type BookPayload = {
  oficinaId: string;
  // formatos legados:
  date?: string;
  startTime?: string;
  endTime?: string;
  // formato recomendado:
  startISO?: string;
  durationMin?: number;

  motoristaId?: string;
  veiculoId?: string;
  servicoId?: number;

  customer: string;
  phone?: string;
  email?: string;
  notes?: string;
};

const HHMM = /^\d{2}:\d{2}$/;
const toISOFromHHMM = (dateYYYYMMDD: string, hhmm: string) =>
  `${dateYYYYMMDD}T${hhmm.slice(0, 5)}:00`;

export const Agenda = {
  /** Resposta crua do backend (útil p/ telas que esperam {slots: [...]}) */
  getAvailability(oficinaId: string, date: string, opts: GetAvailabilityOpts = {}) {
    return api.get("/agenda/availability", { params: { oficinaId, date, ...opts } });
  },

  /** Lista de inícios (ISO) independente do formato que o backend retornar */
  async availability(oficinaId: string, dateISO: string, durationMin: number): Promise<string[]> {
    const { data } = await api.get("/agenda/availability", {
      params: { oficinaId, date: dateISO, durationMin },
    });

    let list: string[] = [];

    // formatos aceitos
    if (Array.isArray(data)) {
      // ["2025-08-18T09:00:00-03:00"] ou ["09:00"]
      if (typeof data[0] === "string") {
        list = (data as string[]).map((v) => (HHMM.test(v) ? toISOFromHHMM(dateISO, v) : v));
      } else if (data[0]?.startISO) {
        list = data.map((s: any) => String(s.startISO));
      } else if (data[0]?.startTime) {
        list = data.map((s: any) => toISOFromHHMM(dateISO, String(s.startTime)));
      } else if (data[0]?.start) {
        list = data.map((s: any) => String(s.start));
      }
    } else if (Array.isArray(data?.slots)) {
      const slots = data.slots;
      if (typeof slots[0] === "string") {
        list = (slots as string[]).map((v) => (HHMM.test(v) ? toISOFromHHMM(dateISO, v) : v));
      } else if (slots[0]?.startISO) {
        list = slots.map((s: any) => String(s.startISO));
      } else if (slots[0]?.startTime) {
        list = slots.map((s: any) => toISOFromHHMM(dateISO, String(s.startTime)));
      } else if (slots[0]?.start) {
        list = slots.map((s: any) => String(s.start));
      }
    }

    // dedup + ordena
    list = Array.from(new Set(list)).sort();
    return list;
  },

  /** Compat: criação de booking (você já usa Appointments.create) */
  book(payload: BookPayload) {
    return api.post("/agenda/book", payload);
  },
};

export default Agenda;
