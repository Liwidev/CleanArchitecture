import { User } from "../../domain/User";

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
