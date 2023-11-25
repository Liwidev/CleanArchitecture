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
  public save(user: User): Promise<boolean> {
    this._users.push(user);

    return Promise.resolve(true);
  }

  /** 
   * Method implementation to capture all users
   * @return {Promise<User[]>} List of Users
   */
  getAll(): Promise<User[]> {
    // TODO: Implement get all users
    throw new Error("Method not implemented.");
  }
}
