//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";
import prisma from "../../../lib/prisma";


export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Desestruturação dos dados da requisição
  const { titulo, descricao, status, prioridade, dataVencimento } = req.body;

  //Verificando se os campos obrigatórios foram preenchidos
  if (!titulo || !descricao || !status || !prioridade) {
    res.status(400).json({ error: "Todos os campos são obrigatórios." });
    return;
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
      }
    });

    // Retornando a nova tarefa criada
    res.status(201).json(novaTarefa);
  } catch (error: any) {
    console.error("Erro ao criar nova tarefa:", error);
    res.status(500).json({ error: error?.message || "Erro ao criar nova tarefa." });
  }
}