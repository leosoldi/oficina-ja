
export interface Appointment {
  id: number;
  time: string;
  duration: string;
  client: string;
  phone: string;
  email: string;
  vehicle: string;
  plate: string;
  service: string;
  status: string;
  notes: string;
}

export interface AppointmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateStatus: (appointmentId: number, newStatus: string, statusNotes: string) => void;
}
