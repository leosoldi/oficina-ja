import { Request, Response } from "express";
import { ExceptionService } from "../services/ExceptionService";

export class ExceptionController {
  // POST /api/agenda/oficina/:oficinaId/exceptions
  static async create(req: Request, res: Response) {
    try {
      const { oficinaId } = req.params;
      const body = req.body;

      if (body?.range && body?.weekdays) {
        // modo "range"
        const created = await ExceptionService.createRange(oficinaId, body);
        res.json(created);
      }

      if (!body?.date)  res.status(400).json({ error: "date é obrigatório" });
      const created = await ExceptionService.create(oficinaId, body);
      res.json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message ?? "Erro ao criar exceção" });
    }
  }

  // GET /api/agenda/oficina/:oficinaId/exceptions?from=YYYY-MM-DD&to=YYYY-MM-DD
  static async list(req: Request, res: Response) {
    try {
      const { oficinaId } = req.params;
      const { from, to } = req.query as any;
      const out = await ExceptionService.list(oficinaId, from, to);
      res.json(out);
    } catch (e: any) {
      res.status(500).json({ error: e.message ?? "Erro ao listar exceções" });
    }
  }

  // DELETE /api/agenda/exceptions/:id
  static async remove(req: Request, res: Response) {
    try {
      await ExceptionService.remove(req.params.id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message ?? "Erro ao excluir exceção" });
    }
  }
}
