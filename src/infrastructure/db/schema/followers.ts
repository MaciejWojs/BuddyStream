import { sql } from 'drizzle-orm';
import { check, pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const followers = pgTable(
  'followers',
  {
    id: uuidv7().primaryKey(),
    // user who is following
    follower_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // user who is being followed
    followee_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    ...timestamps
  },

  (table) => [
    unique('followers_pair_unique').on(table.follower_id, table.followee_id),
    check('follower_is_not_followee', sql`${table.follower_id} != ${table.followee_id}`)
  ]
);
