import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { GetAllUsersUseCase, IGetAllUsersDTO, IGetAllUsersResult } from "../application/GetAllUsersUSeCase";

/**
 * Controller in charge of handle Gell All Users
 */
export class GetAllUserController {
  /**
   * @param {GetAllUsersUseCase} mapped to this controller
   */
  public constructor(private readonly _useCase: GetAllUsersUseCase) { }

  /**
   * @param {Request} request Request payload
   * @param {Response} response Callback function that will handle response 
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
