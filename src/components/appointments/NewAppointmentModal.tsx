import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Agenda } from "@/services/agendaApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Appointments } from "@/services/Appointments";

type Driver = {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  plate: string;
};

type SlotItem = { iso: string; label: string };

type NewAppointmentModalProps = {
  oficinaId: string;
  onCreated?: (booking: any) => void;
};

const DURATIONS = [
  { label: "30 minutos", value: 30 },
  { label: "1 hora", value: 60 },
  { label: "1h 30min", value: 90 },
  { label: "2 horas", value: 120 },
  { label: "3 horas", value: 180 },
  { label: "4 horas", value: 240 },
];

function fmtHourLocal(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  oficinaId,
  onCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // cliente/motorista (mock)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // formulário
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [durationMin, setDurationMin] = useState<number>(60);
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  // disponibilidade
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [selectedStartISO, setSelectedStartISO] = useState<string | null>(null);

  const canQueryAvailability = useMemo(
    () => Boolean(oficinaId && date && durationMin > 0),
    [oficinaId, date, durationMin]
  );

  // Mock drivers – troque por chamada real quando integrar
  const drivers: Driver[] = [
    {
      id: 1,
      name: "João Silva",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      vehicle: "Honda Civic 2020",
      plate: "ABC-1234",
    },
    {
      id: 2,
      name: "Maria Santos",
      phone: "(11) 88888-8888",
      email: "maria@email.com",
      vehicle: "Toyota Corolla 2019",
      plate: "DEF-5678",
    },
    {
      id: 3,
      name: "Pedro Costa",
      phone: "(11) 77777-7777",
      email: "pedro@email.com",
      vehicle: "Ford Focus 2018",
      plate: "GHI-9012",
    },
  ];

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Busca disponibilidade sempre que abrir o modal e tiver (data + duração)
  useEffect(() => {
    if (!isOpen || !canQueryAvailability) return;
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, date, durationMin]);

  async function fetchAvailability() {
    setLoadingAvail(true);
    setSelectedStartISO(null);
    try {
      const startList = await Agenda.availability(oficinaId, date, durationMin);
      const items: SlotItem[] = startList.map((iso) => ({
        iso,
        label: fmtHourLocal(iso),
      }));
      setSlots(items);
    } catch (e) {
      console.error("availability error:", e);
      setSlots([]);
    } finally {
      setLoadingAvail(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDriver || !date || !selectedStartISO || !service) {
      alert("Selecione motorista, data, horário e serviço.");
      return;
    }

    try {
      const booking = await Appointments.create({
        oficinaId,
        startISO: selectedStartISO!, // garantido pelo disable do botão
        durationMin,
        customer: selectedDriver.name,
        phone: selectedDriver.phone,
        email: selectedDriver.email,
        notes,
        service,
        createdBy: "WORKSHOP",
      });

      onCreated?.(booking);

      // reset
      setSelectedDriver(null);
      setSearchTerm("");
      setDate("");
      setDurationMin(60);
      setService("");
      setNotes("");
      setSlots([]);
      setSelectedStartISO(null);
      setIsOpen(false);
    } catch (err: any) {
      const msg = String(err?.message ?? "");
      if (msg.toLowerCase().includes("indispon")) {
        alert("Esse horário acabou de ficar indisponível. Atualizando opções...");
        fetchAvailability();
        return;
      }
      alert("Erro ao criar agendamento");
      console.error(err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="h-12 px-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Novo Agendamento</span>
          <span className="sm:hidden">Novo</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Agendamento (oficina)</DialogTitle>
          <DialogDescription className="text-xs">
            Selecione o cliente e um horário disponível. O slot será reservado imediatamente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de motorista */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Selecionar Motorista *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou placa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchTerm && (
              <div className="border rounded-lg max-h-40 overflow-y-auto">
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={cn(
                      "p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0",
                      selectedDriver?.id === driver.id && "bg-blue-50 border-blue-200"
                    )}
                    onClick={() => {
                      setSelectedDriver(driver);
                      setSearchTerm("");
                    }}
                  >
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-gray-600">
                      {driver.vehicle} - {driver.plate}
                    </div>
                    <div className="text-xs text-gray-500">{driver.phone}</div>
                  </div>
                ))}
                {filteredDrivers.length === 0 && (
                  <div className="p-3 text-center text-gray-500">
                    Nenhum motorista encontrado
                  </div>
                )}
              </div>
            )}

            {selectedDriver && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800">{selectedDriver.name}</div>
                <div className="text-sm text-green-600">
                  {selectedDriver.vehicle} - {selectedDriver.plate}
                </div>
              </div>
            )}
          </div>

          {/* Data + Duração */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-sm font-medium">
                Data *
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium">
                Duração *
              </Label>
              <Select
                value={String(durationMin)}
                onValueChange={(v) => setDurationMin(parseInt(v, 10))}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d.value} value={String(d.value)}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Horários disponíveis */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Horários disponíveis *</Label>
              {loadingAvail && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fetchAvailability}
                disabled={!canQueryAvailability || loadingAvail}
              >
                Atualizar
              </Button>
            </div>

            {!date && <p className="text-xs text-muted-foreground">Selecione a data.</p>}

            {date && !loadingAvail && slots.length === 0 && (
              <div className="text-sm text-muted-foreground">
                Nenhum horário disponível para esta data/duração.
              </div>
            )}

            {slots.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {slots.map((s) => {
                  const selected = selectedStartISO === s.iso;
                  return (
                    <button
                      type="button"
                      key={s.iso}
                      onClick={() => setSelectedStartISO(s.iso)}
                      className={cn(
                        "px-3 py-2 rounded-md border text-sm",
                        selected ? "bg-blue-600 text-white border-blue-700" : "hover:bg-gray-50"
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Serviço */}
          <div>
            <Label htmlFor="service" className="text-sm font-medium">
              Tipo de Serviço *
            </Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Revisão Completa">Revisão Completa</SelectItem>
                <SelectItem value="Troca de óleo">Troca de óleo</SelectItem>
                <SelectItem value="Reparo de Freios">Reparo de Freios</SelectItem>
                <SelectItem value="Suspensão">Suspensão</SelectItem>
                <SelectItem value="Ar Condicionado">Ar Condicionado</SelectItem>
                <SelectItem value="Pneus">Pneus</SelectItem>
                <SelectItem value="Bateria">Bateria</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              Observações
            </Label>
            <Textarea
              id="notes"
              placeholder="Informações adicionais sobre o serviço..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!selectedStartISO || !selectedDriver}>
              Criar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;
