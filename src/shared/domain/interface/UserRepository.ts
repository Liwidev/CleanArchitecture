import { UserDTO } from "../entities/User";

export interface UserRepository {
  save(user: UserDTO): Promise<void>;
  find(contionals?: string[][]): Promise<UserDTO[]>;
}