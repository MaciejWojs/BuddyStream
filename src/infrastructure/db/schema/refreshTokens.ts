import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuidv7().primaryKey(),
  user_id: uuid().references(() => users.id),
  token_hash: varchar({ length: 100 }).notNull().unique(),
  revoked_at: timestamp(),
  expires_at: timestamp()
    .notNull()
    .default(sql`now() + interval '7 day'`),
  ...timestamps
});
