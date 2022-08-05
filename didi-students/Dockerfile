FROM node:latest

WORKDIR /usr/src

COPY . /usr/src/

EXPOSE 5000

RUN yarn install

CMD yarn build && yarn db:migrate && node dist/index.js
