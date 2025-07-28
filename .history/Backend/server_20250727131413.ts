import express, { Request, Response } from 'express';
import routerr from './src/api/routes/routes';
import routes from './src/api/routes/routes';
import cors from 'cors'; //Essa importação permite fazer com que o navegador bloqueie requisições de outros domínios, o que é importante para segurança.

const app = express();
const port = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());
app.use(cors()); // Habilita o CORS para todas as rotas.

// Rota GET básica para testar o servidor
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor rodando com Express + TypeScript!');
});

// Usando as rotas definidas
app.use('/api', routes);


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
