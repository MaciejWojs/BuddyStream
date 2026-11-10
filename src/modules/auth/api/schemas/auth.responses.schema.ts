import { z } from '@hono/zod-openapi';

import { emailSchema, jwtSchema, timestampSchema, usernameSchema } from './auth.shared.shema';
import { uuidSchema } from '@/shared/scheamas/UUID';
export const mePayloadSchema = z.object({
  id: uuidSchema.openapi({
    description: 'Unique identifier for the user',
  }),
  username: usernameSchema.openapi({
    description: 'username for the user',
    example: 'john_doe'
  }),
  email: emailSchema,

  avatar_key: z.string().nullable().openapi({
    description: 'Key of the avatar in the assets storage',
  }),
  avatar_placeholder: z.string().nullable().openapi({
    description: 'Placeholder for the avatar',
  }),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});
