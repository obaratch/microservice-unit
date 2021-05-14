# Microservice Unit

**CAUTION! STILL IN ALPHA! NOT FOR PRODUCTION!**

---

An opinionated scaffold to quickly create a micro-webservice with React in the frontend and NodeJS/SQLite in the backend

Primary use-cases in mind are:

- rapid prototyping of micro-webservices
- educational hands-on (especially for React and SCSS)
- small data holder with some admin views
- BFF (backend-for-frontend) or thin REST layer for larger backends

But of course it is all up to you.

## Install

No installer yet. Just clone or fork.

## Structure (My Choice of tools)

### Frontend

- React
- Sass/SCSS
- Vite

### Backend

- NodeJS
- Express
- Sequelize
- SQLite

### common

- Docker / docker-compose
- Jest

## Develop

1. Disconnect from this repo by deleting `.git` directory
2. Rename below to make it your own
   - the project root directory
   - package name (package.json)
   - image/container name (docker-compose.yml)
3. `npm install` to initialize the dependencies
4. `npm run start-dev` to start locally in dev mode
5. Have fun hacking

## Deploy

- `npm start` to run directly on your machine
- `docker-compose up` to run on Docker

## License

MIT https://obalab.mit-license.org/
