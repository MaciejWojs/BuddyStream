import { z } from 'zod';

export const envSchema = z.compile(
  z.object({
    ACCESS_TOKEN_SECRET: z.string().min(15).max(64)
  })
);

export type APPLICATION_ENV = z.infer<typeof envSchema>;
