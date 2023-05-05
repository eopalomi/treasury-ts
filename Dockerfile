FROM node:16-slim

RUN mkdir -p /home/node/app && chown -R root:root /home/node/app

USER root

WORKDIR /home/node/app

COPY package*.json .

RUN npm install pm2 -g
RUN npm install

COPY --chown=node:node . .

EXPOSE 2121

CMD ["sh", "-c", "npm run dev"]




