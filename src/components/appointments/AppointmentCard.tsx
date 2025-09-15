import React from "react";
import type { AppointmentUI, AppointmentUIStatus } from "@/types/appointment-ui";
import { Pencil, Eye } from "lucide-react"; // ajuste se usar outros ícones

type Props = {
  appointment: AppointmentUI;
  getStatusColor: (status: AppointmentUIStatus) => string;
  getStatusText: (status: AppointmentUIStatus) => string;
  onUpdateAppointment?: (updatedAppointment: AppointmentUI) => void;
};

const AppointmentCard: React.FC<Props> = ({
  appointment,
  getStatusColor,
  getStatusText,
  onUpdateAppointment,
}) => {
  const { time, duration, client, phone, email, vehicle, plate, service, status, notes } =
    appointment;

  const handleChangeStatus = (next: AppointmentUIStatus) => {
    if (!onUpdateAppointment) return;
    onUpdateAppointment({ ...appointment, status: next });
  };

  return (
    <div className="border rounded-lg px-4 py-3 flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">🕒</div>

      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">{client}</span>
          <span className="text-sm text-gray-500">
            {time} • {duration}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>

        <div className="text-sm text-gray-600">
          {vehicle && <span className="mr-2">{vehicle}</span>}
          {plate && <span className="mr-2">• {plate}</span>}
          {service && <span className="text-blue-700 ml-2">{service}</span>}
        </div>

        {notes && <div className="mt-1 text-sm bg-gray-50 rounded p-2">{notes}</div>}
        {(phone || email) && (
          <div className="mt-1 text-xs text-gray-500">
            {phone && <span className="mr-3">📞 {phone}</span>}
            {email && <span>✉️ {email}</span>}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button className="rounded border px-2 py-1 text-sm flex items-center gap-1">
          <Eye className="w-4 h-4" />
          Ver
        </button>
        <button
          className="rounded border px-2 py-1 text-sm flex items-center gap-1"
          onClick={() => handleChangeStatus("in-progress")}
        >
          <Pencil className="w-4 h-4" />
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
