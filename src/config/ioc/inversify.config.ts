import { Container } from "inversify";
import { TYPES } from "./types";

// Common Dependenceis - Interfaces & Repository Implementation - InMemory Doesn't work with firebase
import { FirebaseUserRepository, Controller, UseCase, UserRepository } from "../../shared"; 
// import { Controller, UseCase, UserRepository, InMemoryUserRepository } from "../../shared";

// Feature: CreateUser 
import { CreateUserDTO, CreateUserResult, CreateUserUseCase, CreateUserController } from "../../features/CreateUser";

// Feature: GetAllUsers 
import { GetAllUserController, GetAllUsersUseCase, GetAllUsersDTO, GetAllUsersResult } from "../../features/GetAllUsers";

const userCollectionName = process.env.COLLECTION_NAME || "User";
const mainContainer = new Container();

// Repositories
mainContainer.bind<UserRepository>(TYPES.repository).to(FirebaseUserRepository).inSingletonScope();
mainContainer.bind<string>(TYPES.collectionName).toConstantValue(userCollectionName); // This enable the constant value
// mainContainer.bind<UserRepository>(TYPES.repository).to(InMemoryUserRepository).inSingletonScope();


// Use Cases
mainContainer.bind<UseCase<CreateUserDTO, CreateUserResult>>(TYPES.UseCases.creatUser).to(CreateUserUseCase).inSingletonScope();
mainContainer.bind<UseCase<GetAllUsersDTO, GetAllUsersResult>>(TYPES.UseCases.getAllUsers).to(GetAllUsersUseCase).inSingletonScope();

// Controllers
mainContainer.bind<Controller>(TYPES.controller.creatUser).to(CreateUserController).inSingletonScope();
mainContainer.bind<Controller>(TYPES.controller.getAllUsers).to(GetAllUserController).inSingletonScope();



export { mainContainer };