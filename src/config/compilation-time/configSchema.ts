import 'zod/compile';
import { z } from 'zod';

import { coreSchema } from './partial/core';
import { databaseLimitsSchema } from './partial/database-limits';
import { domainLimitsSchema } from './partial/domain-limits';
import { securitySchema } from './partial/security';

export const configSchema = z
  .strictObject({
    core: coreSchema,
    security: securitySchema,
    database: z.strictObject({
      limits: databaseLimitsSchema
    }),
    domain: domainLimitsSchema
  })
  .superRefine((config, ctx) => {
    const minUsername = config.domain.limits.users.min_username_length;
    const maxUsername = config.database.limits.users.max_username_length;
    const minPassword = config.domain.limits.users.min_password_length;
    const maxPassword = config.domain.limits.users.max_password_length;
    const minRefreshTokenSecret = config.domain.limits.refresh_tokens.min_secret_length;
    const maxRefreshTokenSecret = config.domain.limits.refresh_tokens.max_secret_length;
    const refreshTokenSecretLength = config.security.refresh_token_secret_length;
    const maxTokenHashLength = config.database.limits.max_token_hash_length;

    if (minUsername > maxUsername) {
      ctx.addIssue({
        code: 'custom',
        message: 'min username length cannot exceed max username length',
        path: ['domain', 'limits', 'users', 'min_username_length']
      });
    }
    if (minPassword > maxPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'min password length cannot exceed max password length',
        path: ['domain', 'limits', 'users', 'min_password_length']
      });
    }
    if (minPassword < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'min password length cannot be less than 8',
        path: ['domain', 'limits', 'users', 'min_password_length']
      });
    }
    if (minRefreshTokenSecret > maxRefreshTokenSecret) {
      ctx.addIssue({
        code: 'custom',
        message: 'min refresh token secret length cannot exceed max refresh token secret length',
        path: ['domain', 'limits', 'refresh_tokens', 'min_secret_length']
      });
    }
    if (minRefreshTokenSecret < 32) {
      ctx.addIssue({
        code: 'custom',
        message: 'min refresh token secret length cannot be less than 32',
        path: ['domain', 'limits', 'refresh_tokens', 'min_secret_length']
      });
    }
    if (maxRefreshTokenSecret > 512) {
      ctx.addIssue({
        code: 'custom',
        message: 'max refresh token secret length cannot exceed 512',
        path: ['domain', 'limits', 'refresh_tokens', 'max_secret_length']
      });
    }
    if (refreshTokenSecretLength < minRefreshTokenSecret || refreshTokenSecretLength > maxRefreshTokenSecret) {
      ctx.addIssue({
        code: 'custom',
        message: 'refresh token secret length must be within the configured secret length bounds',
        path: ['security', 'refresh_token_secret_length']
      });
    }
    if (maxTokenHashLength < 64) {
      ctx.addIssue({
        code: 'custom',
        message: 'max token hash length cannot be shorter than a SHA-256 hex digest',
        path: ['database', 'limits', 'max_token_hash_length']
      });
    }
  });

export type AppConfig = z.infer<typeof configSchema>;
