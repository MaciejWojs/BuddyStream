import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from './utilities';

export const users = pgTable('users', {
  id: uuidv7().primaryKey(),
  username: varchar({ length: 100 }).notNull().unique(),
  email: varchar({ length: 100 }).notNull().unique(),
  password_hash: varchar({ length: 100 }).notNull(),
  avatar_key: varchar({ length: 100 }),
  avatar_placeholder: varchar({ length: 100 }),
  ...timestamps
});
