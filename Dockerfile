FROM --platform=linux/amd64 node:latest

WORKDIR /sdc-qanda

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "server/index.js"]