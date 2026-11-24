import { z } from '@hono/zod-openapi';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import {
  emailSchema as emailType,
  passwordSchema as passwordType,
  usernameSchema as usernameType
} from '@/shared/schemas/base-types';

const JWT_ALGORITHM = APP_CONFIG.security.jwt_algorithm;

export const jwtSchema = z.jwt({ alg: JWT_ALGORITHM }).meta({
  description: 'JWT access token, expires in few minutes'
});

export const emailSchema = emailType.meta({
  description: 'Email address of the user',
  example: 'john.doe@example.com'
});

export const passwordSchema = passwordType.meta({
  description: 'Password of the user',
  example: 'SecurePassword123#'
});

export const usernameSchema = usernameType.meta({
  description: 'Username of the user',
  example: 'john_doe'
});

export const timestampSchema = z.date().meta({
  description: 'Timestamp of the resource',
  example: new Date().toISOString()
});
