
import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import SearchHero from '@/components/workshop/SearchHero';
import FiltersBar from '@/components/workshop/FiltersBar';
import WorkshopGrid from '@/components/workshop/WorkshopGrid';

const WorkshopSearch = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceFilter, setPriceFilter] = useState('all');

  const services = [
    { value: 'all', label: 'Todos os serviços' },
    { value: 'revisao', label: 'Revisão Geral' },
    { value: 'oleo', label: 'Troca de Óleo' },
    { value: 'freios', label: 'Freios' },
    { value: 'suspensao', label: 'Suspensão' },
    { value: 'ar-condicionado', label: 'Ar Condicionado' },
    { value: 'eletrica', label: 'Elétrica' },
    { value: 'pneus', label: 'Pneus e Alinhamento' },
    { value: 'motor', label: 'Motor' },
    { value: 'funilaria', label: 'Funilaria e Pintura' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Mais próximas' },
    { value: 'rating', label: 'Melhor avaliadas' },
    { value: 'price', label: 'Menor preço' },
    { value: 'time', label: 'Mais rápidas' }
  ];

  const priceOptions = [
    { value: 'all', label: 'Qualquer preço' },
    { value: 'low', label: 'Até R$ 100' },
    { value: 'medium', label: 'R$ 100 - R$ 200' },
    { value: 'high', label: 'Acima de R$ 200' }
  ];

  const workshops = [
    {
      id: 1,
      name: 'Oficina do João',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 124,
      services: ['Revisão Geral', 'Freios', 'Motor'],
      price: 'R$ 80-150',
      waitTime: '30 min',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - Centro',
      image: '/placeholder.svg',
      isOpen: true,
      specialties: ['Carros Nacionais', 'Revisão Completa'],
      verified: true,
      promoted: true
    },
    {
      id: 2,
      name: 'Auto Center Silva',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 89,
      services: ['Ar Condicionado', 'Elétrica', 'Suspensão'],
      price: 'R$ 100-200',
      waitTime: '45 min',
      phone: '(11) 88888-8888',
      address: 'Av. Principal, 456 - Vila Nova',
      image: '/placeholder.svg',
      isOpen: true,
      specialties: ['Ar Condicionado', 'Sistema Elétrico'],
      verified: true,
      promoted: false
    },
    {
      id: 3,
      name: 'Mecânica Express',
      distance: '2.1 km',
      rating: 4.9,
      reviews: 203,
      services: ['Troca de Óleo', 'Pneus', 'Alinhamento'],
      price: 'R$ 60-120',
      waitTime: '20 min',
      phone: '(11) 77777-7777',
      address: 'Rua Rápida, 789 - Jardim Feliz',
      image: '/placeholder.svg',
      isOpen: false,
      specialties: ['Serviço Rápido', 'Pneus'],
      verified: false,
      promoted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 md:pb-0">
        <SearchHero 
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          services={services}
        />

        <FiltersBar 
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOptions={sortOptions}
          priceOptions={priceOptions}
        />

        <WorkshopGrid workshops={workshops} />
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
