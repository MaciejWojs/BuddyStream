import 'zod/compile';
import { z } from 'zod';

const positiveInt = z.int().positive();

export const domainLimitsSchema = z.strictObject({
  users: z.strictObject({
    min_username_length: positiveInt
  })
});
