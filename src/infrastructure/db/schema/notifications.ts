import { jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const notifications = pgTable('notifications', {
  id: uuidv7().primaryKey(),
  recipient_id: uuid().references(() => users.id),
  payload: jsonb().notNull(),
  read_at: timestamp({ withTimezone: true }),
  ...timestamps
});
