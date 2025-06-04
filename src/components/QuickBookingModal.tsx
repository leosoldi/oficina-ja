
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Phone, Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Workshop {
  id: number;
  name: string;
  services: string[];
}

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop;
}

const QuickBookingModal = ({ isOpen, onClose, workshop }: QuickBookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const { toast } = useToast();

  const periods = [
    { id: 'morning', label: 'Manhã', description: '08:00 - 12:00', icon: Sun },
    { id: 'afternoon', label: 'Tarde', description: '13:00 - 17:00', icon: Moon },
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedPeriod || !selectedService || !customerName || !customerPhone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const periodLabel = periods.find(p => p.id === selectedPeriod)?.label;
    
    toast({
      title: "Agendamento realizado!",
      description: `Seu agendamento foi confirmado para ${format(selectedDate, 'dd/MM/yyyy')} no período da ${periodLabel?.toLowerCase()}.`,
    });

    onClose();
    // Reset form
    setSelectedDate(undefined);
    setSelectedPeriod('');
    setSelectedService('');
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            Agendamento Rápido
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">{workshop.name}</p>
        </DialogHeader>

        <div className="space-y-8 py-2">
          {/* Dados do Cliente */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Seus dados</h3>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Seu nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500"
              />
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Seu telefone (WhatsApp)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="h-12 pl-10 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Serviço */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">Tipo de serviço</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workshop.services.slice(0, 6).map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 text-sm rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedService === service
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">Escolha a data</h3>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-2 border-gray-200 hover:border-gray-300",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Período */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">4</span>
              </div>
              <h3 className="font-semibold text-gray-900">Período disponível</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {periods.map((period) => {
                const IconComponent = period.icon;
                return (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPeriod === period.id
                        ? 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{period.label}</div>
                        <div className="text-sm opacity-75">{period.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-2 border-gray-200 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickBookingModal;
