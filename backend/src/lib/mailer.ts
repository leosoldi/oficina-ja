import nodemailer from "nodemailer";
import { renderInviteEmail, renderInviteEmailText } from "../emails/invite";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  logger: process.env.NODE_ENV !== "production",
  debug: process.env.NODE_ENV !== "production",
});

function extractEmail(addr: string) {
  const m = addr.match(/<([^>]+)>/);
  return m ? m[1] : addr;
}



export async function sendInviteEmail(params: {
  to: string;
  nome: string;
  inviteUrl: string;
  oficinaNome?: string;
  expiresAt?: Date;
}) {
  const { to, nome, inviteUrl, oficinaNome, expiresAt } = params;

  const fromDisplay = process.env.MAIL_FROM || `"OficinaJá" <${process.env.SMTP_USER}>`;
  const html = renderInviteEmail({ nome, inviteUrl, oficinaNome, expiresAt });
  const text = renderInviteEmailText({ nome, inviteUrl, oficinaNome, expiresAt });

  const info = await transporter.sendMail({
    from: fromDisplay,
    sender: fromDisplay.match(/<([^>]+)>/)?.[1] || process.env.SMTP_USER,
    envelope: { from: fromDisplay.match(/<([^>]+)>/)?.[1] || process.env.SMTP_USER!, to },
    to,
    subject: "Complete seu cadastro - OficinaJá",
    html,
    text,
  });

  console.log("[MAILER] Enviado:", {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  });
  return info;
}
