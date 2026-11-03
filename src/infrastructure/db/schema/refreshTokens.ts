import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

const MAX_TOKEN_HASH_LENGTH = APP_CONFIG.database.limits.max_token_hash_length;

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuidv7().primaryKey(),
  user_id: uuid()
    .notNull()
    .references(() => users.id),
  token_hash: varchar({ length: MAX_TOKEN_HASH_LENGTH }).notNull().unique(),
  revoked_at: timestamp(),
  expires_at: timestamp()
    .notNull()
    .default(sql`now() + interval '7 day'`),
  ...timestamps
});
