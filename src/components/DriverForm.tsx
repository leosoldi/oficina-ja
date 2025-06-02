
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const DriverForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário de motorista enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-name">Nome Completo *</Label>
          <Input 
            id="driver-name" 
            type="text" 
            placeholder="Seu nome completo" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input 
            id="cpf" 
            type="text" 
            placeholder="000.000.000-00" 
            required 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-phone">Telefone *</Label>
          <Input 
            id="driver-phone" 
            type="tel" 
            placeholder="(11) 99999-9999" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-date">Data de Nascimento *</Label>
          <Input 
            id="birth-date" 
            type="date" 
            required 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="driver-email">E-mail *</Label>
        <Input 
          id="driver-email" 
          type="email" 
          placeholder="seuemail@exemplo.com" 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="driver-address">Endereço *</Label>
        <Input 
          id="driver-address" 
          type="text" 
          placeholder="Rua, número, bairro, cidade, CEP" 
          required 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-brand">Marca do Veículo *</Label>
          <Input 
            id="vehicle-brand" 
            type="text" 
            placeholder="Ex: Volkswagen, Ford, Chevrolet" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-model">Modelo do Veículo *</Label>
          <Input 
            id="vehicle-model" 
            type="text" 
            placeholder="Ex: Gol, Ka, Onix" 
            required 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-year">Ano do Veículo *</Label>
          <Input 
            id="vehicle-year" 
            type="number" 
            placeholder="Ex: 2020" 
            min="1900"
            max="2025"
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license-plate">Placa do Veículo</Label>
          <Input 
            id="license-plate" 
            type="text" 
            placeholder="ABC-1234" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-password">Senha *</Label>
          <Input 
            id="driver-password" 
            type="password" 
            placeholder="Mínimo 8 caracteres" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="driver-confirm-password">Confirmar Senha *</Label>
          <Input 
            id="driver-confirm-password" 
            type="password" 
            placeholder="Digite a senha novamente" 
            required 
          />
        </div>
      </div>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <p className="text-sm text-orange-800">
            <strong>Benefícios para Motoristas:</strong><br />
            • Encontre oficinas próximas e confiáveis<br />
            • Compare preços e serviços facilmente<br />
            • Agende serviços com poucos cliques<br />
            • Avalie e seja avaliado por outros usuários
          </p>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
      >
        Cadastrar Motorista
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a href="#" className="text-orange-500 hover:underline font-medium">
          Fazer login
        </a>
      </p>
    </form>
  );
};

export default DriverForm;
