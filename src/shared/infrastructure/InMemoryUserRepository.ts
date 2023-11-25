import "reflect-metadata";
import { injectable } from "inversify";
import { IUserRepository } from "../domain/interface/IUserRepository";
import { User } from "../domain/entities/User";

/**
 * InMemory implementation
 */
@injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly _users: User[] = [];

  /**
   * @param {string} user Whom to create
   * @return {Promise<boolean>} Conditional if user was created successfully
   */
  public async save(user: User): Promise<boolean> {
    this._users.push(user);

    return true;
  }

  /** 
   * Method implementation to capture all users
   * @return {Promise<User[]>} List of Users
   */
  public async getAll(): Promise<User[]> {
    return this._users;
  }
}
