// src/pages/ClientRegistration.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone as PhoneIcon,
  Car,
  Calendar,
  Database,
  Search,
  Edit,
  Trash2,
  Eye,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { clientesService } from "@/services/clientes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { criarPreCadastro } from "@/services/preCadastro";

type ClientFormData = {
  name: string;
  phone: string;
  email?: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlate: string;
};

type Client = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlate: string;
  createdAt: string;
};

type ClienteCriarResponse = {
  status: "INVITED" | "LINKED" | "CREATED";
  inviteUrl?: string;
  token?: string;
  emailSent?: boolean;
  expiresAt?: string | Date;
};
// --- helpers de máscara ---
const maskPhone = (v: string) => {
  let s = v.replace(/\D/g, "");
  if (s.length > 11) s = s.slice(0, 11);
  if (s.length <= 10) {
    return s.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return s.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

const maskPlate = (v: string) => {
  // aceita ABC-1234 ou MERCOSUL ABC1D23
  return v
    .toUpperCase()
    .replace(/[^\w-]/g, "")
    .replace(/^[A-Z0-9]{8,}$/g, v.toUpperCase()); // deixa passar formatos livres curtos
};

const ClientRegistration: React.FC = () => {
  const { user } = useAuth(); // user.id = oficinaId
  const oficinaId = user?.id ?? "";
  const [viewOpen, setViewOpen] = useState(false);
  const [viewClient, setViewClient] = useState<Client | null>(null);
  const openView = (c: Client) => {
    setViewClient(c);
    setViewOpen(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicleModel: "",
      vehicleYear: "",
      vehiclePlate: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // controle de edição
  const [editingId, setEditingId] = useState<string | null>(null);

  // carregar lista
  const fetchClients = async () => {
    if (!oficinaId) return;
    setLoading(true);
    try {
      const rows = await clientesService.listar();
      setClients(
        (rows || []).map((r: any) => ({
          id: r.id,
          name: r.nome ?? r.name,
          phone: r.telefone ?? r.phone ?? "",
          email: r.email ?? null,
          vehicleModel: r.veiculoModelo ?? r.vehicleModel ?? "",
          vehicleYear: r.veiculoAno ?? r.vehicleYear ?? "",
          vehiclePlate: r.veiculoPlaca ?? r.vehiclePlate ?? "",
          createdAt: r.createdAt ?? new Date().toISOString(),
        }))
      );
    } catch (e) {
      toast.error("Não foi possível carregar os clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oficinaId]);

  // submissão (criar/atualizar)
  const onSubmit = async (data: ClientFormData) => {
    const payload = {
      nome: data.name,
      email: data.email || null,
      telefone: data.phone,
      veiculoModelo: data.vehicleModel,
      veiculoAno: data.vehicleYear,
      veiculoPlaca: data.vehiclePlate,
    };

    try {
      if (editingId) {
        await clientesService.atualizar(editingId, payload);
        toast.success("Cliente atualizado com sucesso!");
        setEditingId(null);
      } else {
        const res = (await criarPreCadastro(
          oficinaId,
          payload
        )) as ClienteCriarResponse;
        if (res?.status === "INVITED" && res?.inviteUrl) {
          const sentTxt = res.emailSent
            ? "E-mail enviado."
            : "Não foi possível enviar o e-mail agora.";
          toast.success(`Pré-cadastro criado! Link copiado. ${sentTxt}`);

          try {
            await navigator.clipboard.writeText(res.inviteUrl);
          } catch {}
        } else if (res?.status === "LINKED") {
          toast.success("Cliente já possuía conta. Vínculo criado!");
        } else {
          toast.success("Cliente cadastrado!");
        }
      }
      await fetchClients();
      reset();
    } catch (e: any) {
      toast.error(
        e?.response?.data?.error ||
          (editingId
            ? "Erro ao atualizar cliente."
            : "Erro ao cadastrar cliente.")
      );
    }
  };

  // editar: carrega dados no formulário
  const startEdit = (c: Client) => {
    setEditingId(c.id);
    setValue("name", c.name || "");
    setValue("phone", c.phone || "");
    setValue("email", c.email || "");
    setValue("vehicleModel", c.vehicleModel || "");
    setValue("vehicleYear", c.vehicleYear || "");
    setValue("vehiclePlate", c.vehiclePlate || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // cancelar edição
  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const remove = async (id: string) => {
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await clientesService.excluir(id);
      toast.success("Cliente excluído.");
      await fetchClients();
    } catch (e) {
      toast.error("Erro ao excluir cliente.");
    }
  };

  // máscaras (aplicadas ao digitar)
  const phone = watch("phone");
  const plate = watch("vehiclePlate");
  useEffect(() => {
    setValue("phone", maskPhone(phone || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);
  useEffect(() => {
    setValue("vehiclePlate", maskPlate(plate || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plate]);

  const filtered = useMemo(() => {
    const q = (searchTerm || "").toLowerCase().trim();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.phone || "").includes(q) ||
        (c.vehiclePlate || "").toLowerCase().includes(q)
    );
  }, [clients, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/dashboard-oficina"
                className="text-gray-600 hover:text-blue-800 p-2"
              >
                <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <h1 className="text-xl md:text-2xl font-bold">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-300" />
              <h2 className="hidden md:block text-lg font-semibold text-gray-700">
                {editingId ? "Editar Cliente" : "Cadastro de Cliente"}
              </h2>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
        {/* Formulário */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-600" />
              {editingId ? "Editar Cliente" : "Cadastro Rápido de Cliente"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Nome */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Nome Completo *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Nome completo"
                      className={`pl-10 h-11 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      {...register("name", { required: "Nome é obrigatório" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Telefone *
                  </Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      className={`pl-10 h-11 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      {...register("phone", {
                        required: "Telefone é obrigatório",
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      className={`pl-10 h-11 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Modelo */}
                <div className="space-y-2">
                  <Label
                    htmlFor="vehicleModel"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Modelo do Carro *
                  </Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="vehicleModel"
                      placeholder="Civic, Corolla, Focus..."
                      className={`pl-10 h-11 ${
                        errors.vehicleModel ? "border-red-500" : ""
                      }`}
                      {...register("vehicleModel", {
                        required: "Modelo é obrigatório",
                      })}
                    />
                  </div>
                  {errors.vehicleModel && (
                    <p className="text-sm text-red-600">
                      {errors.vehicleModel.message}
                    </p>
                  )}
                </div>

                {/* Ano */}
                <div className="space-y-2">
                  <Label
                    htmlFor="vehicleYear"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Ano *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="vehicleYear"
                      placeholder="2020"
                      inputMode="numeric"
                      className={`pl-10 h-11 ${
                        errors.vehicleYear ? "border-red-500" : ""
                      }`}
                      {...register("vehicleYear", {
                        required: "Ano é obrigatório",
                        minLength: { value: 4, message: "Ano inválido" },
                        maxLength: { value: 4, message: "Ano inválido" },
                      })}
                    />
                  </div>
                  {errors.vehicleYear && (
                    <p className="text-sm text-red-600">
                      {errors.vehicleYear.message}
                    </p>
                  )}
                </div>

                {/* Placa */}
                <div className="space-y-2">
                  <Label
                    htmlFor="vehiclePlate"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Placa *
                  </Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="vehiclePlate"
                      placeholder="ABC-1234"
                      className={`pl-10 h-11 ${
                        errors.vehiclePlate ? "border-red-500" : ""
                      } font-mono`}
                      {...register("vehiclePlate", {
                        required: "Placa é obrigatória",
                      })}
                    />
                  </div>
                  {errors.vehiclePlate && (
                    <p className="text-sm text-red-600">
                      {errors.vehiclePlate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                {editingId ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
                      onClick={cancelEdit}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar edição
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      {isSubmitting ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
                      asChild
                    >
                      <Link to="/dashboard-oficina">Cancelar</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                    >
                      {isSubmitting ? "Cadastrando..." : "Cadastrar Cliente"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Base de Dados */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Database className="h-6 w-6 mr-2 text-blue-600" />
                Base de Dados de Clientes
              </CardTitle>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar por nome, telefone ou placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead className="hidden lg:table-cell">Ano</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Cadastro
                    </TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-8 text-center text-gray-500"
                      >
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        {searchTerm
                          ? "Nenhum cliente encontrado"
                          : "Nenhum cliente cadastrado"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((c) => (
                      <TableRow key={c.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {c.email}
                        </TableCell>
                        <TableCell>{c.vehicleModel}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {c.vehicleYear}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {c.vehiclePlate}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              title="Visualizar"
                              onClick={() => openView(c)} // <<-- adicionar
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                              title="Editar"
                              onClick={() => startEdit(c)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                              title="Excluir"
                              onClick={() => remove(c.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Ao criar um cliente novo, um link de convite (pré-cadastro) pode
              ser gerado para o motorista completar a conta quando desejar.
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Detalhes do cliente
            </DialogTitle>
            <DialogDescription>
              Visualização rápida dos dados cadastrados.
            </DialogDescription>
          </DialogHeader>

          {viewClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Nome</p>
                  <p className="font-medium">{viewClient.name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Telefone</p>
                  <p className="font-medium">{viewClient.phone || "—"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium break-all">
                    {viewClient.email || "—"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-gray-50/60 p-3">
                <p className="text-xs text-gray-500 mb-2">Veículo</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Modelo</p>
                    <p className="font-medium">
                      {viewClient.vehicleModel || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ano</p>
                    <p className="font-medium">
                      {viewClient.vehicleYear || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Placa</p>
                    <Badge variant="secondary" className="font-mono">
                      {viewClient.vehiclePlate || "—"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  ID: <span className="font-mono">{viewClient.id}</span>
                </span>
                <span>
                  Cadastro:{" "}
                  {new Date(viewClient.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientRegistration;
