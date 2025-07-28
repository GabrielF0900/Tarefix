  console.log('DELETE /tarefas/:id', id);
import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function deleteAtividade(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID da atividade é obrigatório." });
  }
  try {
    await prisma.tarefa.delete({
      where: { id },
    });
    return res.json({ message: "Atividade deletada com sucesso." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao deletar atividade." });
  }
}
