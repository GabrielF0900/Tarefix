//Algoritmo de registro de usuário

import prisma from "../../../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    //Desestruturando os dados do corpo da requisição
    const { name, email, password } = req.body;

    //Validação simples dos dados
    if (!name || !email || !password) {
      res.status(400).json({ error: "Todos os campos são obrigatórios." });
      return;
    }

    //Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Formato de e-mail inválido!" });
      return;
    }

    //Validação de senha
    if (password.length < 6) {
      res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 6 caracteres." });
      return;
    }

    //Buscando se o email já existe no banco de dados prisma.
    const emailExistente = await prisma.user.findUnique({
      where: { email },
    });

    //Se email já existir, retorna erro.
    if (emailExistente) {
      res.status(400).json({ error: "Email já cadastrado." });
      return;
    }

    //Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    //Criando o usuario no banco de dados.
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //Retornando o usuário criado
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("❌ Erro crítico ao registrar:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    const errorCode = (error as any)?.code;
    console.error("Código do erro:", errorCode);

    res.status(500).json({
      error: "Erro ao registrar usuário.",
      details: errorMessage,
      code: errorCode,
    });
  }
}
