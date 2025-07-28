//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";
import prisma from "../../../lib/prisma";


export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Desestruturação dos dados da requisição
  // Recebe os dados do body, mas já converte para os nomes esperados pelo banco
  const { titulo, descricao, status, prioridade, dataVencimento } = req.body;

  //Verificando se os campos obrigatórios foram preenchidos
  if (!titulo || !descricao || !status || !prioridade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        title: titulo,
        description: descricao,
        status,
        priority: prioridade,
        dueDate: dataVencimento ? new Date(dataVencimento) : null,
        createdAt: new Date(),
      },
    });
    return res.status(201).json(novaTarefa);
  } catch (error: any) {
    console.error("Erro ao criar nova tarefa:", error);
    return res.status(500).json({ error: error?.message || "Erro ao criar nova tarefa." });
  }
}