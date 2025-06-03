
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface WorkshopLoginFormData {
  email: string;
  password: string;
}

const WorkshopLoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WorkshopLoginFormData>();

  const onSubmit = async (data: WorkshopLoginFormData) => {
    try {
      console.log('Login da oficina:', data);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email da Oficina</Label>
            <Input
              id="email"
              type="email"
              placeholder="contato@oficina.com"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres'
                }
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <div className="text-center">
              <a href="/cadastro" className="text-sm text-blue-600 hover:underline">
                Não tem conta? Cadastre-se aqui
              </a>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkshopLoginForm;
