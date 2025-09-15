// src/components/appointments/OpeningRulesModal.tsx
import React, { useEffect, useMemo, useState } from "react";
import { OpeningRules, type OpeningRuleDTO } from "@/services/OpeningRules";
import { Settings2, X, Pencil, Trash2, Clock } from "lucide-react";

type Props = {
  oficinaId: string;
  onSaved?: () => void;
  triggerLabel?: string;
  triggerClassName?: string;
};

const WEEKDAYS = [
  { v: 0, label: "Dom" },
  { v: 1, label: "Seg" },
  { v: 2, label: "Ter" },
  { v: 3, label: "Qua" },
  { v: 4, label: "Qui" },
  { v: 5, label: "Sex" },
  { v: 6, label: "Sáb" },
];

export default function OpeningRulesModal({
  oficinaId,
  onSaved,
  triggerLabel = "Definir horários",
  triggerClassName = "px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
}: Props) {
  const [open, setOpen] = useState(false);
  const [rules, setRules] = useState<OpeningRuleDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<OpeningRuleDTO, "id">>({
    oficinaId,
    weekday: 1,
    startTime: "08:00",
    endTime: "18:00",
    breakStart: "12:00",
    breakEnd: "13:00",
    slotSizeMin: 30,
  });

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);
  const [error, setError] = useState<string>("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await OpeningRules.list(oficinaId);
      setRules(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) load();
  }, [open]);

  // validações simples (string HH:mm)
  function isLt(a?: string | null, b?: string | null) {
    if (!a || !b) return true;
    return a < b;
  }
  function validate() {
    if (!isLt(form.startTime, form.endTime)) return "Início deve ser antes do fim.";
    if (form.breakStart && form.breakEnd) {
      if (!isLt(form.breakStart, form.breakEnd)) return "Intervalo: início deve ser antes do fim.";
      if (!(form.startTime <= form.breakStart && form.breakEnd <= form.endTime)) {
        return "Intervalo deve estar dentro do horário principal.";
      }
    }
    if (!form.slotSizeMin || form.slotSizeMin < 5) return "Slot mínimo inválido.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err) return;

    if (isEditing) {
      await OpeningRules.update(editingId!, {
        weekday: form.weekday,
        startTime: form.startTime,
        endTime: form.endTime,
        breakStart: form.breakStart || null,
        breakEnd: form.breakEnd || null,
        slotSizeMin: form.slotSizeMin,
      });
      setEditingId(null);
    } else {
      await OpeningRules.create({
        ...form,
        breakStart: form.breakStart || null,
        breakEnd: form.breakEnd || null,
      });
    }
    await load();
    onSaved?.();
  }

  function startEdit(r: OpeningRuleDTO) {
    setEditingId(r.id);
    setForm({
      oficinaId,
      weekday: r.weekday,
      startTime: r.startTime,
      endTime: r.endTime,
      breakStart: r.breakStart ?? undefined,
      breakEnd: r.breakEnd ?? undefined,
      slotSizeMin: r.slotSizeMin,
    });
    setError("");
  }

  async function removeRule(id: string) {
    if (!confirm("Excluir esta regra?")) return;
    await OpeningRules.remove(id);
    await load();
    onSaved?.();
  }

  function resetForm() {
    setEditingId(null);
    setForm((f) => ({
      ...f,
      weekday: 1,
      startTime: "08:00",
      endTime: "18:00",
      breakStart: "12:00",
      breakEnd: "13:00",
      slotSizeMin: 30,
    }));
    setError("");
  }

  return (
    <>
      {/* Botão de abrir */}
      <button className={triggerClassName} onClick={() => setOpen(true)}>
        <span className="inline-flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          {triggerLabel}
        </span>
      </button>

      {!open ? null : (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* modal */}
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-semibold">Horários de atendimento</h3>
              <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(false)} aria-label="Fechar">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* conteúdo */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna esquerda: Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Weekday chips */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dia da semana</label>
                      <div className="flex flex-wrap gap-2">
                        {WEEKDAYS.map(({ v, label }) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, weekday: v }))}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition
                              ${form.weekday === v ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 hover:bg-gray-50"}
                            `}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Times grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Início</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="time"
                            value={form.startTime}
                            onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Fim</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="time"
                            value={form.endTime}
                            onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Intervalo início</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="time"
                            value={form.breakStart || ""}
                            onChange={(e) => setForm((f) => ({ ...f, breakStart: e.target.value || undefined }))}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Intervalo fim</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="time"
                            value={form.breakEnd || ""}
                            onChange={(e) => setForm((f) => ({ ...f, breakEnd: e.target.value || undefined }))}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slot + Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-end sm:justify-between">
                      <div className="w-full sm:w-56">
                        <label className="block text-sm text-gray-700 mb-1">Slot (min)</label>
                        <input
                          type="number"
                          min={5}
                          step={5}
                          value={form.slotSizeMin}
                          onChange={(e) => setForm((f) => ({ ...f, slotSizeMin: Number(e.target.value) }))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        {isEditing && (
                          <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                          >
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {isEditing ? "Salvar alterações" : "Adicionar regra"}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                      </div>
                    )}
                  </form>
                </div>

                {/* Coluna direita: Lista */}
                <div className="lg:col-span-1">
                  <div className="border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50 font-medium">Regras cadastradas</div>

                    {loading ? (
                      <div className="px-4 py-6 text-sm text-gray-500">Carregando…</div>
                    ) : rules.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-gray-500">Nenhuma regra cadastrada.</div>
                    ) : (
                      <div className="overflow-auto max-h-[360px]">
                        <table className="min-w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr className="text-left text-gray-600">
                              <th className="px-4 py-2">Dia</th>
                              <th className="px-4 py-2">Horário</th>
                              <th className="px-4 py-2">Intervalo</th>
                              <th className="px-4 py-2">Slot</th>
                              <th className="px-4 py-2">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rules.map((r) => (
                              <tr key={r.id} className="border-t">
                                <td className="px-4 py-2">
                                  <span className="font-medium">
                                    {WEEKDAYS.find((w) => w.v === r.weekday)?.label}
                                  </span>
                                </td>
                                <td className="px-4 py-2">
                                  {r.startTime} – {r.endTime}
                                </td>
                                <td className="px-4 py-2 text-gray-600">
                                  {r.breakStart && r.breakEnd ? `${r.breakStart} – ${r.breakEnd}` : "—"}
                                </td>
                                <td className="px-4 py-2">{r.slotSizeMin} min</td>
                                <td className="px-4 py-2">
                                  <div className="flex items-center gap-2">
                                    <button
                                      className="px-2 py-1 border rounded hover:bg-gray-50"
                                      title="Editar"
                                      onClick={() => startEdit(r)}
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      className="px-2 py-1 border rounded hover:bg-gray-50"
                                      title="Excluir"
                                      onClick={() => removeRule(r.id)}
                                    >
                                      <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Rodapé do modal */}
                  <div className="mt-4 text-right">
                    <button
                      className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
