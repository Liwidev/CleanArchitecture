import { Container } from "inversify";
import { TYPES } from "./types";

// Common Dependenceis - Interfaces & Repository Implementation
import { FirebaseUserRepository, IController, IUseCase, IUserRepository } from "./src/shared";

// Feature: CreateUser 
import { ICreateUserDTO, ICreateUserResult, CreateUserUseCase, CreateUserController } from "./src/features/CreateUser";

// Feature: GetAllUsers 
import { GetAllUserController, GetAllUsersUseCase, IGetAllUsersDTO, IGetAllUsersResult } from "./src/features/GetAllUsers";

const mainContainer = new Container();

// Repositories
mainContainer.bind<IUserRepository>(TYPES.repositories.firebase).to(FirebaseUserRepository);

// Use Cases
mainContainer.bind<IUseCase<ICreateUserDTO, ICreateUserResult>>(TYPES.useCases.creatUser).to(CreateUserUseCase);
mainContainer.bind<IUseCase<IGetAllUsersDTO, IGetAllUsersResult>>(TYPES.useCases.getAllUsers).to(GetAllUsersUseCase);

// Controllers
mainContainer.bind<IController>(TYPES.useCases.creatUser).to(CreateUserController);
mainContainer.bind<IController>(TYPES.useCases.getAllUsers).to(GetAllUserController);

export { mainContainer };