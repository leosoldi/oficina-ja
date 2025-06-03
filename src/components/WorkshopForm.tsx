
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building, FileText, User, Phone, Mail, MapPin, Lock, Wrench } from 'lucide-react';

interface WorkshopFormData {
  workshopName: string;
  cnpj: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  services: string;
  password: string;
  confirmPassword: string;
}

const WorkshopForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<WorkshopFormData>();
  const password = watch('password');

  const onSubmit = async (data: WorkshopFormData) => {
    try {
      console.log('Formulário de oficina enviado:', data);
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workshop-name" className="text-sm font-medium text-gray-700">
            Nome da Oficina *
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="workshop-name" 
              type="text" 
              placeholder="Ex: Oficina do João" 
              className={`pl-10 ${errors.workshopName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('workshopName', { required: 'Nome da oficina é obrigatório' })}
            />
          </div>
          {errors.workshopName && (
            <p className="text-sm text-red-600">{errors.workshopName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
            CNPJ *
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="cnpj" 
              type="text" 
              placeholder="00.000.000/0000-00" 
              className={`pl-10 ${errors.cnpj ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('cnpj', { required: 'CNPJ é obrigatório' })}
            />
          </div>
          {errors.cnpj && (
            <p className="text-sm text-red-600">{errors.cnpj.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="owner-name" className="text-sm font-medium text-gray-700">
            Nome do Responsável *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="owner-name" 
              type="text" 
              placeholder="Nome completo" 
              className={`pl-10 ${errors.ownerName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('ownerName', { required: 'Nome do responsável é obrigatório' })}
            />
          </div>
          {errors.ownerName && (
            <p className="text-sm text-red-600">{errors.ownerName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="phone" 
              type="tel" 
              placeholder="(11) 99999-9999" 
              className={`pl-10 ${errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('phone', { required: 'Telefone é obrigatório' })}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-mail *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="email" 
            type="email" 
            placeholder="contato@oficina.com" 
            className={`pl-10 ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            {...register('email', { 
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            })}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Endereço Completo *
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="address" 
            type="text" 
            placeholder="Rua, número, bairro, cidade, CEP" 
            className={`pl-10 ${errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            {...register('address', { required: 'Endereço é obrigatório' })}
          />
        </div>
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="services" className="text-sm font-medium text-gray-700">
          Serviços Oferecidos *
        </Label>
        <div className="relative">
          <Wrench className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Textarea 
            id="services" 
            placeholder="Descreva os principais serviços que sua oficina oferece..."
            className={`pl-10 pt-10 min-h-[100px] ${errors.services ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            {...register('services', { required: 'Descrição dos serviços é obrigatória' })}
          />
        </div>
        {errors.services && (
          <p className="text-sm text-red-600">{errors.services.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Senha *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="password" 
              type="password" 
              placeholder="Mínimo 8 caracteres" 
              className={`pl-10 ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('password', { 
                required: 'Senha é obrigatória',
                minLength: {
                  value: 8,
                  message: 'Senha deve ter pelo menos 8 caracteres'
                }
              })}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
            Confirmar Senha *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="Digite a senha novamente" 
              className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
              {...register('confirmPassword', { 
                required: 'Confirmação de senha é obrigatória',
                validate: (value) => value === password || 'As senhas não coincidem'
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
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
        disabled={isSubmitting}
        className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 text-lg font-medium transition-colors"
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Oficina'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a href="/login" className="text-blue-800 hover:text-blue-900 font-medium hover:underline transition-colors">
          Fazer login
        </a>
      </p>
    </form>
  );
};

export default WorkshopForm;
