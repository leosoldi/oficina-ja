import { api } from "./api"; // Já configurado com baseURL e interceptors

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nome: string;
    type: "motorista" | "oficina";
  };
}

interface WorkshopFormData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  password: string;
  confirmPassword: string;
}


export const authService = {
  async login(email: string, password: string, type: "motorista" | "oficina") {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
      type,
    });
    return response.data;
  },

async register(data: WorkshopFormData & { type: "motorista" | "oficina" }) {
  const response = await api.post<AuthResponse>("/auth/register", {
    ...data,
  });
  return response.data;
}

};
