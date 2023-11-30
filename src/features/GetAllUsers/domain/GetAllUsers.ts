import { UserDTO, UserSchema, User } from "../../../shared/domain/entities/User";
import { z } from 'zod';

export const GetAllUsersSchema = z.object({
  users: z.array(UserSchema),
  timestamp: z.string().datetime(),
})

export type GetAllUsersDTO = z.input<typeof GetAllUsersSchema>;

export const GetAllUsersDTO = {
  convertFromDTO: (dtos: UserDTO[]): GetAllUsersDTO => {
    let users: User[] = [];
    for (let dto of dtos) {
      let { id, ...rest } = dto;
      users.push({ _id: id, ...rest })
    }
    const candidate: GetAllUsersDTO = {
      users,
      timestamp: (new Date()).toISOString()
    }
    return GetAllUsersSchema.parse(candidate);
  }
}