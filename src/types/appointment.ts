export type Appointment = {
  id: string;
  date: string;         // ISO
  startTime: string;    // "09:00"
  endTime: string;      // "09:30"
  serviceId: string;
  vetId?: string;
  notes?: string;
};

export interface AppointmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateStatus: (appointmentId: number, newStatus: string, statusNotes: string) => void;
}
