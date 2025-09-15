// src/routes/agenda.routes.ts
import { Router } from "express";
import * as AgendaController from "../controllers/AgendaController";

const router = Router();

/**
 * GET /api/agenda/availability?oficinaId=...&date=2025-08-20&durationMin=30
 * ou: ...&serviceId=123 (se preferir derivar duração do serviço)
 */
router.get("/availability", AgendaController.getAvailability);

/**
 * POST /api/agenda/book
 * body: {
 *   oficinaId, date: "YYYY-MM-DD", startTime: "HH:mm", endTime: "HH:mm",
 *   motoristaId?, veiculoId?, servicoId?, customer, phone?, email?, notes?
 * }
 */
router.post("/book", AgendaController.book);

export default router;
