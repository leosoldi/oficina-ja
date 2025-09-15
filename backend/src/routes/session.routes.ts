// src/routes/session.ts
import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { PreCadastroService } from "../services/PreCadastroService";

const router = Router();

// helpers para colocar/retirar objetos no "state" do OAuth
function encodeState(obj: any) {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}
function decodeState<T = any>(s?: string): T | null {
  if (!s) return null;
  try {
    return JSON.parse(Buffer.from(String(s), "base64url").toString());
  } catch {
    return null as any;
  }
}

/**
 * GET /api/session/auth/google?type=motorista|oficina&invite=<token>&redirect=<url>
 */
router.get("/auth/google", (req, res, next) => {
  const { type, invite, redirect } = req.query as {
    type?: "motorista" | "oficina";
    invite?: string;
    redirect?: string;
  };

  if (type !== "motorista" && type !== "oficina") {
    return res.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  const state = encodeState({
    type,
    invite: invite || null,
    redirect: redirect || null,
  });

  return passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
    state,
  })(req, res, next);
});

/**
 * GET /api/session/auth/google/callback
 * - Recupera o state (type, invite, redirect)
 * - Aceita o convite (se houver)
 * - Gera JWT e redireciona
 */
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  async (req: any, res) => {
    try {
      const st = decodeState<{ type: "motorista" | "oficina"; invite?: string | null; redirect?: string | null }>(
        req.query.state as string
      );

      const typeFromState = st?.type ?? req.user?.type ?? "motorista";
      const inviteToken = st?.invite ?? null;
      const redirectTo = st?.redirect ?? null;

      // Dados vindos do seu verify do Passport (ajuste se necessário)
      const googleId: string = req.user?.googleId || req.user?.id;
      const email: string | null = req.user?.email ?? req.user?.emails?.[0]?.value ?? null;
      const nome: string = req.user?.nome ?? req.user?.displayName ?? "";

      // Se foi fluxo de convite, aceita agora no servidor
      if (inviteToken) {
        try {
          await PreCadastroService.aceitar({
            token: inviteToken,
            provider: "google",
            googleId,
            realEmail: email ?? undefined,
          });
        } catch (e) {
          // opcional: log/telemetria ou redirecionar com erro
          console.error("Falha ao aceitar convite:", e);
        }
      }

      // Monte o payload do seu JWT como já fazia
      const token = jwt.sign(
        { id: req.user.id, type: typeFromState, name: nome, email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );
 const base = (process.env.FRONTEND_URL || "").replace(/\/+$/, "");
 const successUrl =
   `${base}/auth-success?token=${encodeURIComponent(token)}&type=${typeFromState}` +
   (redirectTo ? `&next=${encodeURIComponent(redirectTo)}` : "");
 return res.redirect(successUrl);
          } catch (err) {
      console.error("Erro no callback do Google:", err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?err=google_callback`);
    }
  }
);

export default router;
