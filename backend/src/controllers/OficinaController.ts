import { Request, Response } from "express";
import { OficinaService } from "../services/OficinaService";

export class OficinaController {
  static async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log(id, data);
      const avatar = req.file
        ? `/uploads/oficinas/${req.file.filename}`
        : undefined;

      const updated = await OficinaService.atualizar(id, data, avatar);
      res.json(updated);
    } catch (error) {
      console.error("Erro ao atualizar oficina:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
      ("");
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oficina = await OficinaService.buscarPorId(id);
      if (!oficina) {
        res.status(404).json({ error: "Oficina não encontrada" });
      }
      res.json(oficina);
    } catch (error) {
      console.error("Erro ao buscar oficina:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async buscarProximas(req: Request, res: Response) {
    try {
      const { lat, lng, servico } = req.query;

      if (!lat || !lng) {
         res
          .status(400)
          .json({ error: "Latitude e longitude são obrigatórios" });
      }

      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);

      const oficinas = await OficinaService.buscarProximas(
        latitude,
        longitude,
        servico as string
      );

       res.json(oficinas);
    } catch (error) {
      console.error("Erro ao buscar oficinas próximas:", error);
       res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
