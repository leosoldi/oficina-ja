import { api } from "./api";

export const motoristaService = {
  async buscarPorId(id: string) {
    try {
      const response = await api.get(`/motorista/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar motorista:", error);
      throw error;
    }
  },

  async atualizar(id: string, data: any) {
    try {
      const response = await api.put(`/motorista/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar motorista:", error);
      throw error;
    }
  }
};
