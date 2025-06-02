
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const WorkshopForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário de oficina enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workshop-name">Nome da Oficina *</Label>
          <Input 
            id="workshop-name" 
            type="text" 
            placeholder="Ex: Oficina do João" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ *</Label>
          <Input 
            id="cnpj" 
            type="text" 
            placeholder="00.000.000/0000-00" 
            required 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="owner-name">Nome do Responsável *</Label>
          <Input 
            id="owner-name" 
            type="text" 
            placeholder="Nome completo" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="(11) 99999-9999" 
            required 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="contato@oficina.com" 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço Completo *</Label>
        <Input 
          id="address" 
          type="text" 
          placeholder="Rua, número, bairro, cidade, CEP" 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">Serviços Oferecidos *</Label>
        <Textarea 
          id="services" 
          placeholder="Descreva os principais serviços que sua oficina oferece..."
          className="min-h-[100px]"
          required 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="password">Senha *</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Mínimo 8 caracteres" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Senha *</Label>
          <Input 
            id="confirm-password" 
            type="password" 
            placeholder="Digite a senha novamente" 
            required 
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-800">
            <strong>Benefícios para Oficinas:</strong><br />
            • Receba pedidos de serviço diretamente pelo app<br />
            • Gerencie sua agenda de forma organizada<br />
            • Aumente sua visibilidade para novos clientes<br />
            • Sistema de avaliações para construir reputação
          </p>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 text-lg"
      >
        Cadastrar Oficina
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a href="#" className="text-blue-800 hover:underline font-medium">
          Fazer login
        </a>
      </p>
    </form>
  );
};

export default WorkshopForm;
