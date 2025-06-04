
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentQuotes = () => {
  const recentQuotes = [
    { id: 1, client: 'Carlos Mendes', vehicle: 'Hyundai HB20', service: 'Motor', value: 'R$ 2.500,00', status: 'pending' },
    { id: 2, client: 'Lucia Rocha', vehicle: 'Chevrolet Onix', service: 'Transmissão', value: 'R$ 1.800,00', status: 'approved' },
    { id: 3, client: 'Roberto Alves', vehicle: 'Nissan March', service: 'Ar condicionado', value: 'R$ 650,00', status: 'sent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'sent': return 'Enviado';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Orçamentos Recentes</CardTitle>
          <Link to="/workshop/orcamentos/novo">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo orçamento
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuotes.map((quote) => (
            <div key={quote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{quote.client}</p>
                  <p className="text-sm text-gray-600">{quote.vehicle}</p>
                  <p className="text-sm font-medium text-orange-600">{quote.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{quote.value}</p>
                <Badge className={getStatusColor(quote.status)}>
                  {getStatusText(quote.status)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentQuotes;
