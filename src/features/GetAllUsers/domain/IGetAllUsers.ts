import { User } from "../../../shared/domain/entities/User";

export type GetAllUsersDTO = {} | undefined;
export type GetAllUsersResult = {
  users: User[];
  timestamp: Date,
}