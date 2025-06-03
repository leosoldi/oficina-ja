
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';

interface DriverLoginFormData {
  email: string;
  password: string;
}

const DriverLoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DriverLoginFormData>();

  const onSubmit = async (data: DriverLoginFormData) => {
    try {
      console.log('Login do motorista:', data);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Card className="border-orange-200 shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={`pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className={`pl-10 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-4 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 text-base transition-colors"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar como Motorista'}
            </Button>
            
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-gray-600 hover:text-orange-600 hover:underline transition-colors">
                Esqueceu sua senha?
              </a>
            </div>
            
            <div className="text-center border-t pt-4">
              <p className="text-sm text-gray-600">
                Não tem conta?{' '}
                <a href="/cadastro" className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors">
                  Cadastre-se aqui
                </a>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverLoginForm;
