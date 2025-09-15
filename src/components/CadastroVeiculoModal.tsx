// components/CadastroVeiculoModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CadastroVeiculoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const CadastroVeiculoModal = ({ open, onClose, onSave }: CadastroVeiculoModalProps) => {
  const [form, setForm] = useState({
    modelo: "",
    placa: "",
    cor: "",
    ano: "",
    quilometragem: "",
    dataUltimoServico: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Veículo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="modelo" placeholder="Modelo (ex: Toyota Corolla)" onChange={handleChange} />
          <Input name="placa" placeholder="Placa (ex: ABC-1234)" onChange={handleChange} />
          <Input name="cor" placeholder="Cor (ex: Prata)" onChange={handleChange} />
          <Input name="ano" placeholder="Ano (ex: 2020)" type="number" onChange={handleChange} />
          <Input name="km" placeholder="Quilometragem" type="number" onChange={handleChange} />
          <Input
  name="dataUltimoServico"
  type="date"
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]} // impede datas futuras ou inválidas
/>

          <Button onClick={handleSubmit}>Cadastrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
