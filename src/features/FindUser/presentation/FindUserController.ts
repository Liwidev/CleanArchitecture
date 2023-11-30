import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { TYPES } from "../../../config/ioc/types";
import { FindUserDTO, FindUserEntry, FindUserEntryDTO } from "../domain/FindUser";
import { UserDTO, Controller, UseCase, ErrorHandling } from "../../../shared";

/**
 * Controller in charge of handle User Creation
 */
@injectable()
export class FindUserController implements Controller {

  private _UseCase: UseCase<FindUserEntryDTO, UserDTO>;

  /**
   * @param {FindUserUseCase} _UseCase Use Case mapped to this controller
   */
  public constructor(
    @inject(TYPES.UseCases.findUser) UseCase: UseCase<FindUserEntryDTO, UserDTO>
  ) {
    this._UseCase = UseCase;
  }

  /**
   * @param {Request} request Request with paylod of user to create
   * @param {Response} response Callback function that will handle response
   * @return {FindUserDTO} Result Payload
   */
  public async handler(request: Request, response: Response): Promise<void> {
    try {
      logger.info("Controller - Find User Controller", { structuredData: true });
      // This validates & converts raw entity to DTO
      const query: FindUserEntryDTO = FindUserEntryDTO.convertFromEntity(request.query as FindUserEntry);

      // run the Create User use case
      const useCaseResult: UserDTO = await this._UseCase.execute(query);

      // This validates and converts UserDTO to the output DTO
      const queryResponse: FindUserDTO = FindUserDTO.convertFromDTO(useCaseResult);
      response.send(queryResponse);

    } catch (error: unknown) {
      logger.error("Controller - Get all Users Controller", { structuredData: true });
      ErrorHandling(error, response);
    }
  }
}
