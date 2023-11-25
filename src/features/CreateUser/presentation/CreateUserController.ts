import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { TYPES } from "../../../config/ioc/types";
import { IController } from "../../../shared/domain/interface/IController";
import { ICreateUserDTO, ICreateUserResult } from "../domain/ICreateUser";

/**
 * Controller in charge of handle User Creation
 */
@injectable()
export class CreateUserController implements IController{

  private _useCase: IUseCase<ICreateUserDTO, ICreateUserResult>;

  /**
   * @param {CreateUserUseCase} _useCase Use Case mapped to this controller
   */
  public constructor(
    @inject(TYPES.useCases.creatUser) useCase: IUseCase<ICreateUserDTO, ICreateUserResult>
  ) {
    this._useCase = useCase;
  }

  /**
   * @param {Request} request Request with paylod of user to create
   * @param {Response} response Callback function that will handle response
   * @return {ICreateUserResult} Result Payload
   */
  public async handler(request: Request, response: Response): Promise<void> {
    // TODO: The validation needs to be done HERE
    logger.info("Controller - Create User Controller", { structuredData: true });

    const query: ICreateUserDTO = request.body;
    const queryResponse: ICreateUserResult = await this._useCase.execute(query);

    response.send(queryResponse);
  }
}
