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
    //Regex para validar o email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Validando o formato do email.
    if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Formato do e-mail inválido!' });
        return;
    }

    //Validando tamanho da senha.
    if (password.length < 6) {
        res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
        return;
    }

    //Se tudo estiver correto, retorna uma mensagem de sucesso.
}