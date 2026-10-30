import { pgTable, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { timestamps, uuidv7 } from './utilities';

export const followers = pgTable('followers', {
  id: uuidv7().primaryKey(),
  // user who is following
  follower_id: uuid().references(() => users.id),
  // user who is being followed
  followee_id: uuid().references(() => users.id),
  ...timestamps
});
