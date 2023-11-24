// Here is where the EXPRESS / NESTJS solution lives
// Since I'm using Firebase this piece is not needed
// -> This portion of the code is represented in the indes.ts with the export
// -> of the method "helloWorld"
// -> There is a single Controller per CF

import * as admin from "firebase-admin";
import { CreateUserController } from "./CreateUserController";
// import { InMemoryUserRepository } from "../infrastructure/InMemoryUserRepository";
import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { FirebaseUserRepository } from "../infrastructure/FirebaseUserRepository";
import { Response, Request } from "express";
import { initializeApp } from "firebase-admin/app";
import { GetAllUsersUseCase } from "../application/GetAllUsersUSeCase";
import { GetAllUserController } from "./GetAllUserController";

initializeApp();

export const CreateUserhandler = (request: Request, response: Response) => {
  const db = admin.firestore();

  // InMemory Implementation
  // const InMemoryRepo = new InMemoryUserRepository();
  // const usecase = new CreateUserUseCase(InMemoryRepo);

  // Firebase Implementation
  const FirebaseRepo = new FirebaseUserRepository(db);

  const usecase = new CreateUserUseCase(FirebaseRepo);
  const controller = new CreateUserController(usecase);

  controller.handler(request, response);
};

export const GetAllUserhandler = (request: Request, response: Response) => {
  const db = admin.firestore();

  // InMemory Implementation
  // const InMemoryRepo = new InMemoryUserRepository();
  // const usecase = new CreateUserUseCase(InMemoryRepo);

  // Firebase Implementation
  const FirebaseRepo = new FirebaseUserRepository(db);

  const usecase = new GetAllUsersUseCase(FirebaseRepo);
  const controller = new GetAllUserController(usecase);
  
  controller.handler(request, response);
};
