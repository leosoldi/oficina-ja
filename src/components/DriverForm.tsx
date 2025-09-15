
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Lock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SocialLoginButton } from '@/components/GoogleButton'

interface DriverFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
}

const DriverForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<DriverFormData>();
  const password = watch('password');

  const onSubmit = async (data: DriverFormData) => {
    try {
      console.log('Cadastro do motorista:', data);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard-motorista');
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-orange-50/50 to-white shadow-lg backdrop-blur-sm">
      <CardContent className="pt-6 px-6 pb-6">
        <div>
          <SocialLoginButton userType="motorista" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nome Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  className={`pl-10 h-10 text-sm ${errors.name ? 'border-red-500' : ''}`}
                  {...register('name', { required: 'Nome é obrigatório' })}
                />
              </div>
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`pl-10 h-10 text-sm ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Telefone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  className={`pl-10 h-10 text-sm ${errors.phone ? 'border-red-500' : ''}`}
                  {...register('phone', { required: 'Telefone é obrigatório' })}
                />
              </div>
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-semibold text-gray-700">
                CPF
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  className={`pl-10 h-10 text-sm ${errors.cpf ? 'border-red-500' : ''}`}
                  {...register('cpf', { required: 'CPF é obrigatório' })}
                />
              </div>
              {errors.cpf && <p className="text-sm text-red-600">{errors.cpf.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-semibold text-gray-700">
                Data de Nascimento
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="birthDate"
                  type="date"
                  className={`pl-10 h-10 text-sm ${errors.birthDate ? 'border-red-500' : ''}`}
                  {...register('birthDate', { required: 'Data de nascimento é obrigatória' })}
                />
              </div>
              {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                Endereço
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  placeholder="Rua, número, bairro"
                  className={`pl-10 h-10 text-sm ${errors.address ? 'border-red-500' : ''}`}
                  {...register('address', { required: 'Endereço é obrigatório' })}
                />
              </div>
              {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                Cidade
              </Label>
              <Input
                id="city"
                placeholder="São Paulo"
                className={`h-10 text-sm ${errors.city ? 'border-red-500' : ''}`}
                {...register('city', { required: 'Cidade é obrigatória' })}
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                Estado
              </Label>
              <Input
                id="state"
                placeholder="SP"
                className={`h-10 text-sm ${errors.state ? 'border-red-500' : ''}`}
                {...register('state', { required: 'Estado é obrigatório' })}
              />
              {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-semibold text-gray-700">
                CEP
              </Label>
              <Input
                id="zipCode"
                placeholder="00000-000"
                className={`h-10 text-sm ${errors.zipCode ? 'border-red-500' : ''}`}
                {...register('zipCode', { required: 'CEP é obrigatório' })}
              />
              {errors.zipCode && <p className="text-sm text-red-600">{errors.zipCode.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className={`pl-10 h-10 text-sm ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                  })}
                />
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirmar Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  className={`pl-10 h-10 text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  {...register('confirmPassword', {
                    required: 'Confirmação é obrigatória',
                    validate: value => value === password || 'Senhas não coincidem'
                  })}
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Cadastrando...
              </div>
            ) : (
              'Cadastrar como Motorista'
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Já tem conta?{' '}
              <a href="/login" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors">
                Faça login aqui
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverForm;
