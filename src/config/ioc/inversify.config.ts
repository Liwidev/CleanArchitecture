import { Container } from "inversify";
import { TYPES } from "./types";

// Common Dependenceis - Interfaces & Repository Implementation - InMemory Doesn't work with firebase
import { FirebaseUserRepository, Controller, UseCase, UserRepository, UserDTO } from "../../shared"; 
// import { Controller, UseCase, UserRepository, InMemoryUserRepository } from "../../shared";

// Feature: CreateUser 
import {  CreateUserUseCase, CreateUserController } from "../../features/CreateUser";

// Feature: GetAllUsers 
import { GetAllUserController, GetAllUsersUseCase } from "../../features/GetAllUsers";

const userCollectionName = process.env.COLLECTION_NAME || "User";
const mainContainer = new Container();

// Repositories
mainContainer.bind<UserRepository>(TYPES.repository).to(FirebaseUserRepository).inSingletonScope();
mainContainer.bind<string>(TYPES.collectionName).toConstantValue(userCollectionName); // This enable the constant value
// mainContainer.bind<UserRepository>(TYPES.repository).to(InMemoryUserRepository).inSingletonScope();


// Use Cases
mainContainer.bind<UseCase<UserDTO, void>>(TYPES.UseCases.creatUser).to(CreateUserUseCase).inSingletonScope();
mainContainer.bind<UseCase<void, UserDTO[]>>(TYPES.UseCases.getAllUsers).to(GetAllUsersUseCase).inSingletonScope();

// Controllers
mainContainer.bind<Controller>(TYPES.controller.creatUser).to(CreateUserController).inSingletonScope();
mainContainer.bind<Controller>(TYPES.controller.getAllUsers).to(GetAllUserController).inSingletonScope();



export { mainContainer };