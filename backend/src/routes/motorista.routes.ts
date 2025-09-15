import express from "express";
import multer from "multer";
import { MotoristaController } from "../controllers/MotoristaController";

const Motoristarouter = express.Router();
const upload = multer({ dest: "uploads/motoristas" });

Motoristarouter.get("/:id", MotoristaController.buscarPorId);
Motoristarouter.put("/:id", upload.single("avatar"), MotoristaController.atualizar);

export default Motoristarouter;
