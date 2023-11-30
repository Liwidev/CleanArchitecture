import { UserDTO } from "../entities/User";

export interface UserRepository {
  save(user: UserDTO): Promise<void>;
  getAll(): Promise<UserDTO[]>;
  find(id: string): Promise<UserDTO>;
}
