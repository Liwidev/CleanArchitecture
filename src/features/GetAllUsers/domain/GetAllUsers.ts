import { UserSchema } from "../../../shared/domain/entities/User";
import { z } from 'zod';

// export type GetAllUsersDTO = {} | undefined;
// export type GetAllUsersResult = {
//   users: User[];
//   timestamp: Date,
// }

export const GetAllUsersResultSchema = z.object({
  users: z.array(UserSchema),
  timestamp: z.string().datetime(),
})

export type GetAllUsersResult = z.input<typeof GetAllUsersResultSchema>;

export const GetAllUsersDTOSchema = z.object({}).strict();

export type GetAllUsersDTO = z.input<typeof GetAllUsersDTOSchema>;
