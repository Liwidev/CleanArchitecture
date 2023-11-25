// Here is where the EXPRESS / NESTJS / Firebase solution lives
// Since I'm using Firebase this piece is not needed
// -> This portion of the code is represented in the indes.ts with the export
// -> of the method "helloWorld"
// -> There is a single Controller per CF

// Firebase Libraries
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { Response, Request } from "express";
// Inversify configuration files
import { mainContainer } from "../../../inversify.config";
import { TYPES } from "../../../types";
// Controllers Interface
import { IController } from "../domain/interface/IController";

// This is needed to initialize Firebase
initializeApp();

// The following example shows the manual dependency injection without using any libraries
export const CreateUser = onRequest((request: Request, response: Response) =>
  mainContainer.get<IController>(TYPES.useCases.creatUser).handler(request, response))

export const GetAllUser = onRequest((request: Request, response: Response) =>
  mainContainer.get<IController>(TYPES.useCases.getAllUsers).handler(request, response))