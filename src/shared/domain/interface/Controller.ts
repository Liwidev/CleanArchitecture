import { Response, Request } from "express";

export interface Controller {
  handler(request: Request, response: Response): Promise<any>;
}