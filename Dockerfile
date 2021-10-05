FROM node:16-alpine

ENV MONGO_DB_USERNAME=mongoadmin \
    MONGO_DB_PASSWORD=password \
    NODE_ENV=development \
    PORT=3001

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install && npm cache clean --force


CMD ["node", "index.js"]

EXPOSE 8081