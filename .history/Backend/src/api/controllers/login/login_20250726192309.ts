import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { userInfo } from 'os';

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Formato do e-mail inválido!' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
      return;
    }
    //Comparando senha com bcrypt no banco de dados.
    const senhaComparada = await bcrypt.compare(password, user.

    // Aqui futuramente você pode consultar o banco e comparar senha com bcrypt
    // const user = await db.findUserByEmail(email);
    // const senhaValida = await bcrypt.compare(password, user.password);

    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({ error: 'Erro interno no servidor. Tente novamente mais tarde.' });
  } finally {
    // Opcional: liberar recursos, logs, etc.
    console.log('Requisição de login finalizada.');
  }
}
