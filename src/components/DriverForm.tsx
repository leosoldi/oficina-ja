
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, FileText, Phone, Calendar, Mail, MapPin, Car, Lock } from 'lucide-react';

interface DriverFormData {
  driverName: string;
  cpf: string;
  driverPhone: string;
  birthDate: string;
  driverEmail: string;
  driverAddress: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  licensePlate: string;
  driverPassword: string;
  driverConfirmPassword: string;
}

const DriverForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<DriverFormData>();
  const password = watch('driverPassword');

  const onSubmit = async (data: DriverFormData) => {
    try {
      console.log('Formulário de motorista enviado:', data);
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-name" className="text-sm font-medium text-gray-700">
            Nome Completo *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="driver-name" 
              type="text" 
              placeholder="Seu nome completo" 
              className={`pl-10 ${errors.driverName ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('driverName', { required: 'Nome completo é obrigatório' })}
            />
          </div>
          {errors.driverName && (
            <p className="text-sm text-red-600">{errors.driverName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
            CPF *
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="cpf" 
              type="text" 
              placeholder="000.000.000-00" 
              className={`pl-10 ${errors.cpf ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('cpf', { required: 'CPF é obrigatório' })}
            />
          </div>
          {errors.cpf && (
            <p className="text-sm text-red-600">{errors.cpf.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-phone" className="text-sm font-medium text-gray-700">
            Telefone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="driver-phone" 
              type="tel" 
              placeholder="(11) 99999-9999" 
              className={`pl-10 ${errors.driverPhone ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('driverPhone', { required: 'Telefone é obrigatório' })}
            />
          </div>
          {errors.driverPhone && (
            <p className="text-sm text-red-600">{errors.driverPhone.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-sm font-medium text-gray-700">
            Data de Nascimento *
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="birth-date" 
              type="date" 
              className={`pl-10 ${errors.birthDate ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('birthDate', { required: 'Data de nascimento é obrigatória' })}
            />
          </div>
          {errors.birthDate && (
            <p className="text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="driver-email" className="text-sm font-medium text-gray-700">
          E-mail *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="driver-email" 
            type="email" 
            placeholder="seuemail@exemplo.com" 
            className={`pl-10 ${errors.driverEmail ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
            {...register('driverEmail', { 
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            })}
          />
        </div>
        {errors.driverEmail && (
          <p className="text-sm text-red-600">{errors.driverEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="driver-address" className="text-sm font-medium text-gray-700">
          Endereço *
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="driver-address" 
            type="text" 
            placeholder="Rua, número, bairro, cidade, CEP" 
            className={`pl-10 ${errors.driverAddress ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
            {...register('driverAddress', { required: 'Endereço é obrigatório' })}
          />
        </div>
        {errors.driverAddress && (
          <p className="text-sm text-red-600">{errors.driverAddress.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-brand" className="text-sm font-medium text-gray-700">
            Marca do Veículo *
          </Label>
          <div className="relative">
            <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="vehicle-brand" 
              type="text" 
              placeholder="Ex: Volkswagen, Ford, Chevrolet" 
              className={`pl-10 ${errors.vehicleBrand ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('vehicleBrand', { required: 'Marca do veículo é obrigatória' })}
            />
          </div>
          {errors.vehicleBrand && (
            <p className="text-sm text-red-600">{errors.vehicleBrand.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-model" className="text-sm font-medium text-gray-700">
            Modelo do Veículo *
          </Label>
          <div className="relative">
            <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="vehicle-model" 
              type="text" 
              placeholder="Ex: Gol, Ka, Onix" 
              className={`pl-10 ${errors.vehicleModel ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('vehicleModel', { required: 'Modelo do veículo é obrigatório' })}
            />
          </div>
          {errors.vehicleModel && (
            <p className="text-sm text-red-600">{errors.vehicleModel.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-year" className="text-sm font-medium text-gray-700">
            Ano do Veículo *
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="vehicle-year" 
              type="number" 
              placeholder="Ex: 2020" 
              min="1900"
              max="2025"
              className={`pl-10 ${errors.vehicleYear ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('vehicleYear', { 
                required: 'Ano do veículo é obrigatório',
                min: { value: 1900, message: 'Ano inválido' },
                max: { value: 2025, message: 'Ano inválido' }
              })}
            />
          </div>
          {errors.vehicleYear && (
            <p className="text-sm text-red-600">{errors.vehicleYear.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license-plate" className="text-sm font-medium text-gray-700">
            Placa do Veículo
          </Label>
          <div className="relative">
            <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="license-plate" 
              type="text" 
              placeholder="ABC-1234" 
              className="pl-10 border-gray-300 focus:border-orange-500"
              {...register('licensePlate')}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="driver-password" className="text-sm font-medium text-gray-700">
            Senha *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="driver-password" 
              type="password" 
              placeholder="Mínimo 8 caracteres" 
              className={`pl-10 ${errors.driverPassword ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('driverPassword', { 
                required: 'Senha é obrigatória',
                minLength: {
                  value: 8,
                  message: 'Senha deve ter pelo menos 8 caracteres'
                }
              })}
            />
          </div>
          {errors.driverPassword && (
            <p className="text-sm text-red-600">{errors.driverPassword.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="driver-confirm-password" className="text-sm font-medium text-gray-700">
            Confirmar Senha *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="driver-confirm-password" 
              type="password" 
              placeholder="Digite a senha novamente" 
              className={`pl-10 ${errors.driverConfirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              {...register('driverConfirmPassword', { 
                required: 'Confirmação de senha é obrigatória',
                validate: (value) => value === password || 'As senhas não coincidem'
              })}
            />
          </div>
          {errors.driverConfirmPassword && (
            <p className="text-sm text-red-600">{errors.driverConfirmPassword.message}</p>
          )}
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
        disabled={isSubmitting}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium transition-colors"
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Motorista'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors">
          Fazer login
        </a>
      </p>
    </form>
  );
};

export default DriverForm;
