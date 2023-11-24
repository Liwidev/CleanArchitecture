import { User } from "../../domain/User";

export type IGetAllUsersDTO = {} | undefined;
export type IGetAllUsersResult = {
  users: User[];
  timestamp: Date,
}