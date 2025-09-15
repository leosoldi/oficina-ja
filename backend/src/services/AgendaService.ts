// src/services/agenda.service.ts
import { prisma } from "../prisma"; // ajuste para o seu client
import { addMinutes, format, parse } from "date-fns";

const TZ = "America/Sao_Paulo"; // use date-fns-tz se precisar, mas aqui não é estritamente necessário

// --- Helpers de horário local "HH:mm" ---
function parseHM(hm: string) {
  return parse(hm, "HH:mm", new Date());
}
function toHM(date: Date) {
  return format(date, "HH:mm");
}
function hmAdd(hm: string, minutes: number) {
  return toHM(addMinutes(parseHM(hm), minutes));
}
function hmDiffMin(h1: string, h2: string) {
  return (parseHM(h2).getTime() - parseHM(h1).getTime()) / 60000;
}
function combineDateTime(dateISO: string, hm: string) {
  // cria Date local em "YYYY-MM-DDTHH:mm:00"
  return new Date(`${dateISO}T${hm}:00`);
}

// Parser de duração vinda de string ("30", "30m", "00:30", "1:00", "90min")
function parseDurationToMin(input?: string | null): number | null {
  if (!input) return null;
  const s = input.trim().toLowerCase();
  if (/^\d+$/.test(s)) return Number(s);
  if (s.endsWith("m") || s.endsWith("min")) {
    const n = parseInt(s, 10);
    return isNaN(n) ? null : n;
  }
  if (s.includes(":")) {
    const [h, m] = s.split(":").map(x => parseInt(x, 10));
    if (!isNaN(h) && !isNaN(m)) return h * 60 + m;
  }
  return null;
}

// --- Tipos ---
type GetAvailabilityParams = {
  oficinaId: string;
  date: string;            // "YYYY-MM-DD"
  durationMin?: number;    // opcional, pode vir de serviceId
  serviceId?: number;
};

export async function getAvailability(p: GetAvailabilityParams) {
  // 1) Duracao alvo
  let duration = p.durationMin ?? null;
  if (!duration && p.serviceId) {
    const serv = await prisma.servicoOferecido.findUnique({ where: { id: p.serviceId } });
    duration = parseDurationToMin(serv?.duracao ?? null) ?? 30; // fallback 30
  }
  if (!duration) duration = 30;

  // 2) Regras do dia
  const weekday = new Date(`${p.date}T00:00:00`).getDay(); // 0..6
  const rules = await prisma.openingRule.findMany({
    where: { oficinaId: p.oficinaId, weekday },
    orderBy: { startTime: "asc" },
  });

  if (rules.length === 0) return [];

  // 3) Exceptions do dia
  const startDay = new Date(`${p.date}T00:00:00`);
  const endDay   = new Date(`${p.date}T23:59:59`);
  const exceptions = await prisma.exception.findMany({
    where: { oficinaId: p.oficinaId, date: { gte: startDay, lte: endDay } },
  });

  // 4) Bookings do dia
  const bookings = await prisma.booking.findMany({
    where: {
      oficinaId: p.oficinaId,
      start: { gte: startDay, lte: endDay },
      status: { not: "CANCELED" }
    },
    select: { start: true, end: true }
  });

  // 5) Ocupações atomizadas (se quiser checar explicitamente)
  const occupied = await prisma.occupiedBlock.findMany({
    where: { oficinaId: p.oficinaId, start: { gte: startDay, lte: endDay } },
    select: { start: true }
  });
  const occupiedSet = new Set(occupied.map(o => o.start.getTime()));

  // 6) Geração de slots
  const slots: { startTime: string; endTime: string }[] = [];

  for (const r of rules) {
    // janelas base (antes do intervalo)
    const windows: Array<{ start: string; end: string }> = [];
    if (r.breakStart && r.breakEnd) {
      // [startTime -> breakStart] e [breakEnd -> endTime]
      if (hmDiffMin(r.startTime, r.breakStart) >= duration) {
        windows.push({ start: r.startTime, end: r.breakStart });
      }
      if (hmDiffMin(r.breakEnd, r.endTime) >= duration) {
        windows.push({ start: r.breakEnd, end: r.endTime });
      }
    } else {
      windows.push({ start: r.startTime, end: r.endTime });
    }

    const step = Math.max(r.slotSizeMin ?? 30, duration);

    for (const w of windows) {
      let t = w.start;
      while (hmDiffMin(t, w.end) >= duration) {
        const sHM = t;
        const eHM = hmAdd(sHM, duration);

        // exceptions (dia todo ou faixa)
        const blockedByException = exceptions.some(ex => {
          // dia inteiro
          if (!ex.startTime && !ex.endTime) return true;
          // parcial
          if (ex.startTime && ex.endTime) {
            return !(eHM <= ex.startTime || sHM >= ex.endTime);
          }
          return false;
        });
        if (blockedByException) {
          t = hmAdd(t, step);
          continue;
        }

        // Check booking overlap
        const sDate = combineDateTime(p.date, sHM);
        const eDate = combineDateTime(p.date, eHM);
        const overlapBooking = bookings.some(b => !(eDate <= b.start || sDate >= b.end));
        if (overlapBooking) {
          t = hmAdd(t, step);
          continue;
        }

        // Check occupied blocks (cada 30 min entre s..e deve estar livre)
        let hasOccupied = false;
        for (let cursor = new Date(sDate); cursor < eDate; cursor = addMinutes(cursor, 30)) {
          if (occupiedSet.has(cursor.getTime())) {
            hasOccupied = true;
            break;
          }
        }
        if (hasOccupied) {
          t = hmAdd(t, step);
          continue;
        }

        slots.push({ startTime: sHM, endTime: eHM });
        t = hmAdd(t, step);
      }
    }
  }

  // ordena
  slots.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
  return slots;
}

type BookParams = {
  oficinaId: string;
  date: string;             // "YYYY-MM-DD"
  startTime: string;        // "HH:mm"
  endTime: string;          // "HH:mm"
  motoristaId?: string | null;
  veiculoId?: string | null;
  servicoId?: number | null;
  customer: string;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
};

export async function book(p: BookParams) {
  // 1) Checa disponibilidade do exato slot
  const duration = hmDiffMin(p.startTime, p.endTime);
  const slots = await getAvailability({
    oficinaId: p.oficinaId,
    date: p.date,
    durationMin: duration,
    serviceId: p.servicoId ?? undefined,
  });

  const ok = slots.some(s => s.startTime === p.startTime && s.endTime === p.endTime);
  if (!ok) {
    throw new Error("Horário indisponível");
  }

  // 2) Transação: cria Booking + OccupiedBlocks (um a cada 30 min)
  const startDate = combineDateTime(p.date, p.startTime);
  const endDate   = combineDateTime(p.date, p.endTime);
  
const occupiedBlockCreates: Array<{ oficinaId: string; start: Date }> = [];

for (let cur = new Date(startDate); cur < endDate; cur = addMinutes(cur, 30)) {
  occupiedBlockCreates.push({
    oficinaId: p.oficinaId,
    start: cur,
  });
}

  try {
    const result = await prisma.$transaction(async (tx) => {
      // cria booking
      const booking = await tx.booking.create({
        data: {
          oficinaId: p.oficinaId,
          motoristaId: p.motoristaId ?? null,
          veiculoId: p.veiculoId ?? null,
          servicoId: p.servicoId ?? null,
          customer: p.customer,
          phone: p.phone ?? null,
          email: p.email ?? null,
          start: startDate,
          end: endDate,
          notes: p.notes ?? null,
          status: "CONFIRMED",
        },
      });

      // cria os occupied blocks (únicos por constraint)
      for (const ob of occupiedBlockCreates) {
        await tx.occupiedBlock.create({ data: ob });
      }

      return booking;
    });

    return result;
  } catch (e: any) {
    // P2002 = unique constraint (alguém levou o slot no mesmo instante)
    if (e?.code === "P2002") {
      throw new Error("Horário acabou de ser reservado. Escolha outro.");
    }
    throw e;
  }
}
