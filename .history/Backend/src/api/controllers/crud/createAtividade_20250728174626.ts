import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function createAtividade(req: Request, res: Response) {
  try {
    const { title, description, status, priority, userId } = req.body;
    if (!title || !description || !status || !priority || !userId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    const atividade = await prisma.tarefa.create({
      data: {
        title,
        description,
        status,
        priority,
        user: { connect: { id: userId } },
        createdAt: new Date(),
      },
    });
    return res.status(201).json(atividade);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro ao criar atividade." });
  }
}
