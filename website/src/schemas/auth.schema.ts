import z from 'zod'

// Login schema
export const LoginBody = z
  .object({
    username: z.string().min(5).max(50),
    password: z.string().min(5).max(50),
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>