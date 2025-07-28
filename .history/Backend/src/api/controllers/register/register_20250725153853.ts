//Algoritmo de registro de usuário


import { Request, Response } from 'express';

export async function registerUser(req: Request, res: Response): Promise<void> {
    //Desestruturando os dados do corpo da requisição
    const {name, email, password} = req.body;
}