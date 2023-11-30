import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { UserDTO } from "../../../shared";

/**
 * Create User Use case Implementation
 */
@injectable()
export class CreateUserUseCase implements UseCase<UserDTO, void> {

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
   * @param {User} input User Object
   * @return {Promise<CreateUserResult>} The User object created & Timestamp of execution
   */
  public async execute(input: UserDTO): Promise<void> {
    // Here should lay all the UseCase Logic e.g if needs to validate if the user already exists to provide a more accurate response
    try {

      // TODO: Create find user logic and throw error "User already exists"

      await this._UserRepository.save(input);

    } catch (error: unknown) {
      throw new Error("User wan't able to be created with reason: ");
    }

  }
}
