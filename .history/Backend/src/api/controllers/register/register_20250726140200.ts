//Algoritmo de registro de usuário

import { Request, Response } from 'express';

export async function registerUser(req: Request, res: Response): Promise<void> {
    //Desestruturando os dados do corpo da requisição
    const {name, email, password} = req.body;

    //Validação simples dos dados
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    try {
        //Lógica para salvar os dados em banco de dados ficticio.
        fakeDataBase.push({ name, email, password });
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { name, email } });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
}