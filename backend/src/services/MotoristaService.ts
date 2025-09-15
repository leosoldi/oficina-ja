import { prisma } from "../prisma";

export class MotoristaService {
  static async buscarPorId(id: string) {
    return await prisma.motorista.findUnique({ where: { id } });
  }

  static async atualizar(id: string, data: any, avatar?: string) {
    const payload = {
      ...data,
      ...(avatar && { avatar })
    };

    return await prisma.motorista.update({
      where: { id },
      data: payload,
    });
  }
}
