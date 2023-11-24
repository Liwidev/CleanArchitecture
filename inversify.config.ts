// file inversify.config.ts

import { Container } from "inversify";
import { TYPES } from "./types";

import { CreateUserUseCase, GetAllUsersUseCase } from "./src/application";
import { CreateUserController, GetAllUserController } from "./src/presentation/";
import { FirebaseUserRepository } from "./src/infrastructure";
import { IController, IUseCase, IUserRepository } from "./src/shared";
import { ICreateUserDTO, ICreateUserResult, IGetAllUsersDTO, IGetAllUsersResult } from "./src/application/interfaces";

const myContainer = new Container();
// Repositories
myContainer.bind<IUserRepository>(TYPES.repositories.firebase).to(FirebaseUserRepository);

// Use Cases
myContainer.bind<IUseCase<ICreateUserDTO, ICreateUserResult>>(TYPES.useCases.creatUser).to(CreateUserUseCase);
myContainer.bind<IUseCase<IGetAllUsersDTO, IGetAllUsersResult>>(TYPES.useCases.getAllUsers).to(GetAllUsersUseCase);

// Controllers
myContainer.bind<IController>(TYPES.useCases.creatUser).to(CreateUserController);
myContainer.bind<IController>(TYPES.useCases.getAllUsers).to(GetAllUserController);

export { myContainer };