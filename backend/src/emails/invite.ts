// src/emails/invite.ts

type InviteProps = {
  nome: string;
  inviteUrl: string;
  oficinaNome?: string;
  expiresAt?: Date | string;
  brandName?: string;       // "OficinaJá" por padrão
  brandUrl?: string;        // link do site/app (opcional)
};

export function renderInviteEmail({
  nome,
  inviteUrl,
  oficinaNome,
  expiresAt,
  brandName = "OficinaJá",
  brandUrl = "https://app.seudominio.com",
}: InviteProps) {
  const validade =
    expiresAt ? new Date(expiresAt).toLocaleString("pt-BR") : undefined;

  // ⚠️ IMPORTANTE: use estilos inline em e-mail.
  // Layout: largura 600px, card branco, hero com gradiente e carro em SVG.
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Complete seu cadastro - ${brandName}</title>
<style>
/* Alguns clientes aceitam dark mode */
@media (prefers-color-scheme: dark) {
  .bg { background: #0b1220 !important; }
  .card { background: #0e172a !important; color:#e2e8f0 !important; }
  .muted { color:#94a3b8 !important; }
  .divider { border-color:#1f2a44 !important; }
  .btn { background:#2563eb !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:#f5f7fb" class="bg">
  <!-- preheader (invisível em vários clientes, mas útil) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">
    Finalize seu cadastro em poucos cliques.
  </div>

  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#f5f7fb;padding:24px 0;">
    <tr>
      <td align="center">

        <!-- container -->
        <table role="presentation" width="600" cellPadding="0" cellSpacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb" class="card">
          <!-- header -->
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid #eef2f7;">
              <table role="presentation" width="100%">
                <tr>
                  <td align="left" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;font-weight:700;color:#0f172a;">
                    ${brandUrl
                      ? `<a href="${brandUrl}" style="text-decoration:none;color:#0f172a">${brandName}</a>`
                      : brandName}
                  </td>
                  <td align="right" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;color:#64748b" class="muted">
                    ${new Date().toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- hero com gradiente e carro -->
          <tr>
            <td style="background:linear-gradient(90deg,#0ea5e9 0%, #2563eb 60%, #1d4ed8 100%);padding:28px 28px 8px;border-bottom:1px solid #e5e7eb;border-top-left-radius:16px;border-top-right-radius:16px">
              <table role="presentation" width="100%">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:20px;line-height:1.3;font-weight:800;color:#ffffff;margin-bottom:8px">
                      Complete seu cadastro
                    </div>
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#e2e8f0">
                      ${oficinaNome ? `A <strong style="color:#fff">${oficinaNome}</strong>` : "A sua oficina"} convidou você a finalizar seu cadastro.
                    </div>
                  </td>
                  <td align="right" style="vertical-align:bottom;">
                    <!-- Carro: SVG inline (compatível com a maioria dos clientes) -->
                    <div style="line-height:0">
                      <svg width="140" height="64" viewBox="0 0 280 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Carro" style="display:block">
                        <defs>
                          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                            <stop stop-color="#93c5fd" offset="0"/>
                            <stop stop-color="#e0f2fe" offset="1"/>
                          </linearGradient>
                        </defs>
                        <!-- carro estilizado -->
                        <path d="M30 88c0-10 8-18 18-18h15c14-16 32-26 53-26h36c22 0 43 10 58 26h14c10 0 18 8 18 18v8c0 4-4 8-8 8H38c-4 0-8-4-8-8v-8z" fill="url(#g)" opacity="0.95"/>
                        <!-- janelas -->
                        <path d="M98 52h40c12 0 24 5 32 14H90c2-6 5-10 8-14z" fill="#1e3a8a" opacity="0.2"/>
                        <!-- rodas -->
                        <circle cx="82" cy="96" r="14" fill="#0b1220" opacity="0.9"/>
                        <circle cx="82" cy="96" r="7" fill="#93c5fd"/>
                        <circle cx="198" cy="96" r="14" fill="#0b1220" opacity="0.9"/>
                        <circle cx="198" cy="96" r="7" fill="#93c5fd"/>
                        <!-- farol -->
                        <rect x="238" y="84" width="12" height="6" rx="3" fill="#fde68a"/>
                      </svg>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- conteúdo -->
          <tr>
            <td style="padding:28px">
              <p style="margin:0 0 10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;color:#0f172a">
                Olá, <strong>${nome}</strong>!
              </p>
              <p style="margin:0 0 18px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;line-height:1.6;color:#334155">
                Clique no botão abaixo para concluir seu cadastro e ter acesso às funcionalidades do ${brandName}.
              </p>

              <!-- botão bulletproof (inclui VML para Outlook) -->
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${inviteUrl}" style="height:44px;v-text-anchor:middle;width:260px;" arcsize="14%" strokecolor="#1d4ed8" fillcolor="#2563eb">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">
                  Completar meu cadastro
                </center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <a href="${inviteUrl}" class="btn"
                 style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;border-radius:10px;padding:12px 20px;font-weight:700;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
                Completar meu cadastro
              </a>
              <!--<![endif]-->

              <div class="divider" style="border-top:1px solid #e5e7eb;margin:22px 0"></div>

              <p style="margin:0 0 8px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;color:#64748b" class="muted">
                Link direto: <a href="${inviteUrl}" style="color:#2563eb">${inviteUrl}</a>
              </p>
              ${validade
                ? `<p style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;color:#64748b" class="muted">
                     Validade: ${validade}
                   </p>`
                : ""}

              <p style="margin:16px 0 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;color:#94a3b8" class="muted">
                Se você não solicitou este e-mail, pode ignorá-lo.
              </p>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:16px 28px 28px;color:#94a3b8;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px" class="muted">
              © ${new Date().getFullYear()} ${brandName}. Todos os direitos reservados.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderInviteEmailText({
  nome,
  inviteUrl,
  oficinaNome,
  expiresAt,
  brandName = "OficinaJá",
}: InviteProps) {
  const validade =
    expiresAt ? new Date(expiresAt).toLocaleString("pt-BR") : undefined;
  return `Olá, ${nome}!

${oficinaNome ? `A ${oficinaNome}` : "A sua oficina"} convidou você a completar seu cadastro no ${brandName}.

Concluir cadastro: ${inviteUrl}
${validade ? `Validade: ${validade}` : ""}

Se você não solicitou este e-mail, ignore.`;
}
