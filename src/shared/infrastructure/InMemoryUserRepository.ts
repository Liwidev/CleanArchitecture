import "reflect-metadata";
import { injectable } from "inversify";
import { UserRepository } from "../domain/interface/UserRepository";
import { UserDTO } from "../domain/entities/User";

/**
 * InMemory implementation
 */
@injectable()
export class InMemoryUserRepository implements UserRepository {
  find(conditionals: string[][]): Promise<UserDTO[]> {
    throw new Error("Method not implemented.");
  }
  private readonly _users: UserDTO[] = [];

  /**
   * @param {string} user Whom to create
   * @return {Promise<boolean>} Conditional if user was created successfully
   */
  public async save(user: UserDTO): Promise<void> {
    this._users.push(user);
  }

  /** 
   * Method implementation to capture all users
   * @return {Promise<UserDTO[]>} List of Users
   */
  public async getAll(): Promise<UserDTO[]> {
    return this._users;
  }
}
