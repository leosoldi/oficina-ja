// src/utils/date.ts
export const toDateTime = (dateISO: string | Date, hhmm: string) => {
  const base = new Date(dateISO);
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(base); d.setHours(h, m, 0, 0);
  return d;
};

export const addMin = (d: Date, min: number) => new Date(d.getTime() + min * 60000);

export function* iterSlots(start: Date, end: Date, stepMin = 30) {
  for (let t = new Date(start); t < end; t = addMin(t, stepMin)) yield new Date(t);
}

export const startOfDay = (dateISO: string | Date) => {
  const d = new Date(dateISO); d.setHours(0,0,0,0); return d;
};
export const endOfDay = (dateISO: string | Date) => {
  const d = new Date(dateISO); d.setHours(23,59,59,999); return d;
};

export function* eachDay(startISO: string, endISO: string) {
  const start = startOfDay(startISO);
  const end = startOfDay(endISO);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    yield new Date(d);
  }
}
