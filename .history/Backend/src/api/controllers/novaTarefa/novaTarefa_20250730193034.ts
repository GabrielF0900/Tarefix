//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

export async function listarTarefas(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    const where = userId ? { userId: String(userId) } : {};
    const tarefas = await prisma.tarefa.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true } } },
    });
    res.json(tarefas);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Erro ao buscar tarefas." });
  }
}


export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Log do corpo recebido para debug
  console.log('REQ.BODY novaTarefa:', req.body);
  // Normalização dos campos vindos do frontend
  const {
    titulo,
    title,
    descricao,
    description,
    status,
    prioridade,
    priority,
    dataVencimento,
    dueDate,
    date,
    userId
  } = req.body;

  // Usa o valor disponível para cada campo
  const finalTitle = titulo || title;
  const finalDescription = descricao || description;
  const finalPriority = (prioridade || priority || '').toString();
  const finalStatus = (status || '').toString();
  const finalDate = dataVencimento || dueDate || date;

  // Validação dos campos obrigatórios
  if (![finalTitle, finalDescription, finalPriority, finalStatus, userId].every(Boolean)) {
    return void res.status(400).json({ error: "Todos os campos são obrigatórios, incluindo o usuário." });
  }

  // Mapeamento dos enums para o formato do Prisma
  const statusMap: Record<string, string> = {
    'Pendente': 'Pendente',
    'Em Progresso': 'Em_Andamento',
    'Em_Andamento': 'Em_Andamento',
    'Concluída': 'Concluida',
    'Concluida': 'Concluida'
  };
  const priorityMap: Record<string, string> = {
    'Alta': 'Alta',
    'Média': 'Media',
    'Media': 'Media',
    'Baixa': 'Baixa'
  };
  const prismaStatus: string = statusMap[finalStatus] || 'Pendente';
  const prismaPriority: string = priorityMap[finalPriority] || 'Baixa';

  // Conversão da data
  let prismaDate: Date | undefined = undefined;
  if (finalDate) {
    const d = new Date(finalDate);
    if (!isNaN(d.getTime())) prismaDate = d;
    else return void res.status(400).json({ error: "Data de vencimento inválida." });
  }

  try {
    // Verifica se o usuário existe
    const usuarioExiste = await prisma.user.findUnique({ where: { id: userId } });
    if (!usuarioExiste) {
      return void res.status(404).json({ error: "Usuário não encontrado." });
    }
    const novaTarefa = await prisma.tarefa.create({
      data: {
        title: finalTitle,
        description: finalDescription,
        status: prismaStatus as any,
        priority: prismaPriority as any,
        ...(prismaDate ? { date: prismaDate } : {}),
        createdAt: new Date(),
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error: any) {
    console.error("Erro ao criar nova tarefa:", error);
    res.status(500).json({ error: error?.message || "Erro ao criar nova tarefa." });
  }
}

// (bloco duplicado removido)