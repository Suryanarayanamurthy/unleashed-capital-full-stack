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

when the application is [running locally](#run-locally) run the npm script for testing
  ```
    npm test
  ```

This repo also uses jest for testing react app (within frontend/home-page)
```
cd frontend/home-page && npm test
```

# Structure
This appication is structured as a micro-service archeture with scalability in mind.

the application is divided to 3 different applications, which can exist in their own repo and can be maintained and scaled independantly:

- home-page (./frontend/home-page)
- api-gateway (./backend/api-gateway)
- auth-module (./backend/auth-module)

home-page: this is a react-app that makes the api calls to the api-gateway to access backend resources.

api-gateway:
-  this api-gateway is a node.js(with express) app that acts as a reverse-proxy to redirect incoming api-requests to it's respective micro-service.
- this appication acts as a single point of contact for all incoming requests.
- this service  maintaines a list of microservices that it sould proxy to, quite useful when the number of microservices get's out of hand as the application grows.
- you can use the auth middle-ware to check authentication when the req coming-in requires authentication.

auth-module:
- this application is also a node.js(with express) app that uses passport's jwt token strategy for authentication.
- it stores the user data and the encrypted passwords(using bcrypt) in mongodb (uses mongoose diver)
