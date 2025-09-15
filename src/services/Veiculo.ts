import { api } from "./api";

export const veiculoService = {
  async cadastrar(dados) {
    return api.post("/veiculo", dados);

  },
  async listarPorMotorista(motoristaId) {
    return api.get(`/veiculo/${motoristaId}`);
  }
};
