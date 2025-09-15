import { Router } from "express";
import { PreCadastroController } from "../controllers/PreCadastroController";
import { ensureAuthOficina } from "../middleware/authOficina";

const precadrouter = Router();

precadrouter.post(
  "/oficinas/:oficinaId/pre-cadastros",
  ensureAuthOficina,
  PreCadastroController.criar
);

precadrouter.get("/pre-cadastros/:token", PreCadastroController.obterPorToken);
precadrouter.post("/pre-cadastros/:token/aceitar", PreCadastroController.aceitar);

export default precadrouter;
