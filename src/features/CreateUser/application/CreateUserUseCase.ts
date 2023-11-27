import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/ioc/types";
import { UserRepository } from "../../../shared/domain/interface/UserRepository";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import {  CreateUserDTO, CreateUserResult } from "../domain/CreateUser";

/**
 * Create User Use case Implementation
 */
@injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserResult> {

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
  public async execute(input: CreateUserDTO): Promise<CreateUserResult> {
    const result = await this._UserRepository.save(input);

    if (!result) throw new Error("Could not save User");

    const payload: CreateUserResult = {
      id: input.id,
      timestamp: (new Date()).toISOString(),
    };

    return payload

  }
}
