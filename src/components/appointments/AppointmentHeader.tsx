import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewBlockModal from './NewBlockModal';
import { Appointment } from '@/types/appointment';
import OpeningRulesModal from '@/components/appointments/OpeningRulesModal';
import { useAuth } from '@/contexts/AuthContext';

interface AppointmentHeaderProps {
  onCreateAppointment?: (appointment: Omit<Appointment, 'id'>) => void;
  /** Pai passa esse callback para recarregar disponibilidade após salvar regras */
  onRulesSaved?: () => void;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  onCreateAppointment,
  onRulesSaved,
}) => {
  const { user } = useAuth();
  const oficinaId = user?.id ?? ''; // previne undefined

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/dashboard-oficina" className="text-gray-600 hover:text-blue-800 p-2">
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-blue-800">Oficina</span>
              <span className="text-orange-500">Já</span>
            </h1>
            <div className="hidden md:block h-6 w-px bg-gray-300" />
            <h2 className="hidden md:block text-lg font-semibold text-gray-700">Agendamentos</h2>
          </div>

          <div className="flex items-center gap-2">
            {onCreateAppointment && <NewBlockModal onCreateAppointment={onCreateAppointment} />}

            {oficinaId && (
              <OpeningRulesModal
                oficinaId={oficinaId}
                onSaved={onRulesSaved} // <<< sem stub aqui
                triggerLabel="Definir horários"
                triggerClassName="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentHeader;
