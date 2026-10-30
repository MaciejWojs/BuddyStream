import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../utilities';

export const permissions = pgTable('permissions', {
  id: uuidv7().primaryKey(),
  code: varchar({ length: 100 }).notNull().unique(),
  description: varchar({ length: 255 }),
  ...timestamps
});
