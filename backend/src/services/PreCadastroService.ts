import { prisma } from "../prisma";
import { randomBytes } from "crypto";
import { addHours, isBefore } from "date-fns";
import { sendInviteEmail } from "../lib/mailer";

type CriarDTO = {
  oficinaId: string;
  nome: string;
  email?: string | null;
  telefone?: string | null;
  veiculoModelo?: string | null;
  veiculoAno?: string | null;
  veiculoPlaca?: string | null;
  baseUrl: string; // ex.: https://app.seudominio.com/convite
};

export class PreCadastroService {
  /**
   * Retornos:
   *  - { status: "LINKED", motoristaId }
   *  - { status: "INVITED", motoristaId, inviteUrl, expiresAt, token, emailSent }
   */
  static async criar(dto: CriarDTO) {
    // 1) Se já existe Motorista com este email → linka e finaliza
    let existingMotorista: { id: string } | null = null;

    if (dto.email) {
      existingMotorista = await prisma.motorista.findUnique({
        where: { email: dto.email },
        select: { id: true },
      });
    }

    if (existingMotorista) {
      const motoristaId = existingMotorista.id;

      // (Opcional) cria veículo se placa/modelo vierem
      if (dto.veiculoModelo && dto.veiculoPlaca) {
        const jaTemPlaca = await prisma.veiculo.findFirst({
          where: { motoristaId, placa: dto.veiculoPlaca },
          select: { id: true },
        });

        if (!jaTemPlaca) {
          await prisma.veiculo.create({
            data: {
              motoristaId,
              modelo: dto.veiculoModelo,
              ano: dto.veiculoAno ?? "",
              placa: dto.veiculoPlaca,
              cor: "",
              quilometragem: "",
            },
          });
        }
      }

      return { status: "LINKED" as const, motoristaId };
    }

    // 2) Não existe motorista → cria convite + motorista provisório
    const token = randomBytes(24).toString("hex");
    const expiresAt = addHours(new Date(), 48);

    // Como seu schema exige email @unique, usamos placeholder se não houver email real
    const emailParaCriacao = dto.email ?? `${token}@placeholder.local`;

    const motorista = await prisma.motorista.create({
      data: {
        email: emailParaCriacao,
        nome: dto.nome,
        telefone: dto.telefone ?? undefined,
        provider: "manual",
        type: "motorista",
      },
      select: { id: true },
    });

    await prisma.preCadastroMotorista.create({
      data: {
        oficinaId: dto.oficinaId,
        email: dto.email ?? null,
        nome: dto.nome,
        telefone: dto.telefone ?? null,
        veiculoModelo: dto.veiculoModelo ?? null,
        veiculoAno: dto.veiculoAno ?? null,
        veiculoPlaca: dto.veiculoPlaca ?? null,
        token,
        expiresAt,
        motoristaId: motorista.id,
        // status default = PENDING
      },
    });

    const inviteUrl = `${dto.baseUrl.replace(/\/+$/, "")}/${token}`;
    console.log("inviteurl", inviteUrl)
    // Envio de e-mail (se houver email)
    let emailSent = false;
    if (dto.email) {
      try {
        const oficina = await prisma.oficina.findUnique({
          where: { id: dto.oficinaId },
          select: { nome: true },
        });

        await sendInviteEmail({
          to: dto.email,
          nome: dto.nome,
          inviteUrl,
          expiresAt,
          oficinaNome: oficina?.nome,
        });
        emailSent = true;
      } catch {
        emailSent = false; // não quebra o fluxo se e-mail falhar
      }
    }

    return {
      status: "INVITED" as const,
      motoristaId: motorista.id,
      inviteUrl,
      expiresAt,
      token,
      emailSent,
    };
  }

  static async obterPorToken(token: string) {
    const invite = await prisma.preCadastroMotorista.findUnique({
      where: { token },
      include: { oficina: true, motorista: true },
    });

    if (!invite) throw new Error("Convite não encontrado");
    if (isBefore(invite.expiresAt, new Date())) throw new Error("Convite expirado");
    if (invite.status !== "PENDING") throw new Error("Convite já utilizado/cancelado");

    return invite;
  }

  static async aceitar(params: {
    token: string;
    provider?: "manual" | "google";
    googleId?: string;
    realEmail?: string;
  }) {
    const { token, provider = "manual", googleId, realEmail } = params;

    const invite = await prisma.preCadastroMotorista.findUnique({ where: { token } });

    if (!invite) throw new Error("Convite inválido");
    if (isBefore(invite.expiresAt, new Date())) throw new Error("Convite expirado");
    if (invite.status !== "PENDING") throw new Error("Convite já utilizado/cancelado");
    if (!invite.motoristaId) throw new Error("Pré-cadastro inconsistente");

    const dataMotorista: any = { provider };
    if (provider === "google" && googleId) dataMotorista.googleId = googleId;
    if (realEmail) dataMotorista.email = realEmail;
    

    const motorista = await prisma.motorista.update({
      where: { id: invite.motoristaId },
      data: dataMotorista,
      select: { id: true },
    });

    if (invite.veiculoModelo && invite.veiculoPlaca) {
      const existe = await prisma.veiculo.findFirst({
        where: { motoristaId: motorista.id, placa: invite.veiculoPlaca },
        select: { id: true },
      });
      if (!existe) {
        await prisma.veiculo.create({
          data: {
            motoristaId: motorista.id,
            modelo: invite.veiculoModelo,
            ano: invite.veiculoAno ?? "",
            placa: invite.veiculoPlaca,
            cor: "",
            quilometragem: "",
          },
        });
      }
    }

    await prisma.preCadastroMotorista.update({
      where: { token },
      data: { status: "ACCEPTED" },
    });

    return { status: "ACCEPTED" as const, motoristaId: motorista.id };
  }
}
