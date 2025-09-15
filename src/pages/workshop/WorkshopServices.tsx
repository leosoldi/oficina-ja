// === WorkshopServices.tsx ===
import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceModal from "@/components/services/ServiceModal";
import { servicoService } from "@/services/Servico";
import { useAuth } from "@/contexts/AuthContext";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
}

const WorkshopServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await servicoService.listar(user.id);
        const normalized = Array.isArray(response)
  ? response.map((item: any) => ({
      id: item.id,
      name: item.nome,
      description: item.descricao,
      price: item.preco,
      duration: item.duracao,
      category: item.categoria,
      active: item.ativo,
    }))
  : [];

        setServices(normalized);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchServicos();
  }, [user]);

  const categories = [
    "all",
    "Manutenção",
    "Revisão",
    "Pneus",
    "Freios",
    "Motor",
    "Elétrica",
  ];

  const handleCreateService = async (serviceData: Omit<Service, "id">) => {
    try {
      const novo = await servicoService.criar({
        nome: serviceData.name,
        descricao: serviceData.description,
        preco: serviceData.price,
        duracao: serviceData.duration,
        categoria: serviceData.category,
        ativo: serviceData.active ?? true,
        oficinaId: user.id,
      });

      const novoNormalizado: Service = {
        id: novo.id,
        name: novo.nome,
        description: novo.descricao,
        price: novo.preco,
        duration: novo.duracao,
        category: novo.categoria,
        active: novo.ativo,
      };

      setServices((prev) => [...prev, novoNormalizado]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar serviço", err);
    }
  };

  const handleUpdateService = async (serviceData: Omit<Service, "id">) => {
    if (!editingService) return;
    try {
      const atualizado = await servicoService.atualizar(editingService.id, {
        nome: serviceData.name,
        descricao: serviceData.description,
        preco: serviceData.price,
        duracao: serviceData.duration,
        categoria: serviceData.category,
        ativo: serviceData.active,
        oficinaId: user.id,
      });

      const atualizadoNormalizado: Service = {
        id: atualizado.id,
        name: atualizado.nome,
        description: atualizado.descricao,
        price: atualizado.preco,
        duration: atualizado.duracao,
        category: atualizado.categoria,
        active: atualizado.ativo,
      };

      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? atualizadoNormalizado : s))
      );
      setEditingService(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao atualizar serviço", err);
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    try {
      await servicoService.deletar(serviceId);
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
    } catch (err) {
      console.error("Erro ao deletar serviço", err);
    }
  };

  const handleToggleActive = async (serviceId: number) => {
    const target = services.find((s) => s.id === serviceId);
    if (!target) return;

    try {
      const atualizado = await servicoService.atualizar(serviceId, {
        nome: target.name,
        descricao: target.description,
        preco: target.price,
        duracao: target.duration,
        categoria: target.category,
        ativo: !target.active,
        oficinaId: user.id,
      });

      const atualizadoNormalizado: Service = {
        id: atualizado.id,
        name: atualizado.nome,
        description: atualizado.descricao,
        price: atualizado.preco,
        duration: atualizado.duracao,
        category: atualizado.categoria,
        active: atualizado.ativo,
      };

      setServices((prev) =>
        prev.map((s) => (s.id === serviceId ? atualizadoNormalizado : s))
      );
    } catch (err) {
      console.error("Erro ao atualizar status do serviço:", err);
    }
  };

  const filteredServices = services.filter(
    (service) => categoryFilter === "all" || service.category === categoryFilter
  );

  const activeServices = services.filter((s) => s.active).length;
  const totalRevenue = services
    .filter((s) => s.active)
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard-oficina"
                className="text-gray-600 hover:text-blue-800"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">
                Serviços
              </h2>
            </div>

            <Button
              onClick={() => {
                setEditingService(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Serviços
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {services.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Serviços Ativos
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {activeServices}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">
                  {activeServices}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Receita Potencial
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  R$ {totalRevenue}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold">R$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Filtrar por Categoria
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "Todos" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={(service) => {
                setEditingService(service);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteService}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum serviço encontrado para esta categoria.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        onSave={editingService ? handleUpdateService : handleCreateService}
        service={editingService}
        categories={categories.filter((c) => c !== "all")}
      />
    </div>
  );
};

export default WorkshopServices;
