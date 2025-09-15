import { Request, Response } from "express";
import { veiculoService } from "../services/veiculoService";

export class VeiculoController {
  static async criar(req: Request, res: Response) {
    console.log(req.body)
    try {
      const veiculo = await veiculoService.criar(req.body);
       res.json(veiculo);
    } catch (error) {
        console.log(error)
       res.status(500).json({ error: "Erro ao criar veículo" });
    }
  }

  static async listarPorMotorista(req: Request, res: Response) {
    try {
      const veiculos = await veiculoService.listarPorMotorista(req.params.id);
       res.json(veiculos);
    } catch (error) {
       res.status(500).json({ error: "Erro ao listar veículos" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      await veiculoService.deletar(req.params.id);
       res.sendStatus(204);
    } catch (error) {
       res.status(500).json({ error: "Erro ao deletar veículo" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const veiculo = await veiculoService.atualizar(req.params.id, req.body);
       res.json(veiculo);
    } catch (error) {
       res.status(500).json({ error: "Erro ao atualizar veículo" });
    }
  }
}
