FROM node:latest

WORKDIR /app
COPY . /app

EXPOSE 5000

RUN yarn install
RUN yarn build

CMD yarn prisma:migrate && node dist/src/server.js
