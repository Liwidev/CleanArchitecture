import { Response, Request } from "express";

export interface IController {
  handler(request: Request, response: Response): Promise<any>;
}