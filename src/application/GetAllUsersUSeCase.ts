import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { IUseCase } from "../shared/IUseCase";

export type IGetAllUsersDTO = {} | undefined;
export type IGetAllUsersResult = {
  users: User[];
  timestamp: Date,
}


/**
 * Get all Users Use case Implementation
 */
export class GetAllUsersUseCase implements IUseCase<any, any> {
  /**
   * @param {IUserRepository} _UserRepository Repository used to get all Users
   */
  public constructor(private readonly _UserRepository: IUserRepository) { }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<ICreateUserResult>} The sum of the two numbers.
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