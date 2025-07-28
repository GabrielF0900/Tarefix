import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Rota GET básica para testar o servidor
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor rodando com Express + TypeScript!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
