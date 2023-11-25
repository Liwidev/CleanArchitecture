import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { TYPES } from "../../../config/ioc/types";
import { IController } from "../../../shared/domain/interface/IController";
import { IGetAllUsersDTO, IGetAllUsersResult } from "../domain/IGetAllUsers";


/**
 * Controller in charge of handle Gell All Users
 */
@injectable()
export class GetAllUserController implements IController {

  private _useCase: IUseCase<IGetAllUsersDTO, IGetAllUsersResult>;

  /**
   * @param {GetAllUsersUseCase} mapped to this controller
   */
  public constructor(
    @inject(TYPES.useCases.getAllUsers) useCase: IUseCase<IGetAllUsersDTO, IGetAllUsersResult>
  ) {
    this._useCase = useCase;
  }

  /**
   * @param {Request} request Request payload
   * @param {Response} response Callback function that will handle response 
   * @return {IGetAllUsersResult} Conditional if user was created successfully
   */
  public async handler(request: Request, response: Response): Promise<void> {
    // TODO: The validation needs to be done HERE
    logger.info("Controller - Get all Users Controller", { structuredData: true });

    const query: IGetAllUsersDTO = request.body;
    const queryResponse: IGetAllUsersResult = await this._useCase.execute(query);

    response.send(queryResponse);
  }
}
