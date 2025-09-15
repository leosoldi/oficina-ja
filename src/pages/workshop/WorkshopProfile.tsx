import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Clock,
  Star,
  Save,
  Edit,
  Plus,
  X,
  Shield,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { oficinaService } from "@/services/Oficina";
import { useCep } from "@/hooks/useCep";
import { useAuth } from "@/contexts/AuthContext";

const WorkshopProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const { handleCepChange } = useCep((data) => {
    setProfileData((prev) => ({
      ...prev,
      address: data.address,
      cep: data.cep,
    }));
  });

  const { user } = useAuth();

  const [profileData, setProfileData] = useState<{
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    cep: string;
    cnpj: string;
    description: string;
    services: string[];
    specialties: string[];
    certifications: string[];
    workingHours: {
      weekdays: {
        start: string;
        end: string;
      };
      saturday: {
        start: string;
        end: string;
      };
      sunday: {
        start: string;
      };
    };
    avatar?: File | string;
  }>({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    cep: "",
    cnpj: "",
    description: "",
    services: [],
    specialties: [],
    certifications: [],
    workingHours: {
      weekdays: {
        start: "",
        end: "",
      },
      saturday: {
        start: "",
        end: "",
      },
      sunday: {
        start: "",
      },
    },

    avatar: undefined,
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const oficinaId = user?.id;
        const data = await oficinaService.buscarPorId(oficinaId);
        console.log("Dados da oficina:", data);
        setProfileData({
          name: data.nome || "",
          email: data.email || "",
          phone: data.telefone || "",
          whatsapp: data.whatsapp || "",
          address: data.endereco || "",
          cep: data.cep || "",
          cnpj: data.cnpj || "",
          description: data.descricao || "",
          services: data.servicos?.map((s: any) => s.nome) || [],
          specialties: data.especialidades?.map((e: any) => e.marca) || [],
          certifications: data.certificacoes?.map((c: any) => c.titulo) || [],
          workingHours: {
            weekdays: {
              start: data.horarioSegSexInicio || "",
              end: data.horarioSegSexFim || "",
            },
            saturday: {
              start: data.horarioSabadoInicio || "",
              end: data.horarioSabadoFim || "",
            },
            sunday: {
              start: data.horarioDomingo || "",
            },
          },

          avatar: data.avatar || undefined,
        });
      } catch (err) {
        console.error("Erro ao carregar dados da oficina:", err);
      }
    };

    carregarDados();
  }, []);

  const handleSave = async () => {
    try {
      const oficinaId = user?.id;

      const formData = new FormData();

      formData.append("nome", profileData.name);
      formData.append("email", profileData.email);
      formData.append("telefone", profileData.phone);
      formData.append("whatsapp", profileData.whatsapp);
      formData.append("cnpj", profileData.cnpj);
      formData.append("endereco", profileData.address);
      formData.append("cep", profileData.cep);
      formData.append("descricao", profileData.description);
      formData.append(
        "horarioSegSexInicio",
        profileData.workingHours.weekdays.start
      );
      formData.append(
        "horarioSegSexFim",
        profileData.workingHours.weekdays.end
      );
      formData.append(
        "horarioSabadoInicio",
        profileData.workingHours.saturday.start
      );
      formData.append(
        "horarioSabadoFim",
        profileData.workingHours.saturday.end
      );
      formData.append("horarioDomingo", profileData.workingHours.sunday.start);

      profileData.services.forEach((s, i) => {
        formData.append(`servicos[${i}]`, s);
      });
      profileData.specialties.forEach((m, i) => {
        formData.append(`especialidades[${i}]`, m);
      });
      profileData.certifications.forEach((c, i) => {
        formData.append(`certificacoes[${i}]`, c);
      });

      // Enviar imagem (avatar) se houver
      if (profileData.avatar instanceof File) {
        formData.append("avatar", profileData.avatar);
      }

      await oficinaService.atualizar(oficinaId, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  const addService = () => {
    if (newService.trim()) {
      setProfileData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfileData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfileData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
        const hh = h.toString().padStart(2, "0");
        const mm = m.toString().padStart(2, "0");
        times.push(`${hh}:${mm}`);
      }
    }
    return times;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard-oficina">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Configurações do Perfil
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Picture and Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-100 rounded-xl relative group overflow-hidden flex items-center justify-center">
                  {profileData.avatar instanceof File ? (
                    <img
                      src={URL.createObjectURL(profileData.avatar)}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : profileData.avatar ? (
                    <img
                      src={
                        profileData.avatar.startsWith("http")
                          ? profileData.avatar
                          : `http://oficinaja.com.br${profileData.avatar}`
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-blue-500" /> // <- ícone padrão aqui
                  )}

                  {isEditing && (
                    <label className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData((prev) => ({
                              ...prev,
                              avatar: file,
                            }));
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome da Oficina</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={profileData.cnpj}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            cnpj: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição da Oficina</Label>
                <textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={`w-full min-h-[100px] p-3 border rounded-md resize-none ${
                    !isEditing ? "bg-gray-50" : ""
                  }`}
                  placeholder="Descreva sua oficina, experiência e diferenciais..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={profileData.cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={profileData.whatsapp}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        whatsapp: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Horário de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Segunda a Sexta */}
                <div>
                  <Label>Segunda a Sexta</Label>
                  <div className="flex gap-2">
                    <select
                      value={profileData.workingHours.weekdays.start}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            weekdays: {
                              ...prev.workingHours.weekdays,
                              start: e.target.value,
                            },
                          },
                        }))
                      }
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <select
                      value={profileData.workingHours.weekdays.end}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            weekdays: {
                              ...prev.workingHours.weekdays,
                              end: e.target.value,
                            },
                          },
                        }))
                      }
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sábado */}
                <div>
                  <Label>Sábado</Label>
                  <div className="flex gap-2">
                    <select
                      value={profileData.workingHours.saturday.start}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            saturday: {
                              ...prev.workingHours.saturday,
                              start: e.target.value,
                            },
                          },
                        }))
                      }
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <select
                      value={profileData.workingHours.saturday.end}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            saturday: {
                              ...prev.workingHours.saturday,
                              end: e.target.value,
                            },
                          },
                        }))
                      }
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Domingo */}
                <div>
                  <Label>Domingo</Label>
                  <select
                    value={profileData.workingHours.sunday.start}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          sunday: {
                            start: e.target.value,
                          },
                        },
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-md"
                  >
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

         
          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-600" />
                Especialidades (Marcas)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar nova especialidade..."
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                  />
                  <Button onClick={addSpecialty} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {specialty}
                    {isEditing && (
                      <button
                        onClick={() => removeSpecialty(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Certificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar nova certificação..."
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCertification()}
                  />
                  <Button onClick={addCertification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((certification, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {certification}
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopProfile;
