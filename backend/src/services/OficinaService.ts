import { prisma } from "../prisma";

export class OficinaService {
  // Normaliza arrays vindos via multipart:
  // - Suporta "campo[]" => req.body.campo é array
  // - Suporta "campo[0]" ... "campo[n]" => espalhados no body
  private static toArrayFromBody(body: any, baseKey: string): string[] {
    if (!body) return [];
    const direct = body[baseKey];
    if (Array.isArray(direct)) {
      return direct.filter((v) => typeof v === "string" && v.trim() !== "");
    }
    // Coleta campo[0], campo[1], ...
    const collected = Object.keys(body)
      .filter((k) => k.startsWith(`${baseKey}[`))
      .sort() // garante ordem
      .map((k) => body[k])
      .filter((v) => typeof v === "string" && v.trim() !== "");
    return collected;
  }

  static async atualizar(id: string, data: any, avatar?: string) {
    // Converte/normaliza arrays (funciona com [] e com [0], [1]...):
    const especialidades = this.toArrayFromBody(data, "especialidades");
    const certificacoes  = this.toArrayFromBody(data, "certificacoes");

    // Monta objeto de atualização com segurança
    // (só altera relações se veio algo no request)
    const updateData: any = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      whatsapp: data.whatsapp,
      cnpj: data.cnpj,
      endereco: data.endereco,
      cep: data.cep,
      descricao: data.descricao,
      horarioSegSexInicio: data.horarioSegSexInicio,
      horarioSegSexFim: data.horarioSegSexFim,
      horarioSabadoInicio: data.horarioSabadoInicio,
      horarioSabadoFim: data.horarioSabadoFim,
      horarioDomingo: data.horarioDomingo,
    };

    if (typeof avatar === "string") {
      updateData.avatar = avatar; // só seta se veio arquivo novo
    }

    // **NÃO** mexe em serviços aqui (removido desta tela)

    if (especialidades.length > 0) {
      updateData.especialidades = {
        deleteMany: {}, // limpa e recria
        create: especialidades.map((marca: string) => ({ marca })),
      };
    }

    if (certificacoes.length > 0) {
      updateData.certificacoes = {
        deleteMany: {},
        create: certificacoes.map((titulo: string) => ({ titulo })),
      };
    }

    return await prisma.oficina.update({
      where: { id },
      data: updateData,
      include: {
        servicos: true,
        especialidades: true,
        certificacoes: true,
      },
    });
  }

  static async buscarPorId(id: string) {
    return await prisma.oficina.findUnique({
      where: { id },
      include: {
        servicos: true,
        especialidades: true,
        certificacoes: true,
      },
    });
  }

  static async buscarProximas(latitude: number, longitude: number, servico?: string) {
    const oficinas: any = await prisma.$queryRawUnsafe(`
      SELECT * ,
        (6371 * acos(
          cos(radians(${latitude})) *
          cos(radians(latitude)) *
          cos(radians(longitude) - radians(${longitude})) +
          sin(radians(${latitude})) *
          sin(radians(latitude))
        )) AS distancia
      FROM "Oficina"
      ORDER BY distancia ASC
      LIMIT 20
    `);

    if (servico) {
      return oficinas.filter((oficina: any) =>
        oficina.servicos?.some((s: any) => s.nome === servico)
      );
    }

    return oficinas;
  }
}
