import { sql } from 'drizzle-orm';
import { check, pgTable, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const followers = pgTable(
  'followers',
  {
    id: uuidv7().primaryKey(),
    // user who is following
    follower_id: uuid().references(() => users.id, { onDelete: 'cascade' }),
    // user who is being followed
    followee_id: uuid().references(() => users.id, { onDelete: 'cascade' }),
    ...timestamps
  },

  (table) => [check('follower_is_not_followee', sql`${table.follower_id} != ${table.followee_id}`)]
);
