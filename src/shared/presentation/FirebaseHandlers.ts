// Here is where the EXPRESS / NESTJS / Firebase solution lives
// Since I'm using Firebase this piece is not needed
// -> This portion of the code is represented in the indes.ts with the export
// -> of the method "helloWorld"
// -> There is a single Controller per CF

// Firebase Libraries
import { onRequest } from "firebase-functions/v2/https";
import { Response, Request } from "express";
// Inversify configuration files
import { mainContainer } from "../../config/ioc/inversify.config";
import { TYPES } from "../../config/ioc/types";
// Controllers Interface
import { Controller } from "../domain/interface/Controller";

// The following example shows the manual dependency injection without using any libraries
export const CreateUser = onRequest((request: Request, response: Response) =>
  mainContainer.get<Controller>(TYPES.controller.creatUser).handler(request, response))

export const GetAllUser = onRequest((request: Request, response: Response) =>
  mainContainer.get<Controller>(TYPES.controller.getAllUsers).handler(request, response))