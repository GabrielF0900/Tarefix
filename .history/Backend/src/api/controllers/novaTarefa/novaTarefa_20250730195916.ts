import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

type Status = "Pendente" | "Em_Andamento" | "Concluida";
type Priority = "Alta" | "Media" | "Baixa";

export async function listarTarefas(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Parâmetro userId é obrigatório." });
    }

    const tarefas = await prisma.tarefa.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    res.json(tarefas);
  } catch (error: any) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ error: error?.message || "Erro ao buscar tarefas." });
  }
}

export async function novaTarefa(req: Request, res: Response): Promise<void> {
  console.log("REQ.BODY novaTarefa:", req.body);

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
    userId,
  } = req.body;

  const finalTitle = titulo || title;
  const finalDescription = descricao || description;
  const finalPriority = (prioridade || priority || "").toString();
  const finalStatus = (status || "").toString();
  const finalDate = dataVencimento || dueDate || date;

  if (![finalTitle, finalDescription, finalPriority, finalStatus, userId].every(Boolean)) {
    res.status(400).json({
      error: "Todos os campos são obrigatórios, incluindo o userId.",
    });
    return;
  }

  // Mapeamento seguro para enums do Prisma
  const statusMap: Record<string, Status> = {
    Pendente: "Pendente",
    "Em Progresso": "Em_Andamento",
    Em_Andamento: "Em_Andamento",
    Concluída: "Concluida",
    Concluida: "Concluida",
  };

  const priorityMap: Record<string, Priority> = {
    Alta: "Alta",
    Média: "Media",
    Media: "Media",
    Baixa: "Baixa",
  };

  const prismaStatus = statusMap[finalStatus] || "Pendente";
  const prismaPriority = priorityMap[finalPriority] || "Baixa";

  let prismaDate: Date | undefined = undefined;
  if (finalDate) {
    const d = new Date(finalDate);
    if (isNaN(d.getTime())) {
      res.status(400).json({ error: "Data de vencimento inválida." });
      return;
    }
    prismaDate = d;
  }

  try {
    const usuarioExiste = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!usuarioExiste) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const novaTarefa = await prisma.tarefa.create({
      data: {
        title: finalTitle,
        description: finalDescription,
        status: prismaStatus,
        priority: prismaPriority,
        ...(prismaDate ? { date: prismaDate } : {}),
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(novaTarefa);
  } catch (error: any) {
    console.error("Erro ao criar nova tarefa:", error);
    res.status(500).json({ error: error?.message || "Erro ao criar nova tarefa." });
  }
}
