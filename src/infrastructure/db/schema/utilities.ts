import { sql } from 'drizzle-orm';
import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const timestamps = {
  updated_at: timestamp({ withTimezone: true }),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull()
};

export const uuidv7 = () => uuid().default(sql`uuidv7()`);
