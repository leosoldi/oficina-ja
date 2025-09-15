import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Loader2, ArrowLeft } from "lucide-react";

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

export default function RegisterInvite() {
  const [qs] = useSearchParams();
  const token = qs.get("invite") || "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InviteDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  // form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Convite inválido.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await api.get(`/pre-cadastros/${token}`);
        setInvite(data);
        setName(data?.nome ?? "");
        setEmail(data?.email ?? "");
      } catch (e: any) {
        setError(e?.response?.data?.error || "Convite inválido ou expirado.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!invite) return;
    if (!email) return toast.error("Informe um e-mail válido.");
    if (pass.length < 6) return toast.error("Senha precisa ter ao menos 6 caracteres.");
    if (pass !== pass2) return toast.error("As senhas não conferem.");

    try {
      setSaving(true);
      // aceita o convite com provider manual
      await api.post(`/pre-cadastros/${token}/aceitar`, {
        provider: "manual",
        realEmail: email,
        password: pass, // ver backend abaixo
      });

      toast.success("Cadastro concluído! Faça login para continuar.");
      navigate(`/login?email=${encodeURIComponent(email)}`, { replace: true });
    } catch (e: any) {
      toast.error(e?.response?.data?.error || "Não foi possível concluir o cadastro.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
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
            <div className="text-lg font-semibold text-red-600 mb-1">Convite inválido</div>
            <p className="text-sm text-slate-600 mb-4">{error}</p>
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
      <div className="max-w-xl mx-auto p-6">
        <div className="mb-4">
          <Link to={`/convite/${invite.token}`} className="inline-flex items-center text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar ao convite
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Concluir cadastro com e-mail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
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
                <Badge variant="secondary" className="font-mono">{invite.veiculoPlaca || "—"}</Badge>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Validade do link: <span className="font-medium">{exp}</span>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <Label>Nome</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} disabled />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  type="email"
                />
              </div>
              <div>
                <Label>Senha</Label>
                <Input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label>Confirmar senha</Label>
                <Input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="••••••••" />
              </div>

              <Button type="submit" className="w-full h-11" disabled={saving}>
                {saving ? "Concluindo..." : "Concluir cadastro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
