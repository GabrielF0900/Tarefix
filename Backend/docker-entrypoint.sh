#!/bin/sh
# filepath: c:\Users\gabri\OneDrive\Desktop\Projetos\Tarefix\Backend\docker-entrypoint.sh

# Inicializa o banco de dados Postgres (se ainda não inicializado)
if [ ! -s "/var/lib/postgresql/data/PG_VERSION" ]; then
  su-exec postgres initdb -D /var/lib/postgresql/data
fi

# Inicia o Postgres em background
su-exec postgres pg_ctl -D /var/lib/postgresql/data -o "-c listen_addresses='*'" -w start

# Espera o banco subir
sleep 5

# Executa as migrations do Prisma (opcional)
npx prisma migrate deploy

# Inicia o backend
node dist/server.js