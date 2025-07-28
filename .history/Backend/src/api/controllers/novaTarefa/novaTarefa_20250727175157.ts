//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";
import prisma from "../../../lib/prisma";



export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Desestruturação dos dados da requisição
  const {titulo, descricao, status, prioridade, dataVencimento} = req.body;

  //Verificando se os campos obrigatórios foram preenchidos
  if (!titulo || !descricao || !status || !prioridade) {
    res.status(400).json({ error: "Todos os campos são obrigatórios." });
    return;
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        status,
        prioridade,
        dataVencimento
      }
    })
  } catch (error) {
    
  }
}