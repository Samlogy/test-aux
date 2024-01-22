# Chadopt

Chadopt'. Chadopt' est l'équivalent du celèbre site `https://www.adopteunmec.com/` mais pour adopter un chat.

## Stack Technique

1. **Front-end:** React 18+, Typescript 4+, React query 5+
2. **Back-end:** Node.js 20+, Express 4+, Typescript 4+, Postgresql 16+, Prisma 5+
3. yarn 1.2+

## Code Structure

1. **Front-end:**

```├── index.html
   ├── package.json
   ├── public
   │   └── logo.jpg
   ├── README.md
   ├── src
   │   ├── App.tsx
   │   ├── components
   │   │   ├── Card.tsx
   │   │   ├── CatDelete.tsx
   │   │   ├── CatDetails.tsx
   │   │   ├── CustomDrawer.tsx
   │   │   ├── CustomModal.tsx
   │   │   ├── ErrorBoundary.tsx
   │   │   ├── FavouriteButton.tsx
   │   │   ├── Filter.tsx
   │   │   ├── index.ts
   │   │   ├── Layout.tsx
   │   │   ├── NavBar.tsx
   │   │   ├── ProtectedPage.tsx
   │   │   └── View.tsx
   │   ├── lib
   │   │   ├── api.ts
   │   │   ├── functions.ts
   │   │   └── interfaces.ts
   │   ├── main.tsx
   │   ├── pages
   │   │   ├── CatsList.tsx
   │   │   ├── index.ts
   │   │   ├── Login.tsx
   │   │   └── NotFound.tsx
   │   └── vite-env.d.ts
   ├── theme
   │   └── index.ts
   ├── tsconfig.json
   ├── tsconfig.node.json
   ├── vite.config.ts
   ├── vite.config.ts.timestamp-1705743150628-f12def4d7be59.mjs
   └── yarn.lock
```

2. **Back-end:**

```├── controllers
   │   ├── cat.controller.ts
   │   ├── errorController.ts
   │   └── user.controller.ts
   ├── index.ts
   ├── middlewares
   │   └── auth.ts
   ├── package.json
   ├── prisma
   │   ├── migrations
   │   │   ├── 20240120154328_migration_1
   │   │   │   └── migration.sql
   │   │   └── migration_lock.toml
   │   └── schema.prisma
   ├── README.md
   ├── routes
   │   ├── cat.route.ts
   │   └── user.route.ts
   ├── tsconfig.json
   ├── utils
   │   ├── appError.ts
   │   ├── corsOptions.ts
   │   └── security.ts
   └── yarn.lock
```

## Database Schema

**Table: Cat**

- **id** (integer, primary key)
- **name** (string)
- **picture** (string)
- **age** (integer)
- **description** (string)
- **race** (string)
- **town** (string)
- **status** (string)
- **sex** (string)

**Table: User**

- **id** (integer, primary key)
- **email** (string)
- **password** (string)
- **isAdmin** (string)

**Table: userCat**

- **userId** (integer, primary key)
- **catId** (integer, primary key)

- relation n..n: 1 user peut adopter plusieurs chats, et un chat peut être adopté par plusieurs users

## Geting Started

1. **pré-requis:**

- installer nodejs: 20+ lts + npm 10+ version associé: `https://nodejs.org/en/download/current`
- installer yarn en global: `https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable`

2. **DEV-Env:**

- installer les dépendances du projet (côté back): `cd back && yarn`
- lancer l'api: yarn dev

3. **PROD-Env:**

- yarn global add pm2
- installer les dépendances du projet (côté back): `cd back && yarn`
- lancer l'api: yarn start

## Font-end

**Liste des Routes:**

- acceuil: `/`
- chats: `/cats`

## Back-end

- **pré-recquis:**

- install postgresql: `https://www.linuxbuzz.com/how-to-install-postgresql-on-ubuntu/`
- on va utiliser prisma ORM pour contacter notre base de données: `https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql`
- identifiants bdd: username: postgres, password: password, bdd: test_db_aux, port: 5432

- **Liste des Endpoints:**

1. GET `/`: Charger l'ensemble des chat.
2. GET `/` filters: filter les chats.
3. GET `/:id`: charger les données d'un seul chat par ID.
4. POST `/`: ajouter un nouveau chat.
5. PUT `/:id`: modifier un modifier chat déjà existant par ID.
6. DELETE `/:id`: supprimer un chat par ID.

cat: {
name,
age,
race,
sex,
town,
description,
picture,
status
}
