import 'zod/compile';
import { z } from 'zod';

import { coreSchema } from './partial/core';
import { databaseLimitsSchema } from './partial/database-limits';
import { domainLimitsSchema } from './partial/domain-limits';

export const configSchema = z
  .strictObject({
    core: coreSchema,
    database: z.strictObject({
      limits: databaseLimitsSchema
    }),
    domain: z.strictObject({
      limits: domainLimitsSchema
    })
  })
  .superRefine((config, ctx) => {
    const minUsername = config.domain.limits.users.min_username_length;
    const maxUsername = config.database.limits.users.max_username_length;

    if (minUsername > maxUsername) {
      ctx.addIssue({
        code: 'custom',
        message: 'min username length cannot exceed max username length',
        path: ['domain', 'limits', 'users', 'min_username_length']
      });
    }
  });

export type AppConfig = z.infer<typeof configSchema>;
