import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { TYPES } from "../../../config/ioc/types";
import { CreateUserDTO } from "../domain/CreateUser";
import { UserDTO, Controller, UseCase, ErrorHandling } from "../../../shared";
/**
 * Controller in charge of handle User Creation
 */
@injectable()
export class CreateUserController implements Controller {

  private _UseCase: UseCase<UserDTO, void>;

  /**
   * @param {CreateUserUseCase} _UseCase Use Case mapped to this controller
   */
  public constructor(
    @inject(TYPES.UseCases.creatUser) UseCase: UseCase<UserDTO, void>
  ) {
    this._UseCase = UseCase;
  }

  /**
   * @param {Request} request Request with paylod of user to create
   * @param {Response} response Callback function that will handle response
   * @return {CreateUserDTO} Result Payload
   */
  public async handler(request: Request, response: Response): Promise<void> {
    try {
      logger.info("Controller - Create User Controller", { structuredData: true });
      // This validates & converts raw entity to DTO
      const query: UserDTO = UserDTO.converFromEntity(request.body);

      // run the Create User use case
      await this._UseCase.execute(query);

      // This validates and converts UserDTO to the output DTO
      const queryResponse: CreateUserDTO = CreateUserDTO.convertFromDTO(query);
      response.send(queryResponse);

    } catch (error: unknown) {
      logger.error("Controller - Get all Users Controller", { structuredData: true });
      ErrorHandling(error, response);
    }
  }
}
