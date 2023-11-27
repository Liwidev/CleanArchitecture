import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { TYPES } from "../../../config/ioc/types";
import { Controller } from "../../../shared/domain/interface/Controller";
import { GetAllUsersDTO, GetAllUsersDTOSchema, GetAllUsersResult, GetAllUsersResultSchema } from "../domain/GetAllUsers";
// import { UserSchema } from "../../../shared";
// import { z } from 'zod';

/**
 * Controller in charge of handle Gell All Users
 */
@injectable()
export class GetAllUserController implements Controller {

  private _UseCase: UseCase<GetAllUsersDTO, GetAllUsersResult>;

  /**
   * @param {GetAllUsersUseCase} mapped to this controller
   */
  public constructor(
    @inject(TYPES.UseCases.getAllUsers) UseCase: UseCase<GetAllUsersDTO, GetAllUsersResult>
  ) {
    this._UseCase = UseCase;
  }

  /**
   * @param {Request} request Request payload
   * @param {Response} response Callback function that will handle response 
   * @return {GetAllUsersResult} Conditional if user was created successfully
   */
  public async handler(request: Request, response: Response): Promise<void> {
    logger.info("Controller - Get all Users Controller", { structuredData: true });
    try {
      logger.info("GetAllUsers - DTO", { structuredData: true });
      const query: GetAllUsersDTO = GetAllUsersDTOSchema.parse(request.body);
      logger.info("GetAllUsers - Result", { structuredData: true });
      const queryResponse: GetAllUsersResult = GetAllUsersResultSchema.parse(await this._UseCase.execute(query));
      response.send(queryResponse);
    } catch (error: unknown) {
      logger.error("Controller - Get all Users Controller", { structuredData: true });
      if (error instanceof Error) {
        response.status(500).send(error)
      } else {
        throw new Error("Unindentified Error")
      }

    }
  }
}
