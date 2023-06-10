# Yumedo Template

![banner](./__docs__/media/banner.png)

## Authors: [Yumi](https://github.com/helene-nguyen) & [Fredo](https://github.com/Megafredo)

---

## Introduction

This repository contains a starter template for user authentication and CRUD operations.

This API was inspired by some concepts from the hexagonal architecture work of Dr. [Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/) in an article he wrote in 2005.

Ports & Adapters is a pattern that promotes decoupling from technology and frameworks.

Hope it can help :)

## Summary

- [Requirements](#requirements)
- [Tools and version](#tools-and-versions)
- [Folder structure](#folder-structure)
- [Makefile usage](#makefile-usage)
- [Some tips](#tips)

- [Sources](#sources)

## Requirements

Having NodeJS installed.

Install all dependencies:

```sh
npm i
```

Don't forget to add .env file. You'll find an example.

## Tools and versions

- OS

  - Linux OS -
  - Windows OS -

- IDE

  - VSCodium v1.77.3

- NodeJS v20.0.0
- Typescript v5.0.4

- Dependencies

```sh
npm i ajv bcrypt dotenv express-session helmet jsonwebtoken nodemailer pg swagger-jsdoc swagger-ui-express debug
```

```json
"dependencies": {
    "ajv": "^8.12.0",
    "bcrypt": "^5.1.0",
    "debug": "^4.3.4",
    "dotenv": "^16.0.3",
    "express-session": "^1.17.3",
    "helmet": "^6.1.5",
    "jsonwebtoken": "^9.0.0",
    "nodemailer": "^6.9.1",
    "pg": "^8.10.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.2"
  }
```

- Dev dependencies

```sh
npm i -D @faker-js/faker @types/bcrypt @types/debug @types/express @types/express-session @types/jsonwebtoken @types/nodemailer @types/pg @types/supertest @types/swagger-jsdoc @types/swagger-ui-express @typescript-eslint/eslint-plugin @typescript-eslint/parser concurrently eslint typescript
```

```json
  "devDependencies": {
    "@faker-js/faker": "^7.6.0",
    "@types/bcrypt": "^5.0.0",
    "@types/debug": "^4.1.7",
    "@types/express": "^4.17.17",
    "@types/express-session": "^1.17.7",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/nodemailer": "^6.4.7",
    "@types/pg": "^8.6.6",
    "@types/swagger-jsdoc": "^6.0.1",
    "@types/swagger-ui-express": "^4.1.3",
    "@typescript-eslint/eslint-plugin": "^5.59.1",
    "@typescript-eslint/parser": "^5.59.1",
    "concurrently": "^8.0.1",
    "eslint": "^8.39.0",
    "typescript": "^5.0.4"
  }
```

- Configure EsLint

```sh
npm init @eslint/config
```

This will ask you a series of questions

```txt
How would you like to use ESLint? · To check syntax and find problems
√ What type of modules does your project use? · JavaScript modules (import/export)
√ Which framework does your project use? · None of these
√ Does your project use TypeScript? · Yes
√ Where does your code run? · node
√ What format do you want your config file to be in? · JavaScript
```

And it will install dependencies to use it :

```txt
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest

added 12 packages, and audited 644 packages in 3s

69 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.js file in C:\Users\Gamer\Desktop\api-yumelio
```

Add Typescript configuration file:

```json
{
  "compilerOptions": {
    "module": "ES2022",
    "esModuleInterop": true,
    "target": "ES2022",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "strictNullChecks": true,
    "removeComments": true,
    "resolveJsonModule": true
  },
  "lib": ["es2015"],
  "compileOnSave": true
}
```

This is a configuration file for the TypeScript compiler (tsconfig.json) that specifies options for compiling TypeScript code into JavaScript. Here's what each option means:

- "compilerOptions": An object that specifies the compiler options.

- "module": "ES2022": Specifies the module system to use. In this case, it's ECMAScript 2022.

- "esModuleInterop": true: Enables interoperability between CommonJS and ES6 modules.

- "target": "ES2022": Specifies the version of ECMAScript that the compiled JavaScript code should be compatible with. In this case, it's ECMAScript 2022.

- "moduleResolution": "node": Specifies how modules should be resolved. In this case, it's Node.js style resolution.

- "sourceMap": true: Generates source maps that allow debugging of the TypeScript code in the browser or IDE.

- "outDir": "dist": Specifies the output directory where the compiled JavaScript files should be saved.

- "strict": true: Enables strict type-checking and other strict checks.

- "strictNullChecks": true: Enables strict null checks that ensure variables are not undefined or null.

- "removeComments": true: Removes all comments from the compiled JavaScript files.

- "resolveJsonModule": true: Enables importing JSON files as modules.

- "lib": ["es2015"]: Specifies the set of built-in JavaScript libraries that should be included in the compilation process. In this case, it's ECMAScript 2015 (ES6).

- "compileOnSave": true: Enables automatic compilation of TypeScript files when they are saved.

## Folder structure

```sh
├── src
|  ├── config
|  |  ├── database
|  |  |  └── connect.ts
|  |  └── options
|  |     ├── cors.ts
|  |     └── session.ts
|  ├── domain
|  |  ├── core
|  |  |  ├── coreController.ts
|  |  |  ├── coreDatamapper.ts
|  |  |  ├── coreModel.ts
|  |  |  └── coreRouter.ts
|  |  ├── main
|  |  |  ├── controller.ts
|  |  |  ├── datamapper.ts
|  |  |  ├── model.ts
|  |  |  ├── router.ts
|  |  |  ├── schema.ts
|  |  |  └── Types.ts
|  |  └── user
|  |     ├── controller.ts
|  |     ├── datamapper.ts
|  |     ├── model.ts
|  |     ├── router.ts
|  |     ├── schema.ts
|  |     └── Types.ts
|  ├── index.ts
|  ├── middlewares
|     ├── dataMailerTypes.ts
|     ├── express
|     |  └── index.d.ts
|     └── userTypes.ts
├── scripts
|  ├── create.sh
|  └── delete.sh
├── Makefile
├── package.json
├── README.md
├── restClient.http
├── tsconfig.json
```

## Makefile Usage

### Use for domains

```sh
create_domain
```

```sh
delete_domain
```

### Use of Yumecho (database versioning)

- Initialized a new database

```sh
db_init
```

- Add a new version

```sh
db_add
```

- Remove a version

```sh
db_remove
```

- Deploy a version

```sh
db_deploy
```

- Revert the action of a specific version

```sh
db_revert
```

- Check if the version is well deployed

```sh
db_verify
```

## Tips

---

## Sources
