// Using zod as schema validator && entities
import { z } from 'zod';

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  address: z.string().min(10).max(100),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string().email().default('noEmail@email.com'),
})

export type User = z.input<typeof UserSchema>


export const UserDTOSchema = z.object({
  id: z.string().optional(), //The only difference for this example is trasforming _id to id
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  address: z.string().min(10).max(100),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string().email().default('noEmail@email.com'),
})

export type UserDTO = z.input<typeof UserDTOSchema>

export const UserDTO = {
  converFromEntity: (entity: User): UserDTO => {
    const candidate: UserDTO = {
      id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      address: entity.address
    };
    return UserDTOSchema.parse(candidate);
  },
  convertFromDTO: (dto: UserDTO): User => {
    const candidate: User = {
      _id: dto.id,
      name: dto.name,
      email: dto.email,
      age: dto.age,
      address: dto.address
    };
    return UserSchema.parse(candidate);
  },
}