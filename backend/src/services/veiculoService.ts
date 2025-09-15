import { prisma } from "../prisma";

export const veiculoService = {
 async criar(data: any) {
    const isValidDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return (
        !isNaN(date.getTime()) &&
        /^\d{4}-\d{2}-\d{2}$/.test(dateStr) // verifica formato ISO válido
      );
    };

    return await prisma.veiculo.create({
      data: {
        modelo: data.modelo,
        placa: data.placa,
        cor: data.cor,
        ano: String(data.ano),
        quilometragem: String(data.km),
        ultimoServico: isValidDate(data.dataUltimoServico)
          ? new Date(data.dataUltimoServico)
          : undefined, // ou jogue um erro aqui se for obrigatório
        motoristaId: data.motoristaId,
      },
    });
  },
  async listarPorMotorista(motoristaId: string) {
    return await prisma.veiculo.findMany({
      where: { motoristaId },
      orderBy: { ultimoServico: "desc" },
    });
  },

  async deletar(id: string) {
    return await prisma.veiculo.delete({ where: { id } });
  },

  async atualizar(id: string, data: any) {
    return await prisma.veiculo.update({ where: { id }, data });
  },
};
