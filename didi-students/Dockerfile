FROM node:latest

WORKDIR /usr/src

COPY . /usr/src/

EXPOSE 5000

RUN npm i

RUN npx tsc

RUN npx prisma migrate dev --name init

CMD ["node", "dist/index.js"]
