import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { CreateUserUseCase, ICreateUserDTO, ICreateUserResult } from "../application/CreateUserUseCase";

/**
 * Controller in charge of handle User Creation
 */
export class CreateUserController {
  /**
   * @param {CreateUserUseCase} _useCase Use Case mapped to this controller
   */
  public constructor(private readonly _useCase: CreateUserUseCase) { }

  /**
   * @param {Request} request Request with paylod of user to create
   * @param {Response} response Callback function that will handle response
   * @return {ICreateUserResult} Result Payload
   */
  public async handler(request: Request, response: Response): Promise<void> {
    // TODO: The validation needs to be done HERE
    logger.info("Controller - IN", { structuredData: true });

    const query: ICreateUserDTO = request.body;
    const queryResponse: ICreateUserResult = await this._useCase.execute(query);

    logger.info("Controller - OUT", { structuredData: true });
    response.send(queryResponse);
  }
}
