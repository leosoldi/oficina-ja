import { prisma } from "../prisma";
import type { Prisma } from "@prisma/client";
import { eachDay, startOfDay, endOfDay } from "../utils/date";

type ExceptionBody = {
  date: string;              // "YYYY-MM-DD"
  startTime?: string | null; // "12:00" (opcional)
  endTime?: string | null;   // "13:30" (opcional)
  reason?: string | null;
};

type RangeBody = {
  range: { startDate: string; endDate: string }; // "YYYY-MM-DD"
  weekdays: number[];       // 0..6 (0=Dom)
  startTime: string;        // obrigatório no modo range
  endTime: string;          // obrigatório no modo range
  reason?: string | null;
};

export class ExceptionService {
  /** cria uma exceção de 1 dia (dia inteiro se não mandar start/end) */
  static async create(oficinaId: string, body: ExceptionBody) {
    return prisma.exception.create({
      data: {
        oficinaId,
        date: startOfDay(body.date),
        startTime: body.startTime ?? null,
        endTime: body.endTime ?? null,
        reason: body.reason ?? null,
      },
    });
  }

  /** cria várias exceções por intervalo de datas e dias da semana (útil p/ almoço fixo) */
static async createRange(oficinaId: string, body: RangeBody) {
  const toCreate: Prisma.ExceptionCreateManyInput[] = [];
  const weekdaySet = new Set(body.weekdays);

  for (const day of eachDay(body.range.startDate, body.range.endDate)) {
    const wd = (day.getDay() + 7) % 7;
    if (!weekdaySet.has(wd)) continue;

    toCreate.push({
      oficinaId,
      date: startOfDay(day),
      startTime: body.startTime,
      endTime: body.endTime,
      reason: body.reason ?? null,
    });
  }

  if (!toCreate.length) return { count: 0 };
  return prisma.exception.createMany({ data: toCreate, skipDuplicates: true });
}


  /** lista exceções; pode filtrar por período */
  static async list(oficinaId: string, from?: string, to?: string) {
    return prisma.exception.findMany({
      where: {
        oficinaId,
        ...(from && to
          ? { date: { gte: startOfDay(from), lte: endOfDay(to) } }
          : {}),
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });
  }

  static async remove(id: string) {
    return prisma.exception.delete({ where: { id } });
  }
}
