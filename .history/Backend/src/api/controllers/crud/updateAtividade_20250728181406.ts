import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function updateAtividade(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;
  console.log('PUT /tarefas/:id', id, req.body);
  if (!id) {
    return res.status(400).json({ error: "ID da atividade é obrigatório." });
  }

  // Mapeamento dos valores do frontend para os enums do Prisma
  let prismaStatus = status;
  if (status === 'Em Progresso' || status === 'Em Progresso' || status === 'Em_Andamento') prismaStatus = 'Em_Andamento';
  if (status === 'Concluída' || status === 'Concluida') prismaStatus = 'Concluida';
  if (status === 'Pendente') prismaStatus = 'Pendente';

  let prismaPriority = priority;
  if (priority === 'Alta') prismaPriority = 'Alta';
  if (priority === 'Média' || priority === 'Media') prismaPriority = 'Media';
  if (priority === 'Baixa') prismaPriority = 'Baixa';

  try {
    const atividade = await prisma.tarefa.update({
      where: { id },
      data: { title, description, status: prismaStatus, priority: prismaPriority },
    });
    return res.json(atividade);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao atualizar atividade." });
  }
}
