
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import SearchHero from '@/components/SearchHero';
import FilterSection from '@/components/FilterSection';
import WorkshopList from '@/components/WorkshopList';

const WorkshopSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      name: "Auto Center Premium",
      rating: 4.8,
      reviews: 156,
      distance: "2.3 km",
      address: "Rua das Flores, 123 - Centro, São Paulo",
      phone: "(11) 99999-9999",
      services: ["Revisão Geral", "Troca de Óleo", "Freios", "Suspensão"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$",
      specialties: ["BMW", "Mercedes", "Audi"],
      openHours: "Seg-Sex: 8h-18h",
      verified: true,
      responseTime: "Responde em 1h",
      description: "Oficina especializada em carros importados com mais de 20 anos de experiência."
    },
    {
      id: 2,
      name: "Mecânica do João",
      rating: 4.6,
      reviews: 89,
      distance: "3.1 km",
      address: "Av. Principal, 456 - Vila Nova, São Paulo",
      phone: "(11) 88888-8888",
      services: ["Motor", "Suspensão", "Elétrica", "Diagnóstico"],
      isOpen: false,
      image: "/placeholder.svg",
      price: "$",
      specialties: ["Toyota", "Honda", "Hyundai"],
      openHours: "Seg-Sáb: 7h-17h",
      verified: true,
      responseTime: "Responde em 30min",
      description: "Serviços automotivos populares com preços justos e qualidade garantida."
    },
    {
      id: 3,
      name: "Speed Car Service",
      rating: 4.9,
      reviews: 234,
      distance: "1.8 km",
      address: "Rua da Oficina, 789 - Jardim, São Paulo",
      phone: "(11) 77777-7777",
      services: ["Funilaria", "Pintura", "Ar Condicionado", "Vidros"],
      isOpen: true,
      image: "/placeholder.svg",
      price: "$$$",
      specialties: ["Ford", "Chevrolet", "Volkswagen"],
      openHours: "Seg-Sex: 8h-18h",
      verified: true,
      responseTime: "Responde em 2h",
      description: "Funilaria e pintura automotiva com tecnologia de ponta e acabamento premium."
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        <SearchHero 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          workshopCount={workshops.length}
        />

        <FilterSection 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          workshopCount={workshops.length}
        />

        <WorkshopList 
          workshops={workshops}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
