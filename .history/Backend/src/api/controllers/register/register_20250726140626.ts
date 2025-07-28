//Algoritmo de registro de usuário


import prisma from '../../../lib/prisma';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export async function registerUser(req: Request, res: Response): Promise<void> {
    //Desestruturando os dados do corpo da requisição
    const {name, email, password} = req.body;

    //Validação simples dos dados
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    //Buscando se o email já existe no banco de dados prisma.

    const emailExistente = await prisma.user.findUnique({
        where: { email }
    });

    //Se email já existir, retorna erro.
    if (emailExistente) {
        res.status(400).json({ error: 'Email já cadastrado.' });
        return;
    }


    try {
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { name, email } });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
}