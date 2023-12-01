import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { UserDTO } from "../../../shared";
import { v4 as uuidv4 } from 'uuid';

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

      // Add ID if it wasn't provided in the input
      const userID = input.id;
      if (!userID) {
        input.id = uuidv4();
      } else {
        const conditonals: string [][] = [
          ["id", "==", `${input.id}`],
        ]
        const user = await this._UserRepository.find(conditonals);
        if (user[0]) throw new Error("This user already exists")
      }

      await this._UserRepository.save(input);

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`User wasn't able to be created with reason: ${error.message}`);
      } else {
        throw new Error(`Unknown Error`);
      }
    }

  }
}
