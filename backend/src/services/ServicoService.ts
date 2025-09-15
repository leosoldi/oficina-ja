// src/services/ServicoService.ts
import { prisma } from "../prisma";

export class ServicoService {
  static async criar(data: any) {
    return await prisma.servicoOferecido.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: parseFloat(data.preco),
        duracao: data.duracao,
        categoria: data.categoria,
        ativo: data.ativo ?? true,
        oficinaId: data.oficinaId,
      },
    });
  }

static async listarPorOficina(oficinaId: string) {
  return await prisma.servicoOferecido.findMany({
    where: { oficinaId },
    orderBy: { nome: "asc" },
  });
}


  static async atualizar(id: number, data: any) {
    return await prisma.servicoOferecido.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: parseFloat(data.preco),
        duracao: data.duracao,
        categoria: data.categoria,
        ativo: data.ativo,
      },
    });
  }

  static async deletar(id: number) {
    return await prisma.servicoOferecido.delete({
      where: { id },
    });
  }
}
