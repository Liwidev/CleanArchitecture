import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { TYPES } from "../../../config/ioc/types";
import { Controller } from "../../../shared/domain/interface/Controller";
import { GetAllUsersDTO } from "../domain/GetAllUsers";
import { UserDTO } from "../../../shared";

/**
 * Controller in charge of handle Gell All Users
 */
@injectable()
export class GetAllUserController implements Controller {

  private _UseCase: UseCase<void, UserDTO[]>;

  /**
   * @param {GetAllUsersUseCase} mapped to this controller
   */
  public constructor(
    @inject(TYPES.UseCases.getAllUsers) UseCase: UseCase<void, UserDTO[]>
  ) {
    this._UseCase = UseCase;
  }

  /**
   * @param {Request} request Request payload
   * @param {Response} response Callback function that will handle response 
   * @return {GetAllUsersDTO} Conditional if user was created successfully
   */
  public async handler(request: Request, response: Response): Promise<void> {
    logger.info("Controller - Get all Users Controller", { structuredData: true });
    try {
      // Execute use case
      const useCaseResponse: UserDTO[] = await this._UseCase.execute();

      // Convert use case result to response DTO
      const queryResponse: GetAllUsersDTO = GetAllUsersDTO.convertFromDTO(useCaseResponse);

      // Send message back
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
