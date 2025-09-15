import { useState } from "react";

// useCep.ts
export function useCep(callback: (data: {
  address: string;
  cep: string;
  cidade?: string;
  estado?: string;
}) => void) {
  const [loading, setLoading] = useState(false);

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          callback({
            address: `${data.logradouro} - ${data.bairro}`,
            cep,
            cidade: data.localidade, // incluído, mas opcional
            estado: data.uf,         // incluído, mas opcional
          });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoading(false);
      }
    } else {
      callback({ address: "", cep });
    }
  };

  return { handleCepChange, loading };
}

