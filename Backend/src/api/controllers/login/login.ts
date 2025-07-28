import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Formato de e-mail inválido!' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    // 1. Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado.' });
      return;
    }

    // 2. Comparar senha com a hash do banco
    const senhaCorreta = await bcrypt.compare(password, user.password);

    if (!senhaCorreta) {
      res.status(401).json({ error: 'Senha incorreta.' });
      return;
    }

    // 3. Se tudo estiver certo
    res.status(200).json({ message: 'Login realizado com sucesso!' 
      , user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  } finally {
    console.log('Requisição de login finalizada.');
  }
}
