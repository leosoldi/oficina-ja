import { Request, Response } from "express";
import { MotoristaService } from "../services/MotoristaService";

export class MotoristaController {
  static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const motorista = await MotoristaService.buscarPorId(id);
      if (!motorista) {
        res.status(404).json({ error: "Motorista não encontrado" });
      }
      res.json(motorista);
    } catch (error) {
      console.error("Erro ao buscar motorista:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const avatar = req.file ? `/uploads/motoristas/${req.file.filename}` : undefined;

      const motoristaAtualizado = await MotoristaService.atualizar(id, data, avatar);
      res.json(motoristaAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar motorista:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
