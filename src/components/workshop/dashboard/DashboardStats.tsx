
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, DollarSign, Star, TrendingUp, Users } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Agendamentos Hoje',
      value: '8',
      icon: CalendarDays,
      change: '+2 desde ontem',
      color: 'text-blue-600'
    },
    {
      title: 'Tempo Médio de Serviço',
      value: '2.5h',
      icon: Clock,
      change: '-15min desde a semana passada',
      color: 'text-green-600'
    },
    {
      title: 'Receita do Mês',
      value: 'R$ 12.450',
      icon: DollarSign,
      change: '+12% em relação ao mês passado',
      color: 'text-emerald-600'
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      icon: Star,
      change: '124 avaliações',
      color: 'text-yellow-600'
    }
  ];

  const recentActivities = [
    { time: '10:30', action: 'Agendamento confirmado', client: 'Carlos Silva', service: 'Revisão Geral' },
    { time: '09:15', action: 'Serviço concluído', client: 'Maria Santos', service: 'Troca de Óleo' },
    { time: '08:45', action: 'Nova avaliação', client: 'João Oliveira', rating: 5 },
    { time: '08:00', action: 'Oficina aberta', client: '-', service: '-' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.client !== '-' ? `Cliente: ${activity.client}` : ''}
                      {activity.service !== '-' ? ` - ${activity.service}` : ''}
                      {activity.rating ? ` - ${activity.rating} estrelas` : ''}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-gray-900">Ana Costa</p>
                  <p className="text-sm text-gray-600">Freios - R$ 180</p>
                </div>
                <span className="text-sm font-medium text-blue-600">11:00</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium text-gray-900">Pedro Lima</p>
                  <p className="text-sm text-gray-600">Motor - R$ 350</p>
                </div>
                <span className="text-sm font-medium text-blue-600">14:30</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Lucia Ferreira</p>
                  <p className="text-sm text-gray-600">Revisão Geral - R$ 150</p>
                </div>
                <span className="text-sm font-medium text-blue-600">16:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
