import express from "express";
import { ChecklistController } from "../controllers/ChecklistController";

const router = express.Router();

router.get("/", ChecklistController.listar);      // ?motoristaId=...
router.get("/:id", ChecklistController.buscarPorId);
router.post("/", ChecklistController.criar);
router.post("/:id/complete", ChecklistController.concluir);
export default router;
