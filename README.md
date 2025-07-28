
````markdown
# 📝 Tarefix

**Tarefix** é um sistema fullstack para gerenciamento de tarefas. Desenvolvido com **React**, **Tailwind CSS** e **Vite** no frontend, e **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, **PostgreSQL** e **Docker** no backend.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### 🔸 Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Bcrypt (hash de senhas)
- Docker (containerização do backend e banco)

---

## ✅ Funcionalidades

- Cadastro e login de usuários
- Autenticação segura (bcrypt)
- CRUD completo de tarefas
- Marcação de tarefas concluídas
- Interface responsiva e moderna
- Banco de dados persistente via PostgreSQL
- Backend containerizado com Docker

---

## 🧭 Como rodar o projeto localmente

### ⚙️ Pré-requisitos

- Node.js
- Docker

---

## 🐳 Backend

1. Acesse a pasta do backend:

```bash
cd Backend
````

2. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

> Configure as variáveis de ambiente conforme necessário (ex: `DATABASE_URL`).

3. Suba o banco e o backend com Docker (caso tenha `docker-compose.yml`):

```bash
docker-compose up -d
```

> Se você não estiver usando `docker-compose.yml`, rode manualmente o banco em um container ou localmente.

4. Instale as dependências:

```bash
npm install
```

5. Rode as migrações do Prisma:

```bash
npx prisma migrate dev
```

6. Inicie o backend:

```bash
npm run dev
```

---

## 🌐 Frontend

1. Acesse a pasta do frontend:

```bash
cd Frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:5173
```

---

## 🗂 Estrutura do Projeto

```
tarefix/
├── Backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── generated/
│   │   ├── lib/
│   │   └── prisma.ts
│   ├── Dockerfile
│   ├── .env / .env.example
│   └── server.ts
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css / App.css
│   ├── index.html
│   └── vite.config.ts
│
└── README.md
```

---

## 🔧 Próximas Melhorias

* Autenticação JWT
* Middleware de proteção de rotas
* Sistema de recuperação de senha por e-mail
* Notificações em tempo real com WebSockets
* Testes unitários e integração (Jest / Supertest)
* Interface mobile-first refinada

---

## 🤝 Contribuições

Contribuições são super bem-vindas!
Sinta-se livre para abrir uma *issue* ou enviar um *pull request*.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 📬 Contato

Gabriel Falcão
[📧 gabrielcfonline0900@gmail.com](mailto:gabrielcfonline0900@gmail.com)

---

**Organize sua produtividade com o Tarefix!** 🚀
