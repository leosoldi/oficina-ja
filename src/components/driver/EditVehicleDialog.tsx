
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';

interface EditVehicleDialogProps {
  vehicle: Vehicle;
  onSave: (updatedVehicle: Vehicle) => void;
}

const EditVehicleDialog: React.FC<EditVehicleDialogProps> = ({ vehicle, onSave }) => {
  const [editData, setEditData] = useState({
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year.toString(),
    plate: vehicle.plate,
    color: vehicle.color,
    mileage: vehicle.mileage.toString(),
    fuelType: vehicle.fuelType
  });

  const handleSave = () => {
    const updatedVehicle: Vehicle = {
      ...vehicle,
      brand: editData.brand,
      model: editData.model,
      year: parseInt(editData.year),
      plate: editData.plate,
      color: editData.color,
      mileage: parseInt(editData.mileage),
      fuelType: editData.fuelType as Vehicle['fuelType']
    };
    onSave(updatedVehicle);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <span>Editar Veículo</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={editData.brand}
                onChange={(e) => setEditData({...editData, brand: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={editData.model}
                onChange={(e) => setEditData({...editData, model: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                type="number"
                value={editData.year}
                onChange={(e) => setEditData({...editData, year: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="plate">Placa</Label>
              <Input
                id="plate"
                value={editData.plate}
                onChange={(e) => setEditData({...editData, plate: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Cor</Label>
              <Input
                id="color"
                value={editData.color}
                onChange={(e) => setEditData({...editData, color: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="mileage">Quilometragem</Label>
              <Input
                id="mileage"
                type="number"
                value={editData.mileage}
                onChange={(e) => setEditData({...editData, mileage: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fuelType">Tipo de Combustível</Label>
            <Select value={editData.fuelType} onValueChange={(value: Vehicle['fuelType']) => setEditData({...editData, fuelType: value})}>
              <SelectTrigger>
                <SelectValue />
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
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleDialog;
