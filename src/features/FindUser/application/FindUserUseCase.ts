import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { UserDTO } from "../../../shared";
import { FindUserEntryDTO } from "../domain/FindUser";

/**
 * Find User Use case Implementation
 */
@injectable()
export class FindUserUseCase implements UseCase<FindUserEntryDTO, UserDTO> {

  private _UserRepository: UserRepository;

  /**
   * @param {UserRepository} userRepository Repository used to create User
   */
  public constructor(
    @inject(TYPES.repository) userRepository: UserRepository
  ) {
    this._UserRepository = userRepository;
  }

  /**
   * Execute the Use Case
   * @param {FindUserEntry} id User id
   * @return {Promise<UserDTO>} The User object created & Timestamp of execution
   */
  public async execute(input: FindUserEntryDTO): Promise<UserDTO> {
    // Here should lay all the UseCase Logic e.g if needs to validate if the user already exists to provide a more accurate response
    try {

      return await this._UserRepository.find(input.id);

    } catch (error: unknown) {
      throw new Error("User wan't found");
    }

  }
}
