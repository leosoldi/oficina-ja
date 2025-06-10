
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DriverLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard do motorista...",
        });
        navigate('/dashboard-motorista');
      } else {
        toast({
          title: "Erro no login",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="driver-email">E-mail</Label>
          <Input
            id="driver-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="driver-password">Senha</Label>
          <Input
            id="driver-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar como Motorista'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/cadastro" className="text-orange-600 hover:underline">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </form>
  );
};

export default DriverLoginForm;
