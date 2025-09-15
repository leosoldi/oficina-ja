// services/preCadastro.ts
import { api } from "@/services/api";

export async function criarPreCadastro(oficinaId: string, payload: any) {
  const { data } = await api.post(`/pre-cadastro/oficinas/${oficinaId}/pre-cadastros`, payload);
  return data; // { status: "INVITED"|"LINKED", inviteUrl? }
}
