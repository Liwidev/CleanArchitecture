// Using zod as schema validator && entities
import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(18).max(100),
  address: z.string().min(10).max(100),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string().email().default('noEmail@email.com'),
})

export type User = z.input<typeof UserSchema>

// Using plain types / interfaces for entities

// export type User = {
//   name: string;
//   age: number;
//   address: string;
//   dateOfBirth: Date;
//   email: string;
// }
