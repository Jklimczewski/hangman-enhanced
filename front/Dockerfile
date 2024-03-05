FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.3
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY cert /etc/nginx/cert
COPY key /etc/nginx/key

COPY --from=builder /app/build/ /var/www/hangman/html/