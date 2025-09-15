import { Router } from "express";
import { VeiculoController } from "../controllers/VeiculoController";

const veiculoRouter = Router();

veiculoRouter.post("/veiculo", VeiculoController.criar);
veiculoRouter.get("/veiculos/:id", VeiculoController.listarPorMotorista);
veiculoRouter.put("/veiculo/:id", VeiculoController.atualizar);
veiculoRouter.delete("/veiculo/:id", VeiculoController.deletar);

export default veiculoRouter;
