// src/components/NewBlockModal.tsx
import React, { useState } from 'react';
import { Appointment } from '@/types/appointment';

export interface NewBlockModalProps {
  /** Callback disparado ao confirmar a criação do agendamento */
  onCreateAppointment?: (appointment: Omit<Appointment, 'id'>) => void;
}

const NewBlockModal: React.FC<NewBlockModalProps> = ({ onCreateAppointment }) => {
  const [open, setOpen] = useState(false);

  // Exemplo de estado do form (substitua pelos seus campos reais)
  const [form, setForm] = useState<Omit<Appointment, 'id'>>({
    date: '',
    startTime: '',
    endTime: '',
    serviceId: '',
    vetId: undefined,
    notes: '',
  });

  const handleConfirm = () => {
    onCreateAppointment?.(form);
    setOpen(false);
  };

  return (
    <>
      {/* seu botão para abrir o modal */}
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        onClick={() => setOpen(true)}
      >
        Novo bloco
      </button>

      {/* seu modal (troque pelo componente/modal que usa) */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Novo agendamento</h3>

            {/* Campos de exemplo */}
            <div className="space-y-2">
              <input
                className="w-full border rounded px-3 py-2"
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="time"
                value={form.startTime}
                onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="time"
                value={form.endTime}
                onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Serviço"
                value={form.serviceId}
                onChange={e => setForm(f => ({ ...f, serviceId: e.target.value }))}
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                placeholder="Observações"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button className="px-4 py-2 rounded border" onClick={() => setOpen(false)}>
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBlockModal;
