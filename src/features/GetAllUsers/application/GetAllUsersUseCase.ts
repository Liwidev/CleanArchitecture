import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { UserDTO } from "../../../shared";

/**
 * Get all Users Use case Implementation
 */
@injectable()
export class GetAllUsersUseCase implements UseCase<void, UserDTO[]> {

  private _UserRepository: UserRepository;

  /**
   * @param {UserRepository} _UserRepository Repository used to get all Users
   */
  public constructor(
    @inject(TYPES.repository) userRepository: UserRepository
  ) {
    this._UserRepository = userRepository;
  }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<UserDTO>} List with all users found && Timestamp of execution
   */
  public async execute(): Promise<UserDTO[]> {
    try {
      // Find wihtout conditionals will get all Users
      return await this._UserRepository.find();

    } catch (err: unknown) {
      throw new Error("Could not get Users");
    }
  }
}