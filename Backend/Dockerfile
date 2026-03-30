# Dockerfile para Backend Node.js (Express + Prisma)

FROM node:20-alpine

WORKDIR /app

# Instala dependências do Node.js
COPY package*.json ./
RUN npm install --production=false

# Copia código e Prisma
COPY prisma ./prisma
RUN npx prisma generate
COPY . .

# Build do projeto
RUN npm run build

RUN apk add --no-cache postgresql-client

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "dist/server.js"]
