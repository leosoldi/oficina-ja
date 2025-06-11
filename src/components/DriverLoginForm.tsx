
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DriverLoginFormData {
  email: string;
  password: string;
}

const DriverLoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DriverLoginFormData>();

  const onSubmit = async (data: DriverLoginFormData) => {
    try {
      console.log('Login do motorista:', data);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard-motorista');
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-orange-50/50 to-white shadow-lg backdrop-blur-sm">
      <CardContent className="pt-6 px-6 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </Label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`pl-10 h-10 text-sm bg-white/80 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
              </div>
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center mt-1 animate-fade-in">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Senha
            </Label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className={`pl-10 h-10 text-sm bg-white/80 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Senha deve ter pelo menos 6 caracteres'
                    }
                  })}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center mt-1 animate-fade-in">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-4 pt-2">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar como Motorista'
              )}
            </Button>
            
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-gray-600 hover:text-orange-600 hover:underline transition-colors font-medium">
                Esqueceu sua senha?
              </a>
            </div>
            
            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                Não tem conta?{' '}
                <a href="/cadastro" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors">
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
