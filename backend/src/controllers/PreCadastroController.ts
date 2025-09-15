// src/controllers/PreCadastroController.ts
import { Request, Response, NextFunction } from "express";
import { PreCadastroService } from "../services/PreCadastroService";

export class PreCadastroController {
  static async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { oficinaId } = req.params;
      const {
        nome, email, telefone, veiculoModelo, veiculoAno, veiculoPlaca,
      } = req.body;

      // Use ENV se existir; senão, gera fallback com o host atual
      const baseFromEnv = process.env.INVITE_BASE_URL; // ex.: https://app.seudominio.com/convite
      const baseUrl = (baseFromEnv || `${req.protocol}://${req.get("host")}/convite`).replace(/\/+$/, "");

      // se quiser exigir ENV obrigatoriamente, troque para:
      // if (!baseFromEnv) return res.status(500).json({ error: "INVITE_BASE_URL não configurada" });

      const result = await PreCadastroService.criar({
        oficinaId,
        nome,
        email,
        telefone,
        veiculoModelo,
        veiculoAno,
        veiculoPlaca,
        baseUrl,
      });

       res.status(201).json(result);
    } catch (err) {
       next(err);
    }
  }

  static async obterPorToken(req: Request, res: Response, next: NextFunction) {
    try {
      const invite = await PreCadastroService.obterPorToken(req.params.token);
       res.json(invite);
    } catch (err) {
      return next(err);
    }
  }

  static async aceitar(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PreCadastroService.aceitar({
        token: req.params.token,
        provider: req.body.provider,
        googleId: req.body.googleId,
        realEmail: req.body.realEmail,
      });
       res.json(result);
    } catch (err) {
       next(err);
    }
  }
}
