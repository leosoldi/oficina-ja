
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
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { AppointmentStatusModalProps } from '@/types/appointment';
import AppointmentInfo from './AppointmentInfo';
import StatusSelection from './StatusSelection';

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

        <AppointmentInfo appointment={appointment} />

        <StatusSelection 
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

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
