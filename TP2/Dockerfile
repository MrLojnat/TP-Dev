FROM node:lts-bulleyes-slim
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node

COPY package*.json ./
RUN npm install --production

COPY --chown=node:node . .
CMD ["node", "server.js"]