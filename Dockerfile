# BUILD
FROM node:18-alpine AS build

WORKDIR /home/node

RUN set -x
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata

COPY ./package*.json ./
RUN npm ci

COPY ./config ./config
COPY ./vite.config.js ./vite.config.js
COPY ./app-frontend ./app-frontend
RUN chown -R node:node ./app-frontend
RUN npm run build-frontend

# PACK
FROM node:18-alpine
EXPOSE 80 3000

WORKDIR /home/node

RUN set -x
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata
RUN apk add sqlite

COPY ./package*.json ./
RUN npm i --production

COPY ./config ./config
COPY ./app-backend/src ./app-backend/src

COPY ./vite.config.js ./vite.config.js
COPY --from=build /home/node/app-frontend/dist ./app-frontend/dist

# UP
CMD npm start
