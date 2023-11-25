import { User } from "../entities/User";

export interface UserRepository {

  save(user: User): Promise<boolean>;
  getAll(): Promise<User[]>;
}
