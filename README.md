# Microservice Unit

**CAUTION! STILL IN ALPHA! NOT FOR PRODUCTION!**

---

An opinionated scaffold to quickly create a micro-webservice with React in the
frontend and Node.js/SQLite in the backend.

Primary use-cases in mind are:

- rapid prototyping of micro-webservices
- educational hands-on (especially for React and SCSS)
- small data holder with some admin views
- BFF (backend-for-frontend) or thin REST layer for larger backends

But of course it is all up to you.

## Install

No installer yet. Clone or fork this repository, then install dependencies.

```sh
npm install
```

## Structure (My Choice of tools)

### Frontend

- React
- Sass/SCSS
- Vite
- React Router

### Backend

- Node.js
- Hono
- Sequelize
- SQLite

### Common

- Docker / docker-compose
- TypeScript
- Vitest
- Biome
- oxlint

## Scripts

- `npm run dev`: start backend and frontend in development mode
- `npm run stop`: force-quit local development processes
- `npm run build`: build backend and frontend
- `npm start`: build the backend and start backend/frontend servers
- `npm test`: run Vitest
- `npm run check`: run TypeScript, Biome, and oxlint checks
- `npm run format`: format files with Biome

## Local Ports

- Frontend dev server: `http://localhost:8080`
- Backend API server: `http://localhost:3000`
- Health check: `http://localhost:3000/healthcheck`

## Develop

1. Disconnect from this repo by deleting `.git` directory
2. Rename below to make it your own
   - the project root directory
   - package name (package.json)
   - image/container name (docker-compose.yml)
3. `npm install` to initialize the dependencies
4. `npm run dev` to start locally in dev mode
5. Have fun hacking

Before committing changes, run:

```sh
npm run format
npm run check
```

## Deploy

- `npm start` to run directly on your machine
- `docker-compose up` to run on Docker

## License

MIT https://obalab.mit-license.org/
