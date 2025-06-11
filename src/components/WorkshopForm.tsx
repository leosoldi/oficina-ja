
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building, Mail, Phone, MapPin, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const WorkshopForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<WorkshopFormData>();
  const password = watch('password');

  const onSubmit = async (data: WorkshopFormData) => {
    try {
      console.log('Cadastro da oficina:', data);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard-oficina');
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-blue-50/50 to-white shadow-lg backdrop-blur-sm">
      <CardContent className="pt-6 px-6 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nome da Oficina
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Nome da sua oficina"
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
                  placeholder="contato@oficina.com"
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
              <Label htmlFor="cnpj" className="text-sm font-semibold text-gray-700">
                CNPJ
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0001-00"
                  className={`pl-10 h-10 text-sm ${errors.cnpj ? 'border-red-500' : ''}`}
                  {...register('cnpj', { required: 'CNPJ é obrigatório' })}
                />
              </div>
              {errors.cnpj && <p className="text-sm text-red-600">{errors.cnpj.message}</p>}
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Descrição da Oficina
            </Label>
            <Textarea
              id="description"
              placeholder="Conte sobre sua oficina, especialidades e serviços..."
              className={`min-h-20 text-sm ${errors.description ? 'border-red-500' : ''}`}
              {...register('description', { required: 'Descrição é obrigatória' })}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
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
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Cadastrando...
              </div>
            ) : (
              'Cadastrar Oficina'
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Já tem conta?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                Faça login aqui
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkshopForm;
