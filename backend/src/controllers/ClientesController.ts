import { Request, Response } from "express";
import { ClientesService } from "../services/ClientesService";

export class ClientesController {
  static async listar(req: Request, res: Response) {
    try {
      const oficinaId = (req.user as any).id;
      const search = (req.query.q as string) || "";
      const clientes = await ClientesService.listar(oficinaId, search);
      res.json(clientes);
    } catch (e:any) {
      res.status(500).json({ error: e.message || "Erro ao listar clientes" });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const oficinaId = (req.user as any).id;
      const payload = req.body; // { nome, email?, telefone?, veiculoModelo?, veiculoAno?, veiculoPlaca? }
      const created = await ClientesService.criar(oficinaId, payload);
      res.status(201).json(created);
    } catch (e:any) {
      res.status(400).json({ error: e.message || "Erro ao cadastrar cliente" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const oficinaId = (req.user as any).id;
      const { id } = req.params;
      const payload = req.body;
      const updated = await ClientesService.atualizar(oficinaId, id, payload);
      res.json(updated);
    } catch (e:any) {
      res.status(400).json({ error: e.message || "Erro ao atualizar cliente" });
    }
  }

  static async excluir(req: Request, res: Response) {
    try {
      const oficinaId = (req.user as any).id;
      const { id } = req.params;
      await ClientesService.excluir(oficinaId, id);
      res.status(204).send();
    } catch (e:any) {
      res.status(400).json({ error: e.message || "Erro ao excluir cliente" });
    }
  }
}
