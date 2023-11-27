import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { GetAllUsersDTO, GetAllUsersResult } from "../domain/GetAllUsers";
import { User } from "../../../shared";

/**
 * Get all Users Use case Implementation
 */
@injectable()
export class GetAllUsersUseCase implements UseCase<GetAllUsersDTO, GetAllUsersResult> {

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
   * @return {Promise<CreateUserResult>} List with all users found && Timestamp of execution
   */
  public async execute(input: GetAllUsersDTO): Promise<GetAllUsersResult> {
    const result: User[] = await this._UserRepository.getAll();

    if (!result) throw new Error("Could not get Users");
    const payload: GetAllUsersResult = {
      users: result,
      timestamp: (new Date()).toISOString(),
    };

    return payload;
  }
}