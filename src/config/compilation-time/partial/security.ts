import { z } from 'zod';

export const securitySchema = z.strictObject({
  hash_algorithm: z.enum(['bcrypt', 'argon2id', 'argon2d', 'argon2i']),
  jwt_algorithm: z.enum([
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512'
  ])
});
