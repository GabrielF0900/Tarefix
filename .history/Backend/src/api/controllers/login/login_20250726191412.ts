//Algoritmo de login


import { Request, Response } from 'express';


export async function login(req: Request, res: Response): Promise<void> {
    //Desestruturando os chunks do corpo da requisição.

    const {email, password} = req.body;

    //Validando se o email e a senha foram informados.
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
    }
    
}