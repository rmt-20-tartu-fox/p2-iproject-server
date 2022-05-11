FROM node:16.14

WORKDIR /usr/local/app

COPY package.json package-lock.json  /usr/local/app/

RUN npm install && npm cache clean --force

COPY ./ ./

EXPOSE 3000

CMD ["node", "app.js"]