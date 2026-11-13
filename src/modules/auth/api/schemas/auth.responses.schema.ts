import { z } from '@hono/zod-openapi';

import { uuidSchema } from '@/shared/scheamas/UUID';

import { emailSchema, jwtSchema, timestampSchema, usernameSchema } from './auth.shared.shema';

// ── Payload schemas (just the data) ─────────────────────────────────

export const registerPayloadSchema = z.compile(
  z.object({
    message: z.string()
  })
);

export const loginPayloadSchema = z.compile(
  z.object({
    message: z.string(),
    accessToken: jwtSchema
  })
);

export const refreshPayloadSchema = z.compile(
  z.object({
    message: z.string(),
    accessToken: jwtSchema
  })
);

export const logoutPayloadSchema = z.compile(
  z.object({
    message: z.string()
  })
);

export const mePayloadSchema = z.compile(
  z.object({
    id: uuidSchema.openapi({
      description: 'Unique identifier for the user'
    }),
    username: usernameSchema.openapi({
      description: 'username for the user',
      example: 'john_doe'
    }),
    email: emailSchema,

    avatar_key: z.string().nullable().openapi({
      description: 'Key of the avatar in the assets storage'
    }),
    avatar_placeholder: z.string().nullable().openapi({
      description: 'Placeholder for the avatar'
    }),
    createdAt: timestampSchema,
    updatedAt: timestampSchema.nullable()
  })
);

// ── Types ───────────────────────────────────────────────────────────
// ! These types can be used in the route handlers to ensure type safety when returning responses
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type RefreshPayload = z.infer<typeof refreshPayloadSchema>;
export type LogoutPayload = z.infer<typeof logoutPayloadSchema>;
export type MePayload = z.infer<typeof mePayloadSchema>;
