// Using zod as schema validator && entities
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  address: z.string().min(10).max(100),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string().email().default('noEmail@email.com'),
})

export type User = z.input<typeof UserSchema>