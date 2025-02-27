import z from 'zod'

// Login schema
export const LoginBody = z
  .object({
    username: z.string().min(5).max(50),
    password: z.string().min(5).max(50),
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

// Register schema
export const RegisterBody = z
    .object({
        username: z.string().min(8).max(50),
        password: z.string().min(8).max(50),
        re_password: z.string().min(8).max(50),
        account_type: z.string().min(1).max(1),
    })
    .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>