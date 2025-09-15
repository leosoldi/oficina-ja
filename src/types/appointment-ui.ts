export type AppointmentUIStatus =
  | "confirmed"
  | "in-progress"
  | "analyzing"
  | "waiting-parts"
  | "almost-done"
  | "waiting"
  | "completed"
  | "cancelled";

export interface AppointmentUI {
  id: string | number;
  time: string;        // "08:00"
  duration: string;    // "2h", "30min"
  client: string;
  phone?: string;
  email?: string;
  vehicle?: string;
  plate?: string;
  service?: string;
  status: AppointmentUIStatus;
  notes?: string;
}
