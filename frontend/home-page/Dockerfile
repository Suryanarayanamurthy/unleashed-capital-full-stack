FROM node:14.15.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . ./

##RUN cp .env.dev .env

# debug #
RUN ls -a
#######


ENV API_GATEWAY_HOST api-gateway:4000/api/v1/

ENV NODE_ENV production

RUN npm install

RUN npm run build

EXPOSE 3001

CMD npm run server