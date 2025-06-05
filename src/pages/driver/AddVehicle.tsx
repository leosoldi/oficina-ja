
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Car, Plus, Save, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DriverHeader from '@/components/DriverHeader';
import { Vehicle } from '@/types/vehicle';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    plate: '',
    color: '',
    mileage: '',
    fuelType: '',
    documents: {
      registration: false,
      insurance: false,
      inspection: false
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = 'Marca é obrigatória';
    if (!formData.model.trim()) newErrors.model = 'Modelo é obrigatório';
    if (!formData.year || parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear() + 1) {
      newErrors.year = 'Ano inválido';
    }
    if (!formData.plate.trim()) newErrors.plate = 'Placa é obrigatória';
    if (!formData.color.trim()) newErrors.color = 'Cor é obrigatória';
    if (!formData.mileage || parseInt(formData.mileage) < 0) {
      newErrors.mileage = 'Quilometragem inválida';
    }
    if (!formData.fuelType) newErrors.fuelType = 'Tipo de combustível é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Here you would normally save to your backend/database
    console.log('Saving vehicle:', formData);
    
    // Navigate back to vehicles page
    navigate('/driver/veiculos');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDocumentChange = (document: keyof Vehicle['documents'], checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [document]: checked
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <DriverHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/driver/veiculos" className="text-gray-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Adicionar Novo Veículo 🚗
              </h1>
              <p className="text-gray-600 mt-1">Cadastre um novo veículo em sua conta</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-blue-600" />
              <span>Informações do Veículo</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="brand">Marca *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    placeholder="Ex: Honda, Toyota, Volkswagen"
                    className={errors.brand ? 'border-red-500' : ''}
                  />
                  {errors.brand && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.brand}</span>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Ex: Civic, Corolla, Gol"
                    className={errors.model ? 'border-red-500' : ''}
                  />
                  {errors.model && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.model}</span>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="year">Ano *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="Ex: 2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={errors.year ? 'border-red-500' : ''}
                  />
                  {errors.year && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.year}</span>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="plate">Placa *</Label>
                  <Input
                    id="plate"
                    value={formData.plate}
                    onChange={(e) => handleInputChange('plate', e.target.value.toUpperCase())}
                    placeholder="Ex: ABC-1234"
                    className={errors.plate ? 'border-red-500' : ''}
                  />
                  {errors.plate && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.plate}</span>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="color">Cor *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Ex: Branco, Prata, Azul"
                    className={errors.color ? 'border-red-500' : ''}
                  />
                  {errors.color && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.color}</span>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mileage">Quilometragem Atual *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                    placeholder="Ex: 45000"
                    min="0"
                    className={errors.mileage ? 'border-red-500' : ''}
                  />
                  {errors.mileage && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.mileage}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <Label htmlFor="fuelType">Tipo de Combustível *</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                  <SelectTrigger className={errors.fuelType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o tipo de combustível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasolina</SelectItem>
                    <SelectItem value="ethanol">Etanol</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Elétrico</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fuelType && (
                  <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.fuelType}</span>
                  </p>
                )}
              </div>

              {/* Documents */}
              <div>
                <Label className="text-base font-medium">Documentos (opcionais)</Label>
                <p className="text-sm text-gray-600 mb-4">Marque os documentos que você possui em dia</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="registration"
                      checked={formData.documents.registration}
                      onCheckedChange={(checked) => handleDocumentChange('registration', !!checked)}
                    />
                    <Label htmlFor="registration" className="text-sm">
                      CRLV (Certificado de Registro)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="insurance"
                      checked={formData.documents.insurance}
                      onCheckedChange={(checked) => handleDocumentChange('insurance', !!checked)}
                    />
                    <Label htmlFor="insurance" className="text-sm">
                      Seguro do Veículo
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inspection"
                      checked={formData.documents.inspection}
                      onCheckedChange={(checked) => handleDocumentChange('inspection', !!checked)}
                    />
                    <Label htmlFor="inspection" className="text-sm">
                      Vistoria em Dia
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Cadastrar Veículo
                </Button>
                
                <Link to="/driver/veiculos" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddVehicle;
