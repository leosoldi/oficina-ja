import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import SearchHero from '@/components/SearchHero';
import FilterSection from '@/components/FilterSection';
import WorkshopList from '@/components/WorkshopList';
import axios from 'axios';

const WorkshopSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const res = await axios.get('/api/proximas', {
              params: {
                lat,
                lng,
                servico: searchParams.get('service') || ''
              }
            });
            console.log("Dados recebidos:", res.data);

            setWorkshops(res.data);
            setLoading(false);
          },
          (error) => {
            console.error('Erro na geolocalização:', error);
            setGeoError('Não foi possível obter sua localização. Verifique as permissões do navegador.');
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Erro ao buscar oficinas:', error);
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [searchParams]);

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

        {loading ? (
          <div className="text-center mt-8 text-gray-600">Carregando oficinas próximas...</div>
        ) : geoError ? (
          <div className="text-center mt-8 text-red-500">{geoError}</div>
        ) : (
          <WorkshopList
            workshops={workshops}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default WorkshopSearch;
