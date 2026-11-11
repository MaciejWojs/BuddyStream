import 'zod/compile';
import { z } from 'zod';

const positiveInt = z.int().positive();

export const domainLimitsSchema = z.strictObject({
  force_uuid_v7: z.boolean().default(false),
  limits: z.strictObject({
    users: z.strictObject({
      min_username_length: positiveInt,
      min_password_length: positiveInt,
      max_password_length: positiveInt,
      min_password_strength: z.int().min(0).max(4)
    }),
    roles: z.strictObject({
      min_name_length: positiveInt,
      min_code_length: positiveInt
    }),
    permissions: z.strictObject({
      min_code_length: positiveInt
    }),
    refresh_tokens: z.strictObject({
      min_secret_length: positiveInt,
      max_secret_length: positiveInt
    })
  })
});
