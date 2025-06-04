import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Car, 
  User,
  CheckCircle,
  AlertCircle,
  Wrench,
  Search,
  FileText
} from 'lucide-react';

interface Appointment {
  id: number;
  time: string;
  duration: string;
  client: string;
  phone: string;
  email: string;
  vehicle: string;
  plate: string;
  service: string;
  status: string;
  notes: string;
}

interface AppointmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateStatus: (appointmentId: number, newStatus: string, statusNotes: string) => void;
}

const statusOptions = [
  {
    value: 'in-progress',
    label: 'Em andamento',
    description: 'Serviço iniciado',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    value: 'analyzing',
    label: 'Analisando problema',
    description: 'Diagnóstico em execução',
    icon: Search,
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    value: 'waiting-parts',
    label: 'Aguardando peças',
    description: 'Esperando chegada de componentes',
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-800'
  },
  {
    value: 'almost-done',
    label: 'Quase concluído',
    description: 'Finalizando últimos detalhes',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800'
  }
];

const AppointmentStatusModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  onUpdateStatus 
}: AppointmentStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusNotes, setStatusNotes] = useState<string>('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (appointment && selectedStatus) {
      onUpdateStatus(appointment.id, selectedStatus, statusNotes);
      onClose();
      setSelectedStatus('');
      setStatusNotes('');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedStatus('');
    setStatusNotes('');
  };

  const handleCreateQuote = () => {
    navigate('/workshop/orcamentos/novo');
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Atualizar Status do Agendamento
          </DialogTitle>
          <DialogDescription>
            Selecione o status atual do serviço e adicione observações se necessário.
          </DialogDescription>
        </DialogHeader>

        {/* Informações do Agendamento */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{appointment.client}</h3>
              <p className="text-sm text-gray-600">{appointment.time} ({appointment.duration})</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span>{appointment.vehicle} - {appointment.plate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{appointment.phone}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <span className="font-medium text-blue-600">{appointment.service}</span>
          </div>
        </div>

        {/* Seleção de Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Selecione o status atual:</h4>
          <div className="grid grid-cols-1 gap-3">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedStatus === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <option.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <Badge className={option.color}>
                    {option.label}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-2">
          <label className="font-medium text-gray-900">
            Observações (opcional)
          </label>
          <Textarea
            placeholder="Adicione observações sobre o status atual do serviço..."
            value={statusNotes}
            onChange={(e) => setStatusNotes(e.target.value)}
            rows={3}
          />
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            variant="outline"
            onClick={handleCreateQuote}
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          >
            <FileText className="h-4 w-4 mr-1" />
            Fazer Orçamento
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!selectedStatus}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Atualizar Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentStatusModal;
