import { User } from "../../../shared/domain/entities/User";

export type IGetAllUsersDTO = {} | undefined;
export type IGetAllUsersResult = {
  users: User[];
  timestamp: Date,
}