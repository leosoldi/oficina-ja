import { api } from "./api";

export const servicoService = {
  async criar(data: any) {
    try {
      const response = await api.post("/servicos/create", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      throw error;
    }
  },

  async listar(oficinaId: string) {
    try {
      const response = await api.get(`/servicos/listen/${oficinaId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar serviços:", error);
      throw error;
    }
  },

  async atualizar(id: number, data: any) {
    try {
      const response = await api.put(`/servicos/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      throw error;
    }
  },

  async deletar(id: number) {
    try {
      const response = await api.delete(`/servicos/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
      throw error;
    }
  }
};
