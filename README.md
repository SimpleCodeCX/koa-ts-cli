# koa-ts-cli
A simple CLI for create koa + ts project: `koats create myProject`.

## Templates
koats provide three templates that are all based on ts.

- [koa-ts-base-template](https://github.com/SimpleCodeCX/koa-ts-base-template)

  This is a basic of koa project structure, integrated with ts. If you want to custom the structure of the project, this template is for you.

  For more details, please see [https://github.com/SimpleCodeCX/koa-ts-base-template](https://github.com/SimpleCodeCX/koa-ts-base-template)

- [koa-ts-full-template](https://github.com/SimpleCodeCX/koa-ts-full-template)

  This is a full project structure, integrated with ts.This project has been configured with a mysql database, support different environment(dev,prod,testing) configuration, some custom koa middleware have configured, and it has been the definition of a unified api response format.

   For more details, please see [https://github.com/SimpleCodeCX/koa-ts-full-template](https://github.com/SimpleCodeCX/koa-ts-full-template)
  
- [koa-ts-full-stack-template](https://github.com/SimpleCodeCX/koa-ts-full-stack-server)

  This is a full-stack project structure based on koa-ts-full-template.

  It contains three parts: 

    - client: This directory is the front-end code.
    - server: This directory is the back-end code.
    - common: This directory is the common code for front-end and back-end.

    For more details, please see [https://github.com/SimpleCodeCX/koa-ts-full-stack-server](https://github.com/SimpleCodeCX/koa-ts-full-stack-server)

This three template has the following three common features.

✓ [koa v2](https://github.com/koajs/koa)

✓ [Typescript](https://github.com/koajs/koa)

✓ [Jest](https://github.com/facebook/jest)

✓ [APIDOC](https://apidocjs.com/)

✓ [Docker](https://www.docker.com/)

✓ [Eslint](https://github.com/eslint/eslint)

✓ [Husky](https://github.com/typicode/husky)

## Installation

```javascript
 npm i -g koa-ts-cli
```

## Create Project

```javascript
 koats create myProject
 # Choose your favorite template.
 
 cd myProject
 npm install
```

## In Development Mode

```javascript
 cd myProject
 npm run dev
```

> NOTE: If you choose koa-ts-full-template or koa-ts-full-stack-template, you need to do some configuration.

## In Porduction Mode

```javascript
 npm run build
 cd myProject/dist
 npm run prod
```

> NOTE: If you choose koa-ts-full-template or koa-ts-full-stack-template, you need to do some configuration.


## Run In Docker

```javascript
 cd myProject
 npm install
 npm run build
 sudo docker build -t koa-ts-api-server .
 sudo docker run -it --name koa-ts-api-server -p 8080:8080 koa-ts-api-server
```

## Test

```javascript
 cd myProject
 npm run test
```