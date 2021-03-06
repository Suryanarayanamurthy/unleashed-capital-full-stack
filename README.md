<h3 align="center">
  unleashed-capital-full-stack
</h3>
<p align="center">
  sample full-stack test for authentication (with main focus on Backend and Architecture design). 
</p>

# Getting Started

## Prerequisites

Please make sure that you have:

- node.js installed (https://nodejs.org/) [required if you want to run this locally]
- docker-compose (https://docs.docker.com/compose/install/) [required if you want to run this in docker conatiners]

## Configuration
 - find db config in ./backend/auth-module/config/config.js (or you can leave the existing defaults)

 ## run locally
  ```
  npm install && npm start
  ```
## run in docker
  ```
  docker-compose up
  ```
## test
This repo uses `postman collection` and `newman` cli util to run tests on rest-api.

  ```
    npm test
  ```

This repo also uses jest for testing react app (within frontend/home-page)
```
cd frontend/home-page && npm test
```

## Other useful npm scripts (at root level)

- `npm run backend-start` :when you want to run start scripts of the backend services.

- `npm run dev`:
like "npm start" but runs all the services in dev mode (using nodemon).

- `npm run backend-dev`:
launches only the backend services in dev mode (using nodemon). quite useful to develop apis using postman to iteratively test and implement apis.


# Structure
This application is structured to be a micro-service architectured application, with scalability in mind.

the application is divided into 3 different applications, which can exist in their own repo and can be maintained and scaled independently:

- home-page (./frontend/home-page)
- api-gateway (./backend/api-gateway)
- auth-module (./backend/auth-module)

home-page:
-  this is a react-app that makes the api calls to the api-gateway to access backend resources.
- there is a node.js(with express) wrapper web-server which serves the react-app's build folder when started. 
this webserver mode of hosting is achived automatically when run using [`docker-compose up`](#run-in-docker)


api-gateway:
-  this api-gateway is a node.js(with express) app that acts as a reverse-proxy to redirect incoming api-requests to its respective micro-service.
- this application acts as a single point of contact for all incoming requests.
- this service maintains a list of microservices that it should proxy to, quite useful when the number of microservices gets out of hand as the application grows.
- you can use the auth middleware to check the auth headers before the auth is forwarded to the requested service.

auth-module:
- this application is also a node.js(with express) app that uses passport's jwt token strategy for authentication.
- it stores the user data and the encrypted passwords(using bcrypt) in mongodb (uses mongoose diver).

# Credits/References
This project is largely inspired by my own exising work on api-gateway
- https://github.com/Suryanarayanamurthy/api-gateway

and also took  inspiration by the blog post

- https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

## developer
contact: surya@somerandomguy.xyz
