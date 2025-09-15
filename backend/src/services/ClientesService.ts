import { prisma } from "../prisma";

type UpsertDTO = {
  nome: string;
  email?: string | null;
  telefone?: string | null;
  veiculoModelo?: string | null;
  veiculoAno?: string | null;
  veiculoPlaca?: string | null;
};

export class ClientesService {
  static async listar(oficinaId: string, search: string) {
    const where: any = { oficinaId };
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { telefone: { contains: search } },
        { veiculoPlaca: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    return prisma.preCadastroMotorista.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, nome: true, telefone: true, email: true,
        veiculoModelo: true, veiculoAno: true, veiculoPlaca: true,
        status: true, createdAt: true,
      }
    });
  }

  static async criar(oficinaId: string, dto: UpsertDTO) {
    if (!dto?.nome) throw new Error("Nome é obrigatório");
    return prisma.preCadastroMotorista.create({
      data: {
        oficinaId,
        nome: dto.nome,
        email: dto.email ?? null,
        telefone: dto.telefone ?? null,
        veiculoModelo: dto.veiculoModelo ?? null,
        veiculoAno: dto.veiculoAno ?? null,
        veiculoPlaca: dto.veiculoPlaca ?? null,
        // status default = PENDING (no schema)
        token: cryptoRandom(24),                // se quiser convidar depois
        expiresAt: new Date(Date.now() + 48*3600*1000),
      },
      select: {
        id: true, nome: true, telefone: true, email: true,
        veiculoModelo: true, veiculoAno: true, veiculoPlaca: true,
        status: true, createdAt: true,
      }
    });
  }

  static async atualizar(oficinaId: string, id: string, dto: UpsertDTO) {
    const record = await prisma.preCadastroMotorista.findFirst({ where: { id, oficinaId } });
    if (!record) throw new Error("Cliente não encontrado para esta oficina");
    return prisma.preCadastroMotorista.update({
      where: { id },
      data: {
        nome: dto.nome,
        email: dto.email ?? null,
        telefone: dto.telefone ?? null,
        veiculoModelo: dto.veiculoModelo ?? null,
        veiculoAno: dto.veiculoAno ?? null,
        veiculoPlaca: dto.veiculoPlaca ?? null,
      },
      select: {
        id: true, nome: true, telefone: true, email: true,
        veiculoModelo: true, veiculoAno: true, veiculoPlaca: true,
        status: true, createdAt: true,
      }
    });
  }

  static async excluir(oficinaId: string, id: string) {
    const record = await prisma.preCadastroMotorista.findFirst({ where: { id, oficinaId } });
    if (!record) throw new Error("Cliente não encontrado para esta oficina");
    await prisma.preCadastroMotorista.delete({ where: { id } });
  }
}

// util simples
function cryptoRandom(bytes: number) {
  return require("crypto").randomBytes(bytes).toString("hex");
}
