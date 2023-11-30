import { z } from 'zod';
import { UserDTO } from '../../../shared';


export const CreateUserDTOSchema = z.object({
  _id: z.string(),
  timestamp: z.string().datetime()
})

export type CreateUserDTO = z.input<typeof CreateUserDTOSchema>


export const CreateUserDTO = {
  convertFromDTO: (dto: UserDTO): CreateUserDTO => {
    const candidate: CreateUserDTO = {
      _id: dto.id ?? "",
      timestamp: (new Date()).toISOString()
    };
    return CreateUserDTOSchema.parse(candidate);
  }
}