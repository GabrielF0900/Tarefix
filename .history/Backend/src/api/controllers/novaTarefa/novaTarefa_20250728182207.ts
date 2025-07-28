//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function listarTarefas(req: Request, res: Response) {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true } } },
    });
    res.json(tarefas);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Erro ao buscar tarefas." });
  }
}

export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Aceita tanto campos do frontend antigo quanto do novo
  let { titulo, descricao, status, prioridade, dataVencimento, userId, title, description, priority, dueDate, date } = req.body;

  // Normaliza os campos
  titulo = titulo || title;
  descricao = descricao || description;
  prioridade = prioridade || priority;
  dataVencimento = dataVencimento || dueDate || date;

  //Verificando se os campos obrigatórios foram preenchidos
  if (!titulo || !descricao || !status || !prioridade || !userId) {
    res.status(400).json({ error: "Todos os campos são obrigatórios, incluindo o usuário." });
    return;
  }

  // Mapeamento dos valores do frontend para os enums do Prisma
  let prismaStatus = status;
  if (status === 'Em Progresso' || status === 'Em_Andamento') prismaStatus = 'Em_Andamento';
  if (status === 'Concluída' || status === 'Concluida') prismaStatus = 'Concluida';
  if (status === 'Pendente') prismaStatus = 'Pendente';

  let prismaPriority = prioridade;
  if (prioridade === 'Alta') prismaPriority = 'Alta';
  if (prioridade === 'Média' || prioridade === 'Media') prismaPriority = 'Media';
  if (prioridade === 'Baixa') prismaPriority = 'Baixa';

  // Converter a data de vencimento para Date, se fornecida
  let prismaDate = undefined;
  if (dataVencimento) {
    try {
      prismaDate = new Date(dataVencimento);
      if (isNaN(prismaDate.getTime())) {
        throw new Error('Data inválida');
      }
    } catch {
      return res.status(400).json({ error: "Data de vencimento inválida." });
    }
  }

  try {
    // Verifica se o usuário existe
    const usuarioExiste = await prisma.user.findUnique({ where: { id: userId } });
    if (!usuarioExiste) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }
    const novaTarefa = await prisma.tarefa.create({
      data: {
        title: titulo,
        description: descricao,
        status: prismaStatus,
        priority: prismaPriority,
        ...(prismaDate !== undefined ? { date: prismaDate } : {}),
        createdAt: new Date(),
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(novaTarefa);
    return;
  } catch (error: any) {
    console.error("Erro ao criar nova tarefa:", error);
    res.status(500).json({ error: error?.message || "Erro ao criar nova tarefa." });
    return;
  }
}