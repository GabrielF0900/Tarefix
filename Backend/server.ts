import express, { Request, Response } from "express";
import routes from "./src/api/routes/routes";
import cors from "cors"; //Essa importação permite fazer com que o navegador bloqueie requisições de outros domínios, o que é importante para segurança.
import prisma from "./src/lib/prisma";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://tarefix-frontend-7id8.onrender.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);

// Rota GET básica para testar o servidor
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor rodando com Express + TypeScript!");
});

// Health check com diagnóstico do banco
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check - DB error:", error);
    res.status(500).json({
      status: "error",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
});

// Usando as rotas definidas
app.use("/api/auth", routes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
  console.log(`📊 Check health: http://localhost:${port}/api/health`);
});
