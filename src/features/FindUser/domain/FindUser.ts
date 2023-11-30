import { z } from 'zod';
import { UserDTO, UserSchema } from '../../../shared';


export const FindUserEntrySchema = z.object({
  _id: z.string(),
})

export type FindUserEntry = z.input<typeof FindUserEntrySchema>

export const FindUserEntryDTOSchema = z.object({
  id: z.string(),
})

export type FindUserEntryDTO = z.input<typeof FindUserEntryDTOSchema>

export const FindUserEntryDTO = {
  convertFromEntity: (entity: FindUserEntry): FindUserEntryDTO => {
    const candidate: FindUserEntryDTO = {
      id: entity._id
    };
    return FindUserEntryDTOSchema.parse(candidate);
  }
}

export const FindUserDTOSchema = z.object({
  user: UserSchema,
  timestamp: z.string().datetime()
})

export type FindUserDTO = z.input<typeof FindUserDTOSchema>


export const FindUserDTO = {
  convertFromDTO: (dto: UserDTO): FindUserDTO => {
    const candidate: FindUserDTO = {
      user: UserSchema.parse(dto),
      timestamp: (new Date()).toISOString()
    };
    return FindUserDTOSchema.parse(candidate);
  }
}