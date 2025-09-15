import { api } from "../services/api";

export const oficinaService = { 

    async atualizar(id: string, data: any) {
        try {
        const response = await api.put(`/oficina/${id}`, data);
        return response.data;
        } catch (error) {
        console.error("Erro ao atualizar oficina:", error);
        throw error; 
        }
    },

    async buscarPorId(id: string) {
        const response = await api.get(`/detailOficina/${id}`);
        return response.data;
    }

    
    
}