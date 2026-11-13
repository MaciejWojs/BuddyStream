import { z } from 'zod';

import { emailSchema, passwordSchema, usernameSchema } from './auth.shared.shema';

export const registerBodySchema = z.compile(
  z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
  })
);

export const loginBodySchema = z.compile(
  z.object({
    email: emailSchema,
    password: passwordSchema
  })
);

export const refreshTokenCookieSchema = z.compile(
  z.object({
    refreshToken: z.hash('sha256').openapi({
      description: 'Refresh token for the user'
    })
  })
);

export type RegisterInput = z.infer<typeof registerBodySchema>;
export type LoginInput = z.infer<typeof loginBodySchema>;
export type RefreshInput = z.infer<typeof refreshTokenCookieSchema>;
