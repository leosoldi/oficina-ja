
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import WorkshopHero from '@/components/workshop/WorkshopHero';
import WorkshopServices from '@/components/workshop/WorkshopServices';
import WorkshopGallery from '@/components/workshop/WorkshopGallery';
import WorkshopReviews from '@/components/workshop/WorkshopReviews';
import WorkshopInfo from '@/components/workshop/WorkshopInfo';

const WorkshopProfile = () => {
  const { id } = useParams();
  
  // Mock data - in a real app this would come from an API
  const workshop = {
    id: parseInt(id || '1'),
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
    promoted: true,
    description: 'Oficina especializada em carros nacionais com mais de 20 anos de experiência. Oferecemos serviços completos de manutenção automotiva com garantia e preços justos.',
    workingHours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado'
    },
    gallery: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 md:pb-0">
        <WorkshopHero workshop={workshop} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <WorkshopServices workshop={workshop} />
              <WorkshopGallery gallery={workshop.gallery} />
              <WorkshopReviews workshopId={workshop.id} rating={workshop.rating} totalReviews={workshop.reviews} />
            </div>
            
            <div className="lg:col-span-1">
              <WorkshopInfo workshop={workshop} />
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default WorkshopProfile;
