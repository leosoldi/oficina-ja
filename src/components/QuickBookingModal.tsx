
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, Phone } from 'lucide-react';
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
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const { toast } = useToast();

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !customerName || !customerPhone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria a integração com a API de agendamento
    toast({
      title: "Agendamento realizado!",
      description: `Seu agendamento foi confirmado para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime}.`,
    });

    onClose();
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedService('');
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Agendamento Rápido - {workshop.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Seus dados
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Input
                placeholder="Seu nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Input
                placeholder="Seu telefone (WhatsApp)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Serviço */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Tipo de serviço</h3>
            <div className="grid grid-cols-2 gap-2">
              {workshop.services.slice(0, 6).map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    selectedService === service
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Escolha a data</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
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

          {/* Horário */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horário disponível
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    selectedTime === time
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
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
