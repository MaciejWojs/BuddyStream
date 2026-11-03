import { index, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const notifications = pgTable(
  'notifications',
  {
    id: uuidv7().primaryKey(),
    recipient_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text().notNull(),
    payload: jsonb().notNull(),
    read_at: timestamp({ withTimezone: true }),
    ...timestamps
  },
  (table) => [index('notifications_recipient_created_at_idx').on(table.recipient_id, table.created_at)]
);
