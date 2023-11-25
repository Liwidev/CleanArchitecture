import { Container } from "inversify";
import { TYPES } from "./types";

// Common Dependenceis - Interfaces & Repository Implementation - InMemory Doesn't work with firebase
// import { FirebaseUserRepository, IController, IUseCase, IUserRepository } from "../../shared"; 
import { IController, IUseCase, IUserRepository, InMemoryUserRepository } from "../../shared";

// Feature: CreateUser 
import { ICreateUserDTO, ICreateUserResult, CreateUserUseCase, CreateUserController } from "../../features/CreateUser";

// Feature: GetAllUsers 
import { GetAllUserController, GetAllUsersUseCase, IGetAllUsersDTO, IGetAllUsersResult } from "../../features/GetAllUsers";

const mainContainer = new Container();

// Repositories
// mainContainer.bind<IUserRepository>(TYPES.repository).to(FirebaseUserRepository).inSingletonScope();
mainContainer.bind<IUserRepository>(TYPES.repository).to(InMemoryUserRepository).inSingletonScope();


// Use Cases
mainContainer.bind<IUseCase<ICreateUserDTO, ICreateUserResult>>(TYPES.useCases.creatUser).to(CreateUserUseCase).inSingletonScope();
mainContainer.bind<IUseCase<IGetAllUsersDTO, IGetAllUsersResult>>(TYPES.useCases.getAllUsers).to(GetAllUsersUseCase).inSingletonScope();

// Controllers
mainContainer.bind<IController>(TYPES.controller.creatUser).to(CreateUserController).inSingletonScope();
mainContainer.bind<IController>(TYPES.controller.getAllUsers).to(GetAllUserController).inSingletonScope();

export { mainContainer };