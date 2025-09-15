// src/routes/servico.ts
import { Router } from "express";
import { ServicoController } from "../controllers/ServicoController";

const routerService = Router();

routerService.post("/create", ServicoController.criar);
routerService.get("/listen/:id", ServicoController.listar);
routerService.put("/update/:id", ServicoController.atualizar);
routerService.delete("/delete/:id", ServicoController.deletar);

export default routerService;
