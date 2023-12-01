
## Concepts
This artifact was created for personal training and better understanding of the following concepts:
* Clean Architecture
* Vectical Slice Architecture
* Dependency Injection with **InversifyJS**
* Schema Validator with **Zod**

## Stack
The stack used is the following:
* Codebase - Typescript
* Unit Testing - Jest
* Database - Firebase
* HTTP Server - Firebase Functions
* Code Versioning - GitHub
* Pipelines - GitHub Actions

## DevSecOps
WIP

## Example JSON query
```JSON
{
  "name": "Ignacio",
  "age": 30,
  "address": "Some Address in Canada",
  "dateOfBirth": "1993-02-25T00:00:00.123Z",
  "email": "Ignacio@gmail.ca"
}
```

## TO-DO's
```js
TODO: Unit testing using Jest
TODO: Add DELETE Feature
TODO: Migrate Firebase onRequest to Express 
TODO: Create DevOps Pipelines
TODO: Docker Support
TODO: Improve Documentation && Add pictures of architecture
```

## Folder Structure
index.ts are mainly used to reduce the amount of imports by exporting the whole folder or functionallity
```js
.
│   .eslintrc.js
│   .gitignore
│   firestore-debug.log
│   package-lock.json
│   package.json
│   README.MD
│   tsconfig.dev.json
│   tsconfig.json
│   ui-debug.log
│
└───src
    │   index.ts
    │
    ├───config
    │   └───ioc
    │           inversify.config.ts
    │           types.ts
    │
    ├───features
    │   ├───CreateUser
    │   │   │   index.ts
    │   │   │
    │   │   ├───application
    │   │   │       CreateUserUseCase.ts
    │   │   │
    │   │   ├───domain
    │   │   │       CreateUser.ts
    │   │   │
    │   │   └───presentation
    │   │           CreateUserController.ts
    │   │
    │   ├───FindUser
    │   │   │   index.ts
    │   │   │
    │   │   ├───application
    │   │   │       FindUserUseCase.ts
    │   │   │
    │   │   ├───domain
    │   │   │       FindUser.ts
    │   │   │
    │   │   └───presentation
    │   │           FindUserController.ts
    │   │
    │   └───GetAllUsers
    │       │   index.ts
    │       │
    │       ├───application
    │       │       GetAllUsersUseCase.ts
    │       │
    │       ├───domain
    │       │       GetAllUsers.ts
    │       │
    │       └───presentation
    │               GetAllUserController.ts
    │
    └───shared
        │   index.ts
        │
        ├───domain
        │   ├───entities
        │   │       User.ts
        │   │
        │   └───interface
        │           Controller.ts
        │           Response.ts
        │           UseCase.ts
        │           UserRepository.ts
        │
        ├───infrastructure
        │       FirebaseUserRepository.ts
        │       InMemoryUserRepository.ts
        │
        ├───presentation
        │       expressHandlers.ts
        │       FirebaseHandlers.ts
        │
        └───utils
                ErrorHandling.ts
```