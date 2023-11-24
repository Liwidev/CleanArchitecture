import { User } from "./User";

export interface IUserRepository {

  // getUser(): User;
  // getAllUsers(): User[];
  save(user: User): Promise<boolean>;
  getAll(): Promise<User[]>;
}
