# Changelog

## Politica de Baseline

- Baseline historica: v1.0.0
- Baseline operacional atual: v1.3.0
- Release mais recente: v1.3.2

## Mapa de renumeração de tags

- v1.0.0: (Baseline) versão inicial do projeto
- v1.1.0: melhorias iniciais de integração frontend e backend
- v1.2.0: infraestrutura, Docker e build
- v1.2.1: estabilização de configuração da API
- v1.3.0: (Baseline) padronização de rotas, isolamento por usuário e migração Prisma
- v1.3.1: melhorias de responsividade em telas do frontend
- v1.3.2: documentacao tecnica ampliada e workflow de integracao continua

## v1.3.2

Titulo: Documentacao tecnica e integracao continua

### Features

- feat(docs): reestruturacao completa do README com visao geral, arquitetura, requisitos funcionais e nao funcionais, stack e guia de execucao
- feat(ci): adicao de workflow de integracao continua no GitHub Actions para frontend e backend
- feat(repo): adicao de .gitignore na raiz para evitar versionamento de artefatos locais e de build

### Chores

- chore(backend): atualizacao do package-lock com TypeScript e ajustes de dependencias de build
- chore(gitignore): inclusao de dist no [Backend/.gitignore](Backend/.gitignore)


## v1.3.1

Titulo: Melhorias de responsividade das interfaces

### Features

- feat(ui): ajustes responsivos nas telas de Login e Register
- feat(ui): ajustes responsivos no modal de Nova Tarefa
- feat(ui): melhorias de adaptacao mobile na Dashboard
- feat(ui): refinamentos de responsividade na tela de atualizar atividade

### Fixes

- fix(layout): melhor distribuicao de espacamento em breakpoints pequenos
- fix(typography): ajuste de tamanhos de fonte para legibilidade em mobile
- fix(actions): melhor comportamento de botoes e controles em telas estreitas

## v1.3.0

Título: Rotas padronizadas e tarefas por usuário

### Features

- feat(api): padroniza prefixos de rotas de autenticação e tarefas
- feat(auth): persistência de userId no login
- feat(tasks): listagem de tarefas filtrada por usuário
- feat(db): adiciona migration inicial Prisma com enums, tabelas e relacionamento

### Fixes

- fix(frontend): atualiza endpoints de listagem, edição e exclusão
- fix(backend): reforça validações na criação e listagem de tarefas
- fix(types): normaliza status e prioridade de ponta a ponta

### Refactor

- refactor(routes): reorganiza montagem de rotas entre server e router
- refactor(tasks): remove redundâncias e melhora mapeamento de dados

### Breaking Changes

- rotas antigas podem quebrar clientes não atualizados
- listagem de tarefas requer userId válido no fluxo novo

## v1.2.1

Título: Estabilização de configuração da API

### Fixes

- fix(frontend): estabiliza base URL da API para produção
- fix(config): revisa estratégia entre variável de ambiente e URL fixa
- fix(gitignore): adiciona .env no ignore do frontend

### Chores

- chore(deps): adiciona tipagens Node no frontend

## v1.2.0

Título: Infra e Dockerização inicial

### Features

- feat(infra): adiciona estrutura de containerização para backend, frontend e banco
- feat(frontend): adiciona Nginx com fallback para SPA
- feat(build): adiciona build TypeScript no backend
- feat(prisma): adiciona geração do Prisma Client no build

### Chores

- chore(docker): adiciona dockerignore para backend e frontend

## v1.1.0

Título: Melhorias iniciais de integração frontend e backend

### Features

- feat(frontend): melhoria no modal de edição de tarefa
- feat(frontend): melhoria no modal de criação de tarefa
- feat(frontend): ajustes de exibição e atualização no dashboard

### Fixes

- fix(date): tratamento de data de vencimento para reduzir inconsistência por fuso
- fix(enum): normalização de status e prioridade entre frontend e backend
- fix(session): adição de logout no dashboard

### Notes

- foco em consistência de payload e experiência de uso nas telas de tarefa

## v1.0.0

Título: Baseline inicial do projeto

### Features

- feat(project): estrutura inicial do projeto Tarefix
- feat(frontend): base de páginas e fluxo inicial de autenticação e tarefas
- feat(backend): base de API para autenticação e CRUD de tarefas

### Notes

- release de fundação do projeto