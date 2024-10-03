FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer toutes les dépendances (production + développement)
# RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn install --production --frozen-lockfile && yarn cache clean

RUN yarn add -D typescript


# Copier le dossier prisma pour générer le client
COPY src/prisma ./prisma/

# Copier le reste du code
COPY . .

# Générer le client Prisma et compiler TypeScript
RUN npx prisma generate && yarn build

RUN yarn remove typescript

# Étape 2 : Production (image finale sans devDependencies)
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json /app/yarn.lock ./

# Exposer le port
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "dist/index.js"]