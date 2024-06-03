<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript application that calculates the annual percentage rate of vehicle loans.

The project consists in a REST API build with **NestJS** using **TypeORM**, **MySQL**. It uses **Docker** to build the application and the database.

### Dependencies and Frameworks

 - TypeORM
 - MySQL
 - class-validator
 - class-transformer
 - decimal.js
 - wait-for-it

## Requirements

You will need to have installed **[Docker Engine](https://docs.docker.com/engine/install/)** or **[Docker Desktop](https://docs.docker.com/desktop/)** in your environment.

## Installation

```bash
$ npm install
```

## Running the app

```bash
docker-compose up --build
```

## Tips

In the root of the project you can access the *api.http* file that contains endpoints configured to assist you to make some requests. Also, you will need to have installed **REST Client** extension to use it.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
