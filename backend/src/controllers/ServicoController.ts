// src/controllers/ServicoController.ts
import { Request, Response } from "express";
import { ServicoService } from "../services/ServicoService";

export class ServicoController {
  static async criar(req: Request, res: Response) {
    try {
      const data = req.body;
      const servico = await ServicoService.criar(data);
      res.json(servico);
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      res.status(500).json({ error: "Erro interno ao criar serviço" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id)
      const servicos = await ServicoService.listarPorOficina(id);
      res.json(servicos);
    } catch (error) {
      console.error("Erro ao listar serviços:", error);
      res.status(500).json({ error: "Erro interno ao listar serviços" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const atualizado = await ServicoService.atualizar(parseInt(id), data);
      res.json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      res.status(500).json({ error: "Erro interno ao atualizar serviço" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ServicoService.deletar(parseInt(id));
      res.json({ sucesso: true });
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
      res.status(500).json({ error: "Erro interno ao deletar serviço" });
    }
  }
}
