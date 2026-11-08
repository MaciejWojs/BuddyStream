import { z } from 'zod';

import { emailSchema, jwtSchema, passwordSchema, usernameSchema } from './auth.shared.shema';

export const registerBodySchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
});

export const loginBodySchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const refreshTokenCookieSchema = z.object({
  refreshToken: jwtSchema.openapi({
    description: 'Refresh token for the user'
  })
});

export type RegisterInput = z.infer<typeof registerBodySchema>;
export type LoginInput = z.infer<typeof loginBodySchema>;
export type RefreshInput = z.infer<typeof refreshTokenCookieSchema>;
