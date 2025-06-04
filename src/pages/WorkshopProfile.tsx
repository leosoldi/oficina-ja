
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import QuickBookingModal from '@/components/QuickBookingModal';
import WorkshopHero from '@/components/workshop/WorkshopHero';
import WorkshopAbout from '@/components/workshop/WorkshopAbout';
import WorkshopServices from '@/components/workshop/WorkshopServices';
import WorkshopSpecialties from '@/components/workshop/WorkshopSpecialties';
import WorkshopReviews from '@/components/workshop/WorkshopReviews';
import WorkshopGallery from '@/components/workshop/WorkshopGallery';
import WorkshopSidebar from '@/components/workshop/WorkshopSidebar';

const WorkshopProfile = () => {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in a real app, this would come from an API based on the ID
  const workshop = {
    id: parseInt(id || '1'),
    name: "Auto Center Premium",
    rating: 4.8,
    reviews: 156,
    distance: "2.3 km",
    address: "Rua das Flores, 123 - Centro, São Paulo",
    services: ["Revisão Geral", "Troca de Óleo", "Freios", "Suspensão", "Ar Condicionado", "Elétrica"],
    isOpen: true,
    image: "/placeholder.svg",
    price: "$$",
    specialties: ["BMW", "Mercedes", "Audi"],
    openHours: "Seg-Sex: 8h-18h",
    verified: true,
    responseTime: "Responde em 1h",
    description: "Oficina especializada em carros importados com mais de 20 anos de experiência no mercado. Nossa equipe é altamente qualificada e utilizamos equipamentos de última geração para garantir o melhor serviço para seu veículo.",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    about: "Somos uma oficina com tradição no mercado automotivo, especializada em veículos importados. Contamos com mecânicos certificados e equipamentos modernos para diagnóstico e reparo. Nossa missão é oferecer serviços de qualidade com transparência e confiança.",
    workingDays: "Segunda a Sexta",
    workingHours: "08:00 às 18:00",
    saturday: "08:00 às 12:00",
    certifications: ["ISO 9001", "Bosch Car Service", "Certificação Técnica"],
    customerReviews: [
      {
        id: 1,
        name: "Carlos Silva",
        rating: 5,
        date: "15/11/2024",
        comment: "Excelente atendimento! Fizeram a revisão do meu BMW e ficou perfeito. Recomendo muito!",
        service: "Revisão Geral"
      },
      {
        id: 2,
        name: "Maria Santos",
        rating: 5,
        date: "10/11/2024",
        comment: "Profissionais muito competentes. Resolveram o problema do ar condicionado rapidamente.",
        service: "Ar Condicionado"
      },
      {
        id: 3,
        name: "João Oliveira",
        rating: 4,
        date: "08/11/2024",
        comment: "Bom serviço, preço justo. Única observação é que demorou um pouco mais que o previsto.",
        service: "Freios"
      },
      {
        id: 4,
        name: "Ana Costa",
        rating: 5,
        date: "05/11/2024",
        comment: "Oficina de confiança! Sempre levo meu Mercedes aqui. Nunca tive problemas.",
        service: "Troca de Óleo"
      },
      {
        id: 5,
        name: "Pedro Martins",
        rating: 4,
        date: "02/11/2024",
        comment: "Bom trabalho na suspensão. Ficou muito melhor do que estava antes.",
        service: "Suspensão"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        <WorkshopHero 
          workshop={workshop}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          onBookingClick={() => setIsBookingModalOpen(true)}
        />

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-8">
              <WorkshopAbout about={workshop.about} />
              <WorkshopServices services={workshop.services} />
              <WorkshopSpecialties specialties={workshop.specialties} />
              <WorkshopReviews 
                rating={workshop.rating}
                reviews={workshop.reviews}
                customerReviews={workshop.customerReviews}
              />
              <WorkshopGallery gallery={workshop.gallery} />
            </div>

            {/* Sidebar */}
            <WorkshopSidebar 
              address={workshop.address}
              distance={workshop.distance}
              workingDays={workshop.workingDays}
              workingHours={workshop.workingHours}
              saturday={workshop.saturday}
              certifications={workshop.certifications}
            />
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />

      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        workshop={workshop}
      />
    </div>
  );
};

export default WorkshopProfile;
