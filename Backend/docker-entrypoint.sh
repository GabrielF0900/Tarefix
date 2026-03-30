#!/bin/sh

set -e

# Verifica se a variável de ambiente DATABASE_URL está definida
: "${DATABASE_URL:?DATABASE_URL environment variable is required}"

# Define variáveis de ambiente padrão
NODE_ENV=${NODE_ENV:-production}
PRISMA_MIGRATE=${PRISMA_MIGRATE:-}

wait_for_db() {
  echo "Waiting for database to be ready..."
  until echo '\q' | psql "$DATABASE_URL" > /dev/null 2>&1; do
      echo "Database is not ready yet. Retrying in 2 seconds..."
    sleep 2
  done
  echo "Database is ready!"
}

run_migrations() {
    mode="$1"
    case "$mode" in
        "deploy")
            echo "Running Prisma migrations in production"
            npx prisma migrate deploy
            ;;
        "dev")
            echo "Running Prisma migrations in development"
            npx prisma migrate dev --name init
            ;;
        "push")
            echo "Sychronizing Prisma schema without generating migration"
            npx prisma db push
            ;;
        "none")
            echo "Skipping migrations."
            ;;
    esac
}

if [ -n "$PRISMA_MIGRATE"]; then
 MIGRATE_MODE="$PRISMA_MIGRATE"
else
  if [ "$NODE_ENV" = "production" ]; then
    MIGRATE_MODE="deploy"
  else
    MIGRATE_MODE="push"
  fi
fi

if [ "$MIGRATE_MODE" != "none" ]; then
  wait_for_db
  run_migrations "$MIGRATE_MODE"
else 
  echo "Migrations are disabled. Skipping database setup."
fi

# Inicia a aplicação
exec "$@"
