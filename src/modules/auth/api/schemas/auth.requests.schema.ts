import { z } from 'zod';

import { emailSchema, jwtSchema, passwordSchema, usernameSchema } from './auth.shared.shema';

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

export const accessTokenCookieSchema = z.compile(
  z.object({
    accessToken: jwtSchema.openapi({
      description: 'JWT access token sent as an HttpOnly cookie'
    })
  })
);

export type RegisterInput = z.infer<typeof registerBodySchema>;
export type LoginInput = z.infer<typeof loginBodySchema>;
export type RefreshInput = z.infer<typeof refreshTokenCookieSchema>;
