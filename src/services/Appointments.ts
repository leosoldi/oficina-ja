// src/services/Appointments.ts
import { api } from "./api";

export type CreateAppointmentPayload = {
  oficinaId: string;
  startISO: string;
  durationMin: number;
  customer: string;
  phone?: string;
  email?: string;
  notes?: string;
  service?: string;
  createdBy?: "WORKSHOP" | "DRIVER";
};

export const Appointments = {
  list(oficinaId: string, from: string, to: string) {
    // GET /appointments?oficinaId=&from=&to=
    return api.get("/appointments", { params: { oficinaId, from, to } });
  },

  async create(payload: CreateAppointmentPayload) {
    // POST /agenda/book
    const { data } = await api.post("/agenda/book", payload);
    return data;
  },
};

export default Appointments; // opcional, se você quiser importar como default
