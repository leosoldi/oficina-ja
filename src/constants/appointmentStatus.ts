
import {
  Wrench,
  Search,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const statusOptions = [
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
