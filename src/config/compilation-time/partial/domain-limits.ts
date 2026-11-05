import 'zod/compile';
import { z } from 'zod';

const positiveInt = z.int().positive();

export const domainLimitsSchema = z.strictObject({
  users: z.strictObject({
    min_username_length: positiveInt,
    min_password_length: positiveInt,
    max_password_length: positiveInt,
    min_password_strength: z.int().min(0).max(4)
  })
});
