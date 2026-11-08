import { z } from '@hono/zod-openapi';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MIN_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.min_password_length;
const MAX_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.max_password_length;
const MIN_USERNAME_LENGTH = APP_CONFIG.domain.limits.users.min_username_length;
const MAX_USERNAME_LENGTH = APP_CONFIG.database.limits.users.max_username_length;
const JWT_ALGORITHM = APP_CONFIG.security.jwt_algorithm;

export const jwtSchema = z.jwt({ alg: JWT_ALGORITHM }).openapi({
  description: 'JWT access token, valid for 15 minutes'
});

export const emailSchema = z.email().openapi({
  description: 'Email address of the user',
  example: 'john.doe@example.com'
});

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH)
  .max(MAX_PASSWORD_LENGTH)
  .openapi({
    description: `Password of the user, must be at least ${MIN_PASSWORD_LENGTH} characters and at most ${MAX_PASSWORD_LENGTH} characters`,
    example: 'SecurePassword123#'
  });

export const usernameSchema = z
  .string()
  .min(MIN_USERNAME_LENGTH)
  .max(MAX_USERNAME_LENGTH)
  .openapi({
    description: `Username of the user, must be at least ${MIN_USERNAME_LENGTH} characters and at most ${MAX_USERNAME_LENGTH} characters`,
    example: 'john_doe'
  });
