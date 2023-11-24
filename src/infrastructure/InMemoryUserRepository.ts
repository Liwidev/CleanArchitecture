import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

/**
 * InMemory implementation
 */
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
