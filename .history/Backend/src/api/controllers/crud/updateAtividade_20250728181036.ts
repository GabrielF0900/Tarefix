  console.log('PUT /tarefas/:id', id, req.body);
import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function updateAtividade(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID da atividade é obrigatório." });
  }
  try {
    const atividade = await prisma.tarefa.update({
      where: { id },
      data: { title, description, status, priority },
    });
    return res.json(atividade);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao atualizar atividade." });
  }
}
