import { Router } from "express";
import { ClientesController } from "../controllers/ClientesController";
import { ensureAuthOficina } from "../middleware/authOficina";

const router = Router();

// tudo restrito à OFICINA logada
router.get("/oficina/clientes", ensureAuthOficina, ClientesController.listar);
router.post("/oficina/clientes", ensureAuthOficina, ClientesController.criar);
router.put("/oficina/clientes/:id", ensureAuthOficina, ClientesController.atualizar);
router.delete("/oficina/clientes/:id", ensureAuthOficina, ClientesController.excluir);

export default router;
