import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { IUseCase } from "../shared/UseCase";


export type ICreateUserDTO = {
  name: string;
  age: number;
  address: string;
  dateOfBirth: Date;
  email: string;
}

export type ICreateUserResult = {
  data: User;
  timestamp: Date;
}

/**
 * Create User Use case Implementation
 */
export class CreateUserUseCase implements IUseCase<ICreateUserDTO, ICreateUserResult> {
  /**
   * @param {IUserRepository} _UserRepository Repository used to create User
   */
  public constructor(private readonly _UserRepository: IUserRepository) { }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<ICreateUserResult>} The sum of the two numbers.
   */
  public async execute(input: ICreateUserDTO): Promise<ICreateUserResult> {
    const result = await this._UserRepository.save(input);

    if (!result) throw new Error("Could not save User");

    const payload: ICreateUserResult = {
      data: input,
      timestamp: new Date(),
    };

    return payload

  }
}
