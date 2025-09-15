// routes/appointments.routes.ts
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/appointments?oficinaId=...&from=YYYY-MM-DD&to=YYYY-MM-DD
router.get("/", async (req, res) => {
  const { oficinaId, from, to } = req.query;
  if (!oficinaId || !from || !to)  res.status(400).json({ error: "oficinaId, from, to obrigatórios" });
  const fromDate = new Date(String(from) + "T00:00:00");
  const toDate   = new Date(String(to)   + "T23:59:59");

  const items = await prisma.booking.findMany({
    where: { oficinaId: String(oficinaId), start: { gte: fromDate, lte: toDate } },
    orderBy: { start: "asc" },
    include: { servico: true, veiculo: true, motorista: true },
  });
  res.json(items);
});

export default router;
