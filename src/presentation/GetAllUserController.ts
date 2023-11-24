import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { GetAllUsersUseCase, IGetAllUsersDTO, IGetAllUsersResult } from "../application/GetAllUsersUSeCase";
/**
 * Controller in charge of handle User Creation
 */
export class GetAllUserController {
  /**
   * @param {GetAllUsersUseCase} mapped to this controller
   */
  public constructor(private readonly _useCase: GetAllUsersUseCase) { }

  // return type `void` means the function has no `return` statement
  /**
   * @param {Request} request Whom to create
   * @param {Response} response Whom to create
   * @return {IGetAllUsersResult} Conditional if user was created successfully
   */
  public async handler(request: Request, response: Response): Promise<void> {
    // TODO: The validation needs to be done HERE
    logger.info("Controller - IN", { structuredData: true });

    const query: IGetAllUsersDTO = request.body;
    const queryResponse: IGetAllUsersResult = await this._useCase.execute(query);

    logger.info("Controller - OUT", { structuredData: true });
    response.send(queryResponse);
  }
}
