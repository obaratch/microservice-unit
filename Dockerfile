# BUILD
FROM node:26-slim AS build

WORKDIR /home/node

RUN set -x
RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

COPY ./package*.json ./
RUN npm ci

COPY ./vite.config.ts ./vite.config.ts
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.backend.json ./tsconfig.backend.json
COPY ./app-backend ./app-backend
COPY ./app-frontend ./app-frontend
RUN chown -R node:node ./app-backend
RUN chown -R node:node ./app-frontend
RUN npm run build

# PACK
FROM node:26-slim
EXPOSE 8080 3000

WORKDIR /home/node

RUN set -x
RUN apt-get update && \
    apt-get install -y --no-install-recommends sqlite3 && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    rm -rf /var/lib/apt/lists/*

COPY ./package*.json ./
RUN npm ci --omit=dev

COPY --from=build /home/node/app-backend/dist ./app-backend/dist
COPY --from=build /home/node/app-frontend/dist ./app-frontend/dist

# UP
CMD npm start
