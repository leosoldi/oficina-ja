import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Loader2, ArrowLeft, LogIn } from "lucide-react";
// opcional: se você já usa um contexto de auth com Google
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";


type InviteDTO = {
  token: string;
  nome: string;
  email: string | null;
  veiculoModelo: string | null;
  veiculoAno: string | null;
  veiculoPlaca: string | null;
  expiresAt: string;
  oficina: { id: string; nome: string };
  status: "PENDING" | "ACCEPTED" | "CANCELED";
};

export default function InviteClaim() {
  const { token: tokenParam } = useParams<{ token: string }>();
  const token = tokenParam!;
  console.log(token);

  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth?.() ?? ({} as any);

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InviteDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);

  function acceptAsGoogleRedirect() {
    const API = import.meta.env.VITE_API_URL ?? "https://oficinaja.com.br/api";
    const userType = "motorista"; // no fluxo de convite é o motorista
    //const redirectTo = `${window.location.origin}/dashboard-motorista`; // pós-login
     const redirectTo = `https://oficinaja.com.br/dashboard-motorista`; // pós-login

    window.location.href =
      `${API}/session/auth/google?` +
      `type=${userType}&invite=${encodeURIComponent(
        token
      )}&redirect=${encodeURIComponent(redirectTo)}`;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/pre-cadastro/pre-cadastros/${token}`);
        setInvite(data);
      } catch (e: any) {
        setError(e?.response?.data?.error || "Convite inválido ou expirado.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function acceptAsGoogle() {
    try {
      setAccepting(true);
      // 1) login social (se já estiver logado, pode pular)
      const g = await signInWithGoogle?.();
      const googleId = g?.googleId || g?.user?.uid || g?.user?.id || null;
      const realEmail = g?.user?.email || null;
      if (!googleId) throw new Error("Falha ao obter Google ID");

      // 2) aceitar convite no backend
      await api.post(`/pre-cadastro/pre-cadastros/${token}/aceitar`, {
        provider: "google",
        googleId,
        realEmail,
      });

      toast.success("Convite aceito! Conta vinculada.");
      navigate("/driver/dashboard"); // ajuste a rota pós-onboarding
    } catch (e: any) {
      toast.error(
        e?.response?.data?.error ||
          e?.message ||
          "Não foi possível aceitar o convite."
      );
    } finally {
      setAccepting(false);
    }
  }

  function goToRegister() {
    // redireciona para a sua tela de cadastro manual
    alert("Redirecionar para cadastro manual (a implementar)");
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Carregando convite...
        </div>
      </div>
    );
  }

  if (error || !invite) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="text-lg font-semibold text-red-600 mb-1">
              Convite inválido
            </div>
            <p className="text-sm text-slate-600 mb-4">
              {error || "Este convite não existe ou já foi utilizado/expirou."}
            </p>
            <Button asChild variant="outline">
              <Link to="/">Voltar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exp = new Date(invite.expiresAt).toLocaleString("pt-BR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Link>
        </div>

        <Card className="overflow-hidden border-0 shadow-xl">
          {/* Hero */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold">
                  Convite para cadastro
                </h1>
                <p className="opacity-90">
                  {invite.oficina?.nome} convidou você a completar seu cadastro.
                </p>
              </div>
              {/* Carro SVG */}
              <svg
                width="120"
                height="60"
                viewBox="0 0 280 128"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#93c5fd" offset="0" />
                    <stop stopColor="#e0f2fe" offset="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M30 88c0-10 8-18 18-18h15c14-16 32-26 53-26h36c22 0 43 10 58 26h14c10 0 18 8 18 18v8c0 4-4 8-8 8H38c-4 0-8-4-8-8v-8z"
                  fill="url(#g)"
                  opacity="0.95"
                />
                <path
                  d="M98 52h40c12 0 24 5 32 14H90c2-6 5-10 8-14z"
                  fill="#1e3a8a"
                  opacity="0.2"
                />
                <circle cx="82" cy="96" r="14" fill="#0b1220" opacity="0.9" />
                <circle cx="82" cy="96" r="7" fill="#93c5fd" />
                <circle cx="198" cy="96" r="14" fill="#0b1220" opacity="0.9" />
                <circle cx="198" cy="96" r="7" fill="#93c5fd" />
                <rect
                  x="238"
                  y="84"
                  width="12"
                  height="6"
                  rx="3"
                  fill="#fde68a"
                />
              </svg>
            </div>
          </div>

          <CardContent className="p-6 space-y-5">
            <div>
              <p className="text-sm text-slate-500">Convidado</p>
              <p className="font-semibold text-slate-900">{invite.nome}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-lg p-4">
              <div>
                <p className="text-xs text-slate-500">Veículo</p>
                <p className="font-medium">{invite.veiculoModelo || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Ano</p>
                <p className="font-medium">{invite.veiculoAno || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Placa</p>
                <Badge variant="secondary" className="font-mono">
                  {invite.veiculoPlaca || "—"}
                </Badge>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Validade do link: <span className="font-medium">{exp}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={acceptAsGoogleRedirect}
                disabled={accepting}
                className="h-11 flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <FcGoogle size={20} />
                <LogIn className="h-4 w-4 mr-2" />
                {accepting ? "Conectando..." : "Continuar com Google"}
              </Button>

              <Button
                onClick={goToRegister}
                variant="outline"
                className="h-11 flex-1"
              >
                Continuar com e-mail
              </Button>
            </div>

            <p className="text-xs text-slate-500">
              Preferir outro método depois? Você poderá completar o cadastro na
              área de conta.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
