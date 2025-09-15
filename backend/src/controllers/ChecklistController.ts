// src/controllers/ChecklistController.ts
import { Request, Response, NextFunction } from "express";
import { ChecklistService } from "../services/ChecklistService";

export class ChecklistController {
  static async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        category,
        items,
        isTemplate,
        assignedToMotoristaId,
      } = req.body;

      if (
        !title ||
        !description ||
        !category ||
        !Array.isArray(items) ||
        items.length === 0
      ) {
         res
          .status(400)
          .json({ error: "Dados inválidos para criação do checklist." });
      }

      const checklist = await ChecklistService.criar({
        title,
        description,
        category,
        isTemplate: !!isTemplate,
        assignedToMotoristaId: assignedToMotoristaId || null,
        items,
      });

       res.status(201).json(checklist);
    } catch (error) {
      return next(error);
    }
  }

  static async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const { motoristaId } = req.query as { motoristaId?: string };
      const list = await ChecklistService.listar({ motoristaId });
       res.json(list);
    } catch (error) {
       next(error);
    }
  }

  static async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const checklist = await ChecklistService.buscarPorId(id);
      if (!checklist) {
         res.status(404).json({ error: "Checklist não encontrado" });
      }
       res.json(checklist);
    } catch (error) {
      return next(error);
    }
  }

  // ✅ concluir
  static async concluir(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { notes, items, parts } = req.body as {
        notes?: string;
        items?: Array<{ id: number | string; completed: boolean }>;
        parts?: Array<{
          name: string;
          quantity: number;
          estimatedPrice?: number;
          notes?: string;
        }>;
      };

      const updated = await ChecklistService.concluir(id, { notes, items, parts });
       res.json(updated);
    } catch (error: any) {
      if (error?.code === "NOT_FOUND") {
         res.status(404).json({ error: "Checklist não encontrado" });
      }
      return next(error);
    }
  }

  static async remover(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ChecklistService.remover(id);
      return res.status(204).send(); // sem body
    } catch (err: any) {
      if (err?.code === "NOT_FOUND") {
        return res.status(404).json({ error: "Checklist não encontrado" });
      }
      return next(err);
    }
  }
}
