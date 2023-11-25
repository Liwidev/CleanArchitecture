import "reflect-metadata";
import { injectable } from "inversify";
import { UserRepository } from "../domain/interface/UserRepository";
import { User } from "../domain/entities/User";

/**
 * InMemory implementation
 */
@injectable()
export class InMemoryUserRepository implements UserRepository {
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
