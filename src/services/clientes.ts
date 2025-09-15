import { api } from "./api"; // seu axios configurado com baseURL e Authorization

export type ClienteDTO = {
  id: string;
  nome: string;
  telefone?: string | null;
  email?: string | null;
  veiculoModelo?: string | null;
  veiculoAno?: string | null;
  veiculoPlaca?: string | null;
  status: string;
  createdAt: string;
};

export const clientesService = {
  async listar(q = ""): Promise<ClienteDTO[]> {
    const { data } = await api.get("/cliente/oficina/clientes", { params: { q } });
    return data;
    // backend lê oficinaId do token
  },

  async criar(payload: Omit<ClienteDTO, "id" | "status" | "createdAt">) {
    const { data } = await api.post("/cliente/oficina/clientes", payload);
    return data as ClienteDTO;
  },

  async atualizar(id: string, payload: Partial<Omit<ClienteDTO, "id" | "status" | "createdAt">>) {
    const { data } = await api.put(`/cliente/oficina/clientes/${id}`, payload);
    return data as ClienteDTO;
  },

  async excluir(id: string) {
    await api.delete(`/cliente/oficina/clientes/${id}`);
  },
};
