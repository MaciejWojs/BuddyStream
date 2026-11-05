import { z } from 'zod';

export const securitySchema = z.strictObject({
  hash_algorithm: z.enum(['bcrypt', 'argon2id', 'argon2d', 'argon2i'])
});
