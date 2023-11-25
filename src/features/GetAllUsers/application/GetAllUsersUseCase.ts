import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { IUserRepository } from "../../../shared/domain/interface/IUserRepository";
import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { IGetAllUsersDTO, IGetAllUsersResult } from "../domain/IGetAllUsers";

/**
 * Get all Users Use case Implementation
 */
@injectable()
export class GetAllUsersUseCase implements IUseCase<IGetAllUsersDTO, IGetAllUsersResult> {

  private _UserRepository: IUserRepository;

  /**
   * @param {IUserRepository} _UserRepository Repository used to get all Users
   */
  public constructor(
    @inject(TYPES.repository) userRepository: IUserRepository
  ) {
    this._UserRepository = userRepository;
  }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<ICreateUserResult>} List with all users found && Timestamp of execution
   */
  public async execute(input: IGetAllUsersDTO): Promise<IGetAllUsersResult> {
    const result = await this._UserRepository.getAll();

    if (!result) throw new Error("Could not get Users");

    const payload: IGetAllUsersResult = {
      users: result,
      timestamp: new Date(),
    };

    return payload;
  }
}