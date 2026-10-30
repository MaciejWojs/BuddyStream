import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../utilities';

export const globalRoles = pgTable('global_roles', {
  id: uuidv7().primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
  code: varchar({ length: 100 }).notNull().unique(),
  description: varchar({ length: 255 }),
  ...timestamps
});
