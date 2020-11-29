FROM node:14.15.0

WORKDIR /usr/src/app

COPY package*.json ./

ENV SERVICE_AUTH auth-module

RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm" , "start"]
