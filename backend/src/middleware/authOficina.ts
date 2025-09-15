import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "./auth"; // aproveita seu middleware existente

// Middleware composto: valida JWT e garante que seja do tipo oficina
export function ensureAuthOficina(req: Request, res: Response, next: NextFunction) {
  // Primeiro, roda o verifyJWT normalmente
  verifyJWT(req, res, (err?: any) => {
    if (err) return; // verifyJWT já respondeu com 401 se deu erro

    // Agora valida se é uma oficina
    if (
      !req.user ||
      (typeof req.user === "string") ||
      (typeof req.user === "object" && "type" in req.user && (req.user as any).type !== "oficina")
    ) {
      return res.status(403).json({ message: "Acesso permitido apenas para oficinas" });
    }

    return next();
  });
}
