FROM node:19-alpine3.16

WORKDIR /usr/src/app

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]