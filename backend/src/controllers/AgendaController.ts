// src/controllers/agenda.controller.ts
import { Request, Response } from "express";
import * as AgendaService from "../services/AgendaService";

export async function getAvailability(req: Request, res: Response) {
  const { oficinaId, date, durationMin, serviceId } = req.query;

  if (!oficinaId || !date) {
     res.status(400).json({ error: "oficinaId e date são obrigatórios" });
  }
  const dur =
    durationMin ? Number(durationMin) : undefined;

  const slots = await AgendaService.getAvailability({
    oficinaId: String(oficinaId),
    date: String(date),              // "YYYY-MM-DD"
    durationMin: dur,
    serviceId: serviceId ? Number(serviceId) : undefined,
  });

  res.json({ slots });
}

export async function book(req: Request, res: Response) {
  try {
    const {
      oficinaId, date, startTime, endTime,
      motoristaId, veiculoId, servicoId, customer, phone, email, notes
    } = req.body || {};

    if (!oficinaId || !date || !startTime || !endTime || !customer) {
       res.status(400).json({ error: "oficinaId, date, startTime, endTime e customer são obrigatórios" });
    }

    const booking = await AgendaService.book({
      oficinaId,
      date,
      startTime,
      endTime,
      motoristaId: motoristaId ?? null,
      veiculoId: veiculoId ?? null,
      servicoId: servicoId ? Number(servicoId) : null,
      customer,
      phone: phone ?? null,
      email: email ?? null,
      notes: notes ?? null,
    });

    res.status(201).json(booking);
  } catch (err: any) {
    res.status(409).json({ error: err?.message || "Erro ao agendar" });
  }
}
