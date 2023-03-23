FROM node:16-alpine

WORKDIR /usr/app
RUN mkdir /usr/files

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

EXPOSE 3000

CMD ["npm","run","start"]