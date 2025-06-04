
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

const WorkshopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - em um app real, viria de uma API
  const workshopData = {
    name: "Auto Center Premium",
    stats: {
      totalBookings: 45,
      pendingBookings: 8,
      completedToday: 12,
      rating: 4.8,
      reviewsCount: 156
    },
    recentBookings: [
      {
        id: 1,
        customer: "Carlos Silva",
        service: "Revisão Geral",
        time: "09:00",
        status: "confirmed",
        vehicle: "BMW X3 2020"
      },
      {
        id: 2,
        customer: "Maria Santos",
        service: "Troca de Óleo",
        time: "10:30",
        status: "in-progress",
        vehicle: "Mercedes C180 2019"
      },
      {
        id: 3,
        customer: "João Oliveira",
        service: "Freios",
        time: "14:00",
        status: "pending",
        vehicle: "Audi A4 2021"
      },
      {
        id: 4,
        customer: "Ana Costa",
        service: "Ar Condicionado",
        time: "15:30",
        status: "confirmed",
        vehicle: "Toyota Corolla 2022"
      }
    ],
    recentReviews: [
      {
        id: 1,
        customer: "Pedro Martins",
        rating: 5,
        comment: "Excelente atendimento! Muito profissionais.",
        date: "Hoje",
        service: "Suspensão"
      },
      {
        id: 2,
        customer: "Lucia Ferreira",
        rating: 4,
        comment: "Bom trabalho, preço justo. Recomendo!",
        date: "Ontem",
        service: "Troca de Óleo"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'in-progress': return 'Em Andamento';
      case 'pending': return 'Pendente';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        {/* Header da Dashboard */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Bem-vindo, {workshopData.name}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Gerencie seus agendamentos e acompanhe seu desempenho
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Perfil Público
                </Button>
                <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">{workshopData.stats.totalBookings}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendentes</p>
                    <p className="text-2xl font-bold text-orange-600">{workshopData.stats.pendingBookings}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Concluídos Hoje</p>
                    <p className="text-2xl font-bold text-green-600">{workshopData.stats.completedToday}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avaliação</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-yellow-600">{workshopData.stats.rating}</p>
                      <Star className="h-5 w-5 text-yellow-400 ml-1 fill-current" />
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agendamentos Recentes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Agendamentos de Hoje</CardTitle>
                  <Button size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workshopData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{booking.customer}</h4>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{booking.service}</p>
                        <p className="text-xs text-gray-500">{booking.vehicle} • {booking.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos os Agendamentos
                </Button>
              </CardContent>
            </Card>

            {/* Avaliações Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Avaliações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workshopData.recentReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">"{review.comment}"</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{review.service}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todas as Avaliações
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-6 w-6 mb-1" />
                  Novo Agendamento
                </Button>
                <Button className="h-16 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700">
                  <Users className="h-6 w-6 mb-1" />
                  Gerenciar Clientes
                </Button>
                <Button className="h-16 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700">
                  <TrendingUp className="h-6 w-6 mb-1" />
                  Relatórios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopDashboard;
