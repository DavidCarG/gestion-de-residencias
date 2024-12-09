import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string({ message: 'Role is required' }),
  career: z.string({ message: 'Career is required' }),
});

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});