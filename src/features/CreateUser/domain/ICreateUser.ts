import { User } from "../../../shared/domain/entities/User";
// TODO: Implement ID being retured when you create a new user instead of returning the whole user
export type CreateUserDTO = {
  name: string;
  age: number;
  address: string;
  dateOfBirth?: string;
  email?: string;
}

export type CreateUserResult = {
  data: User;
  timestamp: Date;
}
