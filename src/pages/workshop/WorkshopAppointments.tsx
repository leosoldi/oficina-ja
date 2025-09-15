import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

import { Agenda } from "@/services/agendaApi";
import { Appointments } from "@/services/Appointments";
import type {
  AppointmentUI,
  AppointmentUIStatus,
} from "@/types/appointment-ui";
import AppointmentHeader from "@/components/appointments/AppointmentHeader";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import AppointmentStats from "@/components/appointments/AppointmentStats";
import NewAppointmentModal from "@/components/appointments/NewAppointmentModal";
import { useAuth } from "@/contexts/AuthContext";

export default function WorkshopAppointments() {
  const { user } = useAuth();
  const oficinaId = user?.id ?? ""; // ajuste se o id estiver em outro campo
  console.log(user)

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedDateISO = useMemo(
    () => dayjs(selectedDate).format("YYYY-MM-DD"),
    [selectedDate]
  );

  const [durationMin, setDurationMin] = useState(30);
  const [slots, setSlots] = useState<
    Array<{ startTime: string; endTime: string }>
  >([]);
  const [appointments, setAppointments] = useState<AppointmentUI[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);

  // ---- helpers de status (UI) ----
  const getStatusColor = (status: AppointmentUIStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "analyzing":
        return "bg-yellow-100 text-yellow-800";
      case "waiting-parts":
        return "bg-orange-100 text-orange-800";
      case "almost-done":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusText = (status: AppointmentUIStatus) =>
    ({
      confirmed: "Confirmado",
      "in-progress": "Em andamento",
      analyzing: "Analisando",
      "waiting-parts": "Aguardando peças",
      "almost-done": "Quase concluído",
      waiting: "Aguardando",
      completed: "Concluído",
      cancelled: "Cancelado",
    }[status] ?? status);

  // ---- mapeia Booking (back) -> AppointmentUI (front) ----
  function backendStatusToUI(s: string): AppointmentUIStatus {
    switch ((s || "").toUpperCase()) {
      case "CONFIRMED":
        return "confirmed";
      case "IN_PROGRESS":
        return "in-progress";
      case "COMPLETED":
        return "completed";
      case "WAITING":
        return "waiting";
      case "CANCELLED":
        return "cancelled";
      default:
        return "confirmed";
    }
  }
  function mapBookingToUI(b: any): AppointmentUI {
    const start = dayjs(b.start);
    const end = dayjs(b.end);
    const mins = Math.max(0, end.diff(start, "minute"));
    const duration =
      mins % 60 === 0
        ? `${mins / 60}h`
        : mins < 60
        ? `${mins}min`
        : `${Math.floor(mins / 60)}h ${mins % 60}min`;

    return {
      id: String(b.id),
      time: start.format("HH:mm"),
      duration,
      client: b.customer || b.motorista?.nome || "Cliente",
      phone: b.phone || b.motorista?.telefone || "",
      email: b.email || b.motorista?.email || "",
      vehicle: b.veiculo ? `${b.veiculo.modelo} ${b.veiculo.ano}` : "",
      plate: b.veiculo?.placa || "",
      service: b.servico?.nome || "",
      status: backendStatusToUI(b.status),
      notes: b.notes || "",
    };
  }

  const loadAvailability = useCallback(async () => {
    if (!oficinaId) return;
    setLoadingAvail(true);
    try {
      const { data } = await Agenda.getAvailability(
        oficinaId,
        selectedDateISO,
        { durationMin }
      );
      setSlots(data?.slots ?? []);
    } catch (err) {
      console.error("availability error", err);
      setSlots([]);
    } finally {
      setLoadingAvail(false);
    }
  }, [oficinaId, selectedDateISO, durationMin]);

  const loadBookings = useCallback(async () => {
    if (!oficinaId) return;
    try {
      const { data } = await Appointments.list(
        oficinaId,
        selectedDateISO,
        selectedDateISO
      );
      const mapped: AppointmentUI[] = Array.isArray(data)
        ? data.map(mapBookingToUI)
        : [];
      setAppointments(mapped);
    } catch (err) {
      console.error("appointments error", err);
      setAppointments([]);
    }
  }, [oficinaId, selectedDateISO]);

  // métricas do topo
  const todayAppointments = appointments.filter(
    (a) => a.status !== "cancelled"
  ).length;
  const completedToday = appointments.filter(
    (a) => a.status === "completed"
  ).length;
  const pendingAppointments = appointments.filter((a) =>
    ["confirmed", "waiting"].includes(a.status)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AppointmentHeader onRulesSaved={loadAvailability} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppointmentStats
          todayCount={todayAppointments}
          completedCount={completedToday}
          pendingCount={pendingAppointments}
          weekCount={28}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <AppointmentCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <div className="lg:col-span-2 space-y-8">
            {/* Disponibilidade (chips clicáveis para agendar) */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">
                  Disponibilidade de {dayjs(selectedDateISO).format("DD/MM")}
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={durationMin}
                    onChange={(e) => setDurationMin(Number(e.target.value))}
                  >
                    <option value={30}>30 min</option>
                    <option value={60}>60 min</option>
                  </select>
                  <NewAppointmentModal
                    oficinaId={oficinaId}
                    onCreated={() => {
                      loadAvailability();
                      loadBookings();
                    }}
                  />
                </div>
              </div>

              {loadingAvail && (
                <div className="text-sm text-gray-500">Carregando…</div>
              )}
              {!loadingAvail && slots.length === 0 && (
                <div className="text-sm text-gray-500">
                  Sem horários disponíveis.
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {slots.map((s) => (
                  <span
                    key={`${s.startTime}-${s.endTime}`}
                    className="px-3 py-1.5 rounded border text-sm bg-white cursor-default select-none"
                    title="Disponível para motoristas reservarem"
                  >
                    {s.startTime}–{s.endTime}
                  </span>
                ))}
              </div>
            </div>

            {/* Lista com dados REAIS */}
            <AppointmentList
              appointments={appointments}
              statusFilter={"all"}
              onStatusFilterChange={() => {}}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              onUpdateAppointment={(updated) =>
                setAppointments((prev) =>
                  prev.map((a) => (a.id === updated.id ? updated : a))
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
