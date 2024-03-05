FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
COPY cert /etc/ssl/certs/cert
COPY key /etc/ssl/certs/key

CMD node server.js