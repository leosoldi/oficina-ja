import { prisma } from "../prisma";

type CreateItem = { text: string; required?: boolean; completed?: boolean };
type CreateChecklistDTO = {
  title: string;
  description: string;
  category: string;
  isTemplate: boolean;
  assignedToMotoristaId?: string | null;
  items: CreateItem[];
};

type ConcludeItemDTO = { id: number | string; completed: boolean };
type ConcludePartDTO = { name: string; quantity: number; estimatedPrice?: number; notes?: string };
type ConcludeChecklistDTO = { notes?: string; items?: ConcludeItemDTO[]; parts?: ConcludePartDTO[] };

export class ChecklistService {
  static async criar(data: CreateChecklistDTO) {
    return prisma.checklist.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        isTemplate: data.isTemplate,
        assignedToMotoristaId: data.assignedToMotoristaId ?? null,
        items: {
          create: data.items.map((i) => ({
            text: i.text,
            required: !!i.required,
            completed: !!i.completed,
          })),
        },
      },
      include: { items: true },
    });
  }

  /**
   * Retorna a lista já com completedCount/totalCount/progressPct
   * para o card poder renderizar o progresso direto.
   */
  static async listar({ motoristaId }: { motoristaId?: string }) {
    const rows = await prisma.checklist.findMany({
      where: motoristaId ? { assignedToMotoristaId: motoristaId } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          select: { id: true, text: true, required: true, completed: true },
        },
      },
    });

    return rows.map((r) => {
      const totalCount = r.items.length;
      const completedCount = r.items.reduce((acc, it) => (it.completed ? acc + 1 : acc), 0);
      const progressPct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

      return {
        ...r,
        completedCount,
        totalCount,
        progressPct,
      };
    });
  }

  static async buscarPorId(id: string) {
    return prisma.checklist.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  /**
   * Marca itens como concluídos (+ opcionalmente status/completedAt/partsJson).
   */
  static async concluir(id: string, payload: ConcludeChecklistDTO) {
    const found = await prisma.checklist.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!found) {
      const e: any = new Error("Checklist não encontrado");
      e.code = "NOT_FOUND";
      throw e;
    }

    const updated = await prisma.$transaction(async (tx) => {
      if (Array.isArray(payload.items) && payload.items.length) {
        await Promise.all(
          payload.items.map((it) => {
            // Aceita number ou string numérica; se for UUID, remova o Number(...) e deixe string
            const numeric =
              typeof it.id === "number"
                ? it.id
                : /^\d+$/.test(String(it.id))
                ? Number(it.id)
                : null;

            return tx.checklistItem.update({
              // Se seus itens usam Int @id: use { id: numeric! }
              // Se seus itens usam String/UUID @id: troque para { id: String(it.id) }
              where: { id: numeric as number },
              data: { completed: !!it.completed },
            });
          })
        );
      }

      // Se quiser persistir peças, adicione um campo Json no schema (ex.: partsJson Json?)
      // const partsJson = Array.isArray(payload.parts) ? payload.parts : undefined;

      return tx.checklist.update({
        where: { id },
        data: {
          notes: payload.notes ?? undefined,
           status: "COMPLETED",     // descomente se existir no schema
           completedAt: new Date(),  // idem
          // partsJson,                // se criou o campo Json
        },
        include: { items: true },
      });
    });

    return updated;
  }

  static async remover(id: string) {
    const exists = await prisma.checklist.findUnique({ where: { id }, select: { id: true } });
    if (!exists) {
      const e: any = new Error("Checklist não encontrado");
      e.code = "NOT_FOUND";
      throw e;
    }

    // Se não tiver CASCADE no FK, apaga itens primeiro
    await prisma.checklistItem.deleteMany({ where: { checklistId: id } });

    await prisma.checklist.delete({ where: { id } });
  }
}
