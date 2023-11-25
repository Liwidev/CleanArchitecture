import { User } from "../../../shared/domain/entities/User";

export type ICreateUserDTO = {
  name: string;
  age: number;
  address: string;
  dateOfBirth: Date;
  email: string;
}

export type ICreateUserResult = {
  data: User;
  timestamp: Date;
}
