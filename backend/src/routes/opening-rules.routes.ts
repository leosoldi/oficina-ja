import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/** LISTAR regras da oficina */
router.get("/", async (req, res) => {
  const { oficinaId } = req.query;
  if (!oficinaId)  res.status(400).json({ error: "oficinaId é obrigatório" });

  const rules = await prisma.openingRule.findMany({
    where: { oficinaId: String(oficinaId) },
    orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
  });

  res.json(rules);
});

/** CRIAR regra */
router.post("/", async (req, res) => {
  const { oficinaId, weekday, startTime, endTime, breakStart, breakEnd, slotSizeMin } = req.body || {};
  if (!oficinaId || weekday === undefined || !startTime || !endTime) {
     res.status(400).json({ error: "oficinaId, weekday, startTime e endTime são obrigatórios" });
  }
  const rule = await prisma.openingRule.create({
    data: {
      oficinaId,
      weekday: Number(weekday),
      startTime,
      endTime,
      breakStart: breakStart || null,
      breakEnd: breakEnd || null,
      slotSizeMin: slotSizeMin ?? 30,
    },
  });
  res.status(201).json(rule);
});

/** ATUALIZAR regra */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, breakStart, breakEnd, slotSizeMin, weekday } = req.body || {};
  const rule = await prisma.openingRule.update({
    where: { id },
    data: {
      ...(weekday !== undefined ? { weekday: Number(weekday) } : {}),
      ...(startTime ? { startTime } : {}),
      ...(endTime ? { endTime } : {}),
      breakStart: breakStart ?? null,
      breakEnd: breakEnd ?? null,
      ...(slotSizeMin ? { slotSizeMin: Number(slotSizeMin) } : {}),
    },
  });
  res.json(rule);
});

/** DELETAR regra */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.openingRule.delete({ where: { id } });
  res.status(204).end();
});

export default router;
