import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function readAtividade(req: Request, res: Response) {
  try {
    const atividades = await prisma.tarefa.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true } } },
    });
    return res.json(atividades);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao buscar atividades." });
  }
}
