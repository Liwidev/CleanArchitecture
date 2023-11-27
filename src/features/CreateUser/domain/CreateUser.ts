import { z } from 'zod';

export const CreateUserDTOSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  address: z.string().min(10).max(100),
  dateOfBirth: z.string().datetime(),
  email: z.string().email(),
})

export type CreateUserDTO = z.input<typeof CreateUserDTOSchema>

export const CreateUserResultSchema = z.object({
  id: z.string(),
  timestamp: z.string().datetime()
})

export type CreateUserResult = z.input<typeof CreateUserResultSchema>