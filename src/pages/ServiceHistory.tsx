
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Calendar, ChevronDown, ChevronUp, Download } from 'lucide-react';

const ServiceHistory = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('Todos');

  const serviceHistory = [
    {
      id: 1,
      workshopName: 'Auto Center Silva',
      service: 'Revisão Completa 40.000 km',
      date: '15/04/2024',
      mileage: '40.200 km',
      items: [
        { name: 'Troca de Óleo e Filtro', price: 'R$ 150,00' },
        { name: 'Filtro de Ar', price: 'R$ 60,00' },
        { name: 'Filtro de Combustível', price: 'R$ 80,00' },
        { name: 'Verificação de Freios', price: 'R$ 50,00' },
        { name: 'Verificação de Suspensão', price: 'R$ 70,00' },
      ],
      replacedParts: ['Filtro de Óleo', 'Filtro de Ar', 'Filtro de Combustível'],
      notes: 'Revisão realizada conforme manual do fabricante. Próxima revisão recomendada aos 50.000 km.',
      total: 'R$ 410,00'
    },
    {
      id: 2,
      workshopName: 'Mecânica do João',
      service: 'Troca de Pastilhas de Freio',
      date: '22/02/2024',
      mileage: '37.850 km',
      items: [
        { name: 'Pastilhas de Freio Dianteiras', price: 'R$ 180,00' },
        { name: 'Mão de Obra', price: 'R$ 100,00' },
      ],
      replacedParts: ['Pastilhas de Freio Dianteiras'],
      notes: 'Substituição das pastilhas de freio dianteiras devido ao desgaste.',
      total: 'R$ 280,00'
    },
    {
      id: 3,
      workshopName: 'Auto Center Silva',
      service: 'Revisão Completa 30.000 km',
      date: '10/11/2023',
      mileage: '30.500 km',
      items: [
        { name: 'Troca de Óleo e Filtro', price: 'R$ 150,00' },
        { name: 'Filtro de Ar', price: 'R$ 60,00' },
        { name: 'Verificação de Sistema Elétrico', price: 'R$ 80,00' },
        { name: 'Verificação de Freios', price: 'R$ 50,00' },
      ],
      replacedParts: ['Filtro de Óleo', 'Filtro de Ar'],
      notes: 'Revisão realizada conforme manual do fabricante.',
      total: 'R$ 340,00'
    }
  ];

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const filterByYear = (year: string) => {
    setFilterYear(year);
  };

  const years = ['Todos', '2024', '2023', '2022'];

  const filteredHistory = serviceHistory.filter(service => {
    const matchesSearch = service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.workshopName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = filterYear === 'Todos' || service.date.includes(filterYear);
    
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50 mobile-scroll">
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Histórico de Serviços
            </h1>
            <p className="text-gray-600">Honda Civic 2020 • ABC-1234</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por serviço ou oficina"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-1">Filtrar por ano:</span>
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={filterYear === year ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterByYear(year)}
                    className={filterYear === year ? 'bg-blue-600' : ''}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service History */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((service) => {
                const isExpanded = expandedId === service.id;

                return (
                  <Card key={service.id}>
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExpand(service.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.service}</h3>
                          <p className="text-sm text-gray-600">{service.workshopName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {service.date}
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <CardContent className="border-t">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="font-medium">Quilometragem:</span>
                              <span className="ml-1">{service.mileage}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Itens do Serviço</h4>
                            <div className="space-y-2 mb-3">
                              {service.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span>{item.name}</span>
                                  <span>{item.price}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between pt-2 border-t font-medium">
                              <span>Total</span>
                              <span className="text-blue-700">{service.total}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Peças Substituídas</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.replacedParts.map((part, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {part}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Observações</h4>
                            <p className="text-sm text-gray-700">{service.notes}</p>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" className="flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Baixar Comprovante
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-lg border">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço encontrado</h3>
              <p className="text-gray-600">
                Ajuste os filtros ou faça uma nova busca para encontrar o serviço desejado.
              </p>
            </div>
          )}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default ServiceHistory;
