import { sql } from 'drizzle-orm';
import { index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { uuidv7 } from './utilities';

export const outbox = pgTable(
  'outbox',
  {
    id: uuidv7().primaryKey(),
    type: text().notNull(),
    payload: jsonb().notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    published_at: timestamp({ withTimezone: true })
  },
  (table) => [
    index('outbox_unpublished_idx')
      .on(table.created_at)
      .where(sql`${table.published_at} is null`)
  ]
);
