//Algoritmo de criação de nova tarefa.

import { Request, Response } from "express";

export async function novaTarefa(req: Request, res: Response): Promise<void> {
  // Desestruturação dos dados da requisição
  const {titulo, descricao, status, prioridade, }
}