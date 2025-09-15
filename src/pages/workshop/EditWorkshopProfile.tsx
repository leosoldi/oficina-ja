// EditWorkshopProfile.tsx (corrigido, sem "Serviços")
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit3,
  MapPin,
  Clock,
  Star,
  Save,
  X,
  Shield,
  Camera,
  Phone,
  Building,
  Award,
} from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";
import { Link } from "react-router-dom";
import { oficinaService } from "@/services/Oficina";
import { useCep } from "@/hooks/useCep";
import { useAuth } from "@/contexts/AuthContext";

const EditWorkshopProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingSections, setEditingSections] = useState<
    Record<string, boolean>
  >({});
  const { user } = useAuth();

  const { handleCepChange } = useCep((data) => {
    setProfileData((prev) => ({
      ...prev,
      address: data.address,
      cep: data.cep,
    }));
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    cep: "",
    cnpj: "",
    description: "",
    // services removido
    specialties: [] as string[],
    certifications: [] as string[],
    workingHours: {
      weekdays: { start: "", end: "" },
      saturday: { start: "", end: "" },
      sunday: { start: "" },
    },
    avatar: undefined as File | string | undefined,
  });

  useEffect(() => {
    const carregarDados = async () => {
      if (!user?.id) return;
      try {
        const data = await oficinaService.buscarPorId(user.id);
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
        } as typeof profileData);
      } catch (err) {
        console.error("Erro ao carregar dados da oficina:", err);
      }
    };

    carregarDados();
  }, [user]);

  const handleSave = async () => {
    try {
      const oficinaId = user?.id!;
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

      // NÃO enviar "services" desta tela
      profileData.specialties.forEach((m) =>
        formData.append("especialidades[]", m)
      );
      profileData.certifications.forEach((c) =>
        formData.append("certificacoes[]", c)
      );

      if (profileData.avatar instanceof File) {
        formData.append("avatar", profileData.avatar);
      }

      await oficinaService.atualizar(oficinaId, formData);
      setEditingSections({});
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  const toggleEdit = (section: string) => {
    setEditingSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveSection = (section: string) => {
    setEditingSections((prev) => ({ ...prev, [section]: false }));
    handleSave();
  };

  const EditButton = ({ section }: { section: string; title: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        editingSections[section] ? saveSection(section) : toggleEdit(section)
      }
      className="h-10 px-3 touch-target"
    >
      {editingSections[section] ? (
        <Save className="h-4 w-4 text-green-600" />
      ) : (
        <Edit3 className="h-4 w-4 text-blue-600" />
      )}
    </Button>
  );

  // Editor genérico de chips/badges
  const ChipsEditor: React.FC<{
    items: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    badgeClassName?: string;
  }> = ({
    items,
    onChange,
    placeholder = "Digite e pressione Enter",
    badgeClassName,
  }) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const add = (raw: string) => {
      const v = raw.trim();
      if (!v) return;
      if (items.includes(v)) {
        setValue("");
        return;
      }
      onChange([...items, v]);
      setValue("");
    };

    const remove = (idx: number) => {
      onChange(items.filter((_, i) => i !== idx));
    };

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((it, idx) => (
          <span
            key={`${it}-${idx}`}
            className={
              badgeClassName ??
              "inline-flex items-center gap-1 px-2 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-xs sm:text-sm"
            }
          >
            {it}
            <button
              type="button"
              onClick={() => remove(idx)}
              className="ml-1 hover:opacity-80"
              aria-label={`Remover ${it}`}
              title="Remover"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => add(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(value);
            }
          }}
          placeholder={placeholder}
          className="min-w-[12ch] max-w-[24ch] px-2 py-1 border rounded-md text-sm outline-none focus:ring-2 focus:ring-orange-200"
        />
      </div>
    );
  };
  // Normaliza "930" -> "09:30", "9:3" -> "09:03", "24:00" -> "23:59"
  const normalizeTime = (raw: string): string => {
    const v = (raw || "").replace(/[^\d:]/g, "");
    if (!v) return "";
    let [h, m] = v.includes(":") ? v.split(":") : [v.slice(0, 2), v.slice(2)];
    if (h.length === 1) h = `0${h}`;
    if (m == null) m = "00";
    if (m.length === 1) m = `0${m}`;
    let hh = Math.min(Math.max(parseInt(h || "0", 10), 0), 23);
    let mm = Math.min(Math.max(parseInt(m || "0", 10), 0), 59);
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };

  type DayKey = "weekdays" | "saturday" | "sunday";

  const TimeField: React.FC<{
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
    placeholder?: string;
  }> = ({ value, onChange, disabled, placeholder = "--:--" }) => {
    const [local, setLocal] = useState(value || "");
    useEffect(() => setLocal(value || ""), [value]);

    return (
      <Input
        type="time"
        step={300} // 5 min
        value={local}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          // browsers já entregam HH:MM, mas garantimos
          const v = e.target.value;
          setLocal(v);
          onChange(v ? normalizeTime(v) : "");
        }}
        onBlur={(e) => {
          const v = normalizeTime(e.target.value);
          setLocal(v);
          onChange(v);
        }}
        className={`text-sm ${disabled ? "opacity-60" : ""}`}
      />
    );
  };

  const HoursRow: React.FC<{
    label: string;
    day: DayKey;
    value: { start?: string; end?: string };
    closed?: boolean;
    onChange: (
      next: { start?: string; end?: string },
      closed?: boolean
    ) => void;
    presets?: Array<{ label: string; start: string; end: string }>;
    singleField?: boolean; // para domingo (apenas "start")
  }> = ({ label, day, value, closed, onChange, presets = [], singleField }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs sm:text-sm text-gray-600">{label}</Label>
          <div className="flex items-center gap-2">
            {presets.map((p) => (
              <Button
                key={p.label}
                variant="outline"
                type="button"
                onClick={() => onChange({ start: p.start, end: p.end }, false)}
                className="h-7"
              >
                {p.label}
              </Button>
            ))}
            <Button
              variant={closed ? "default" : "outline"}
              type="button"
              onClick={() => onChange({ start: "", end: "" }, !closed)}
              className="h-7"
              title="Marcar como fechado"
            >
              {closed ? "Fechado" : "Fechar"}
            </Button>
          </div>
        </div>

        <div className={`flex ${singleField ? "gap-0" : "gap-2"}`}>
          <TimeField
            disabled={closed}
            value={value.start || ""}
            onChange={(v) => onChange({ ...value, start: v }, closed)}
          />
          {!singleField && (
            <TimeField
              disabled={closed}
              value={value.end || ""}
              onChange={(v) => onChange({ ...value, end: v }, closed)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/dashboard-oficina">
                <Button variant="ghost" size="sm" className="touch-target">
                  <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Voltar</span>
                </Button>
              </Link>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                <span className="hidden sm:inline">
                  Editar Perfil da Oficina
                </span>
                <span className="sm:hidden">Editar Perfil</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 mobile-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Hero Section */}
            <Card className="relative overflow-hidden">
              <div
                className="h-32 sm:h-40 lg:h-48 relative bg-cover bg-center"
                style={{
                  backgroundImage:
                    profileData.avatar instanceof File
                      ? `url('${URL.createObjectURL(profileData.avatar)}')`
                      : profileData.avatar
                      ? `url('${getImageUrl(profileData.avatar)}')`
                      : "linear-gradient(to right, #2563eb, #ea580c)",
                }}
              >
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <EditButton section="hero" title="Imagem de Capa" />
                </div>

                {editingSections.hero && (
                  <div className="absolute bottom-2 right-2 flex gap-2 z-20">
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => inputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4 mr-1" /> Alterar foto
                    </Button>

                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProfileData((prev) => ({ ...prev, avatar: file }));
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <CardContent className="p-4 sm:p-6 -mt-12 sm:-mt-16 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl shadow-lg flex items-center justify-center relative mx-auto sm:mx-0 flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      AC
                    </span>
                    {editingSections.logo && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                        <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        {editingSections.basicInfo ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left"
                          />
                        ) : (
                          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {profileData.name}
                          </h1>
                        )}
                        <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 text-sm text-gray-600 flex-wrap gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>4.8</span>
                          </div>
                          <span className="hidden sm:inline">
                            156 avaliações
                          </span>
                          <span className="sm:hidden">156 aval.</span>
                          <Badge variant="secondary" className="text-xs">
                            Verificada
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-center sm:justify-end">
                        <EditButton
                          section="basicInfo"
                          title="Informações Básicas"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sobre */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Sobre a Oficina
                </CardTitle>
                <EditButton section="about" title="Sobre" />
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {editingSections.about ? (
                  <textarea
                    value={profileData.description}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none text-sm sm:text-base"
                    placeholder="Descreva sua oficina..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {profileData.description}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Especialidades */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  Especialidades
                </CardTitle>
                <EditButton section="specialties" title="Especialidades" />
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {editingSections.specialties ? (
                  <ChipsEditor
                    items={profileData.specialties}
                    onChange={(next) =>
                      setProfileData((prev) => ({ ...prev, specialties: next }))
                    }
                    placeholder="Ex.: BMW — pressione Enter"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.length === 0 ? (
                      <span className="text-sm text-gray-500">
                        Nenhuma especialidade adicionada.
                      </span>
                    ) : (
                      profileData.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200 text-xs sm:text-sm"
                        >
                          {specialty}
                        </Badge>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contato */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  Contato
                </CardTitle>
                <EditButton section="contact" title="Contato" />
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">
                      Telefone
                    </Label>
                    {editingSections.contact ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900">
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">
                      WhatsApp
                    </Label>
                    {editingSections.contact ? (
                      <Input
                        value={profileData.whatsapp}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            whatsapp: e.target.value,
                          }))
                        }
                        className="text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900">
                        {profileData.whatsapp}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">
                      E-mail
                    </Label>
                    {editingSections.contact ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 break-all">
                        {profileData.email}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  Localização
                </CardTitle>
                <EditButton section="location" title="Localização" />
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {editingSections.location ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full min-h-[80px] p-3 border rounded-md resize-none text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-700">
                    {profileData.address}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Funcionamento */}
            {/* Horário de Funcionamento */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Funcionamento
                </CardTitle>
                <EditButton section="hours" title="Horários" />
              </CardHeader>

              <CardContent className="space-y-4 px-4 sm:px-6">
                {editingSections.hours ? (
                  <>
                    <HoursRow
                      label="Segunda a Sexta"
                      day="weekdays"
                      value={profileData.workingHours.weekdays}
                      closed={
                        !profileData.workingHours.weekdays.start &&
                        !profileData.workingHours.weekdays.end
                      }
                      presets={[
                        { label: "09–18", start: "09:00", end: "18:00" },
                        { label: "08–17", start: "08:00", end: "17:00" },
                      ]}
                      onChange={(next, closed) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            weekdays: closed
                              ? { start: "", end: "" }
                              : {
                                  start: next.start ?? "",
                                  end: next.end ?? "",
                                },
                          },
                        }))
                      }
                    />

                    <HoursRow
                      label="Sábado"
                      day="saturday"
                      value={profileData.workingHours.saturday}
                      closed={
                        !profileData.workingHours.saturday.start &&
                        !profileData.workingHours.saturday.end
                      }
                      presets={[
                        { label: "08–12", start: "08:00", end: "12:00" },
                        { label: "09–13", start: "09:00", end: "13:00" },
                      ]}
                      onChange={(next, closed) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            saturday: closed
                              ? { start: "", end: "" }
                              : {
                                  start: next.start ?? "",
                                  end: next.end ?? "",
                                },
                          },
                        }))
                      }
                    />

                    <HoursRow
                      label="Domingo"
                      day="sunday"
                      value={profileData.workingHours.sunday}
                      closed={!profileData.workingHours.sunday.start}
                      singleField
                      onChange={(next, closed) =>
                        setProfileData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            sunday: closed
                              ? { start: "" }
                              : { start: next.start || "" },
                          },
                        }))
                      }
                    />

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() =>
                          setProfileData((prev) => ({
                            ...prev,
                            workingHours: {
                              ...prev.workingHours,
                              saturday: { ...prev.workingHours.weekdays },
                            },
                          }))
                        }
                      >
                        Copiar Seg–Sex → Sábado
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() =>
                          setProfileData((prev) => ({
                            ...prev,
                            workingHours: {
                              weekdays: { start: "", end: "" },
                              saturday: { start: "", end: "" },
                              sunday: { start: "" },
                            },
                          }))
                        }
                      >
                        Limpar tudo
                      </Button>

                      <Button
                        size="sm"
                        type="button"
                        onClick={() => saveSection("hours")}
                      >
                        Salvar horários
                      </Button>
                    </div>
                  </>
                ) : (
                  // VISUALIZAÇÃO
                  <div className="space-y-3 text-sm sm:text-base text-gray-900">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Segunda a Sexta
                      </div>
                      <div>
                        {profileData.workingHours.weekdays.start &&
                        profileData.workingHours.weekdays.end
                          ? `${profileData.workingHours.weekdays.start} às ${profileData.workingHours.weekdays.end}`
                          : "Fechado"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Sábado
                      </div>
                      <div>
                        {profileData.workingHours.saturday.start &&
                        profileData.workingHours.saturday.end
                          ? `${profileData.workingHours.saturday.start} às ${profileData.workingHours.saturday.end}`
                          : "Fechado"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Domingo
                      </div>
                      <div>
                        {profileData.workingHours.sunday.start
                          ? profileData.workingHours.sunday.start
                          : "Fechado"}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certificações */}
            <Card className="safe-bottom">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  Certificações
                </CardTitle>
                <EditButton section="certifications" title="Certificações" />
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {editingSections.certifications ? (
                  <ChipsEditor
                    items={profileData.certifications}
                    onChange={(next) =>
                      setProfileData((prev) => ({
                        ...prev,
                        certifications: next,
                      }))
                    }
                    placeholder="Ex.: ISO 9001 — pressione Enter"
                    badgeClassName="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs sm:text-sm"
                  />
                ) : (
                  <div className="space-y-2">
                    {profileData.certifications.length === 0 ? (
                      <span className="text-sm text-gray-500">
                        Nenhuma certificação adicionada.
                      </span>
                    ) : (
                      profileData.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-green-50 rounded"
                        >
                          <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-green-800">
                            {cert}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkshopProfile;
