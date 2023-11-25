// Here is where the EXPRESS / NESTJS / Firebase solution lives
// Since I'm using Firebase this piece is not needed
// -> This portion of the code is represented in the indes.ts with the export
// -> of the method "helloWorld"
// -> There is a single Controller per CF

// Firebase Libraries
import * as express from 'express';
// Inversify configuration files
import { mainContainer } from "../../config/ioc/inversify.config";
import { TYPES } from "../../config/ioc/types";
// Controllers Interface
import { Controller } from "../domain/interface/Controller";

// The following example shows the manual dependency injection without using any libraries
export const CreateUser = (request: express.Request, response: express.Response) =>
  mainContainer.get<Controller>(TYPES.controller.creatUser).handler(request, response)

export const GetAllUser = (request: express.Request, response: express.Response) =>
  mainContainer.get<Controller>(TYPES.controller.getAllUsers).handler(request, response)

export class ExpressServer {
  public static async run(port: number): Promise<void> {
    const app = express();
    app.use(express.json());

    app.get('/miybara/us-central1/GetAllUser', (request: express.Request, response: express.Response) => GetAllUser(request, response));
    app.post('/miybara/us-central1/CreateUser', (request: express.Request, response: express.Response) => CreateUser(request, response));

    app.listen(port, () => {
      console.log('Server is running')
    })
  }
}