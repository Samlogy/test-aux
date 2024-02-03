# Chadopt project

Réalisation d'une aplication web pour l'adoption de chats en ligne, celon la race, vile, sexe.
Chadopt'. Chadopt' est l'équivalent du celèbre site `https://www.adopteunmec.com/` mais pour adopter un chat.

## Stack Technique

1. **Front-end:** React 18+, Typescript 4+
2. **Back-end:** Node.js 18+, Express 4+, Typescript 4+, Postgresql 16+, Prisma 5+
3. yarn 1.2+

##  pré-requis

Pour le lancement de l'app front et back il est necessaire d'installer dépendance suivante:
**installation:**

- nodejs/npm:

```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

node --version
```

- postgresql: <https://computingforgeeks.com/how-to-install-postgresql-16-on-debian/>
- pm2: `sudo npm i pm2 -g`
- yarn: `npm install --global yarn`
- typescript: `npm install -g typescript`

##  Getting started

##  Fonctionnalitées

- **authentification**:
  - se connecter en tant que: admin / visiteur
  - se déconnecter
- **chat**:
  - charger l'ensemble des chats avec pagination côté serveur (VISITEUR)
  - filtrer l'ensemble des chats avec pagination côté serveur (filtres: nom, statut, sexe) (VISITEUR)
  - ajouter un chat (ADMIN)
  - modifier un chat par id (ADMIN)
  - supprimer un chat par id (ADMIN)
  - mettre / retirer un ou plusieurs chats en favoris (VISITEUR)
  - lister la liste des chats en favoris (VISITEUR)

## Front

- **lancer en dev mode**:

```bash
cd front
yarn
yarn dev
```

- **lancer en production mode**:

```bash
cd front
yarn build
npm install -g serve
serve dist
```

**route:**

- `/`: page principale de l'app
- `/login`: page login
- `*`: page 404 not found

**librairies:**

- react-router-dom: mettre en place du routing côté front
- react-icons: pour l'usage des icons
- react / react-dom: react
- typescript: pour typé le code javasript/react
- chakra-ui: pour le ui de notre app
- zustand: la gestion du state global de l'app
- react-error-boundaries: affiche un page par défaut en d'erreur, pour éviter d'afficher l"ecran de crash de l'app

**technologies:**

- React: 18+
- TypeScript: 4+

**structure du code:**
├── index.html
├── package.json
├── public
│   └── images
│   ├── favicon.ico
│   └── logo.jpg
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── Card.tsx
│   │   ├── CatAddEdit.tsx
│   │   ├── CatDelete.tsx
│   │   ├── CatDetails.tsx
│   │   ├── CustomDrawer.tsx
│   │   ├── CustomModal.tsx
│   │   ├── DisplayFilters.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FallBackPage.tsx
│   │   ├── FavouriteButton.tsx
│   │   ├── Filter.tsx
│   │   ├── HandleImage.tsx
│   │   ├── index.ts
│   │   ├── InputField.tsx
│   │   ├── Layout.tsx
│   │   ├── Logo.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── NavBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── SelectField.tsx
│   │   ├── TextField.tsx
│   │   └── View.tsx
│   ├── lib
│   │   ├── api.ts
│   │   ├── functions.ts
│   │   ├── hooks
│   │   │   └── useApiRequest.tsx
│   │   ├── interfaces.ts
│   │   └── storage.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── CatsList.tsx
│   │   ├── index.ts
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   ├── Routing.tsx
│   ├── store
│   │   ├── useActionStore.ts
│   │   ├── useAuthStore.ts
│   │   ├── useFavCatsStore.ts
│   │   └── useFilterStore.ts
│   ├── theme
│   │   └── index.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

## Back

- **lancer l'app en dev mode**:

```bash
cd back
yarn
yarn dev
```

- **lancer en production**:

```bash
cd back
yarn build
pm2 start dist/index.js
```

**endpoints:**
la route de base `/api/v1/`

- `/user`: route vers les endpoints concernant l'authentification: login, logout.
  1.  `/user/login`: se connecter
  2.  `/user/logout`: se deconnecter
- `/car`: route vers l'ensemble des endpoints concernant les chats
  1.  GET `/car?page=1&size=10`: Charger l'ensemble des chat.
  2.  GET `/car?page=1&size=10&name=value1&status=value2` filters: filter les chats.
  3.  GET `/car/:id`: charger les données d'un seul chat par ID.
  4.  POST `/car`: ajouter un nouveau chat.
  5.  PUT `/car/:id`: modifier un modifier chat déjà existant par ID.
  6.  DELETE `/car/:id`: supprimer un chat par ID.
  7.  GET `/car/adopt`: récuper toutes les demandes d'adoptions
  8.  PORT `/car/adopt/:id/user/:userId`: ajouter une demande d'adoption
  9.  `/cat/adopt/:id/user/:userId`: supprimer une demande d'adoption
  10.
- `/consts`: charger l'ensemble du contenu statique: races, villes, sexes, statuts
- `*`: retourner un message d'erreur en cas ou la route n'existe pas

ex: `/api/v1/user/login`

**middleware:**

- **auth**:

  - isAdmin: verifie si la personne connecter est un admin
  - authenticate: verifie si la personne est connecté.

- **CORS** (Cross-Origin Resource Sharing):

  - Configuration de CORS pour accepter uniquement les origines autorisées par l'
  - Prévention des risques de sécurité liés à CORS.

- **Sécurité Middleware**:
  - Rate limiter : Utilisation d'un limiteur de taux pour prévenir les abus et les attaques, y compris les attaques DDoS.
  - Nettoyage XSS : Implémentation de mesures pour éviter ce type de vulnérabilité.
  - Helmet : Configuration avec un ensemble d'en-têtes pour renforcer la sécurité.

**utils:**

- **jwt**:
  - createToken: cree un token a partir des données utilisateur
  - verifyToken: verifié l'authentisité d'un token
- **hash**:
  - hash: un mot de passe en passe en une chaine de caractere un incompréhensible
  - compare: comparer hash password en base de données et celui du mot de passe hasher fourni par l'utilisateur.
- **JWT** (JSON Web Tokens) pour l'Authentification:

  - Utilisation de JWT pour l'authentification basée sur des tokens.
  - Mise en place d'une gestion sécurisée des clés secrètes pour la création et la vérification des tokens.

**librairies:**

- express: mettre en place du routing côté front
- typescript: pour typé le code javasript/react
- multer:
- prisma:

**technologies:**

- Nodejs 18+
- Express 4+
- TypeScript: 4+
- Postgresql 16+

**structure du code:**
├── controllers
│   ├── cat.controller.ts
│   ├── consts.controller.ts
│   ├── error.controller.ts
│   └── user.controller.ts
├── index.ts
├── middlewares
│   └── auth.ts
├── package.json
├── prisma
│   ├── migrations
│   └── schema.prisma
├── routes
│   ├── cat.route.ts
│   ├── consts.route.ts
│   └── user.route.ts
├── tsconfig.json
├── uploads
├── utils
│   ├── appError.ts
│   ├── corsOptions.ts
│   ├── hash.ts
│   ├── initDb.ts
│   ├── interfaces.ts
│   ├── jwt.ts
│   ├── security.ts
│   └── storage.ts
└── yarn.lock

**Database Schema**

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
- **status** (string)

- relation n..n: 1 user peut adopter plusieurs chats, et un chat peut être adopté par plusieurs users

**NB:**
Détails supllémentaire sur postgresql en cas problème:

- installer la derniere version
  `https://computingforgeeks.com/how-to-install-postgresql-16-on-debian/`

- lancer le service postgres:
- `sudo service postgresql start`

- connect as a root:
- `psql -U postgres`

- create a new user:
- `ALTER USER sam WITH PASSWORD '1234';`

- give the user a password:
- `ALTER USER username WITH SUPERUSER;`
- `SELECT usename, usecreatedb, usesuper FROM pg_user WHERE usename = 'sam';`

- grant superuser previlegies
- `restart service: sudo service postgresql restart`

- tester connection: `psql -h localhost -U sam -d test_aux -p 5432 -W`
